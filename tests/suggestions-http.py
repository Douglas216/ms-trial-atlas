"""Run only against an isolated local Worker with SUGGESTIONS_ADMIN_EMAIL=owner@example.test.

Usage: python3 tests/suggestions-http.py http://127.0.0.1:4327
Apply the suggestions migration to a temporary database before starting the Worker.
"""
import json
import sys
import uuid
from urllib.error import HTTPError
from urllib.parse import urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

origin = sys.argv[1].rstrip('/')
assert urlparse(origin).hostname in ('localhost', '127.0.0.1'), 'Local test server only'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = build_opener(NoRedirect)

def request(path, data=None, identity=None, request_origin=None):
    headers = {'Origin': request_origin or origin}
    if identity:
        headers['oai-authenticated-user-email'] = identity
        headers['oai-authenticated-user-id'] = 'local-test-user'
    if data is not None:
        headers['Content-Type'] = 'application/json'
        data = data.encode() if isinstance(data, str) else json.dumps(data).encode()
    try:
        response = opener.open(Request(origin + path, data=data, headers=headers), timeout=15)
    except HTTPError as error:
        response = error
    return response.status, response.headers, response.read().decode()

marker = 'suggestion-test-' + str(uuid.uuid4())
reader_email = marker + '@example.test'
payload = dict(submissionId=str(uuid.uuid4()), sourcePath='/trials/opera',
               name='Test reader', email=reader_email,
               comment=marker, anonymous=False)
assert request('/api/suggestions', payload)[0] == 201
assert request('/api/suggestions', payload)[0] == 201
assert request('/api/suggestions', dict(payload, sourcePath='/trials/not-a-trial'))[0] == 400
assert request('/api/suggestions', dict(payload, email='not-an-email'))[0] == 400
assert request('/api/suggestions', dict(payload, comment=' '))[0] == 400
assert request('/api/suggestions', dict(payload, email='a' * 255 + '@example.test'))[0] == 400
assert request('/api/suggestions', dict(payload, comment='x' * 6001))[0] == 400
assert request('/api/suggestions', 'x' * 30001)[0] == 413
assert request('/api/suggestions', 'null')[0] == 400
assert request('/api/suggestions', '{broken')[0] == 400
assert request('/api/suggestions', payload, request_origin='https://other.example')[0] == 403
assert request('/api/suggestions')[0] == 405

for path in ('/suggestions/review', '/suggestions/review?page=2', '/suggestions/review?_rsc=test'):
    status, headers, body = request(path)
    assert status in (302, 303, 307, 308), (status, body[:200])
    assert urlparse(headers['Location']).path == '/signin-with-chatgpt'
    assert marker not in body
    status, headers, body = request(path, identity='other@example.test')
    assert status == 404, status
    assert marker not in body
    assert 'no-store' in headers.get('Cache-Control', '')

status, headers, body = request('/suggestions/review', identity='owner@example.test')
assert status == 200, (status, body[:200])
assert marker in body and reader_email in body
assert 'no-store' in headers['Cache-Control']
assert 'noindex' in headers['X-Robots-Tag']
# Each record creates one article in server HTML; the response also includes RSC data.
assert body.count('href="mailto:' + reader_email.replace('@', '%40') + '"') == 1, 'Duplicate retry created another row'

anonymous = dict(payload, submissionId=str(uuid.uuid4()), anonymous=True,
                 name='NAME_MUST_NOT_BE_STORED', email='anonymous@example.test', comment=marker + '-anon')
assert request('/api/suggestions', anonymous)[0] == 201
status, _, body = request('/suggestions/review', identity='owner@example.test')
assert 'NAME_MUST_NOT_BE_STORED' not in body
assert 'Anonymous' in body and 'anonymous@example.test' in body
assert request('/suggestions')[0] == 200
print('PASS: persistence, retries, input limits, origin checks, anonymous name omission, owner-only inbox, no-cache headers')
