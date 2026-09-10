import sqlite3,re,pathlib
c=sqlite3.connect(':memory:')
c.executescript(pathlib.Path('drizzle/0000_abnormal_bruce_banner.sql').read_text())
s=pathlib.Path('app/api/traffic/route.ts').read_text()
upsert=re.search(r'db.prepare\(`(INSERT INTO traffic_visitors.*?)`\)',s,re.S).group(1)
def visit(visitor,event,time,path='/'):
 with c:
  c.execute(upsert,(visitor,time,event))
  c.execute('INSERT OR IGNORE INTO traffic_events VALUES (?,?,?)',(event,path,time))
visit('a','1',0)
visit('a','1',0)
visit('a','2',1000,'/trials/opera')
assert c.execute('select count(*),sum(sessions) from traffic_visitors').fetchone()==(1,1)
assert c.execute('select count(*) from traffic_events').fetchone()==(2,)
visit('a','3',1801000)
visit('b','4',1801001)
assert c.execute('select count(*),sum(sessions) from traffic_visitors').fetchone()==(2,3)
assert c.execute("select count(*) from traffic_events where path='/trials/opera'").fetchone()==(1,)
print('PASS: repeat views, event deduplication, 30-minute session boundary, distinct browsers, page-specific counts')
