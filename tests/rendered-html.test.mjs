import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the atlas homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>MS Trial Atlas<\/title>/i);
  assert.match(html, /The pivotal Phase III trials that shaped modern multiple sclerosis treatment/);
  assert.match(html, /Landmark publication/);
});

test("every generated trial profile includes an accessible outcome figure", async () => {
  const slugs = [
    "ifnb-1b-pivotal", "copolymer-1", "mscrg", "prisms", "mims", "affirm",
    "freedoms", "transforms", "freedoms-ii", "clarity", "temso", "topic",
    "tower", "confirm", "define", "camms223", "care-ms-i", "expand", "opera",
    "oratorio", "sunbeam", "optimum", "fenhance", "fentrepid", "gemini",
    "hercules", "perseus",
  ];

  for (const slug of slugs) {
    const response = await render(`/trials/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /data-outcome-figure=/, slug);
    assert.match(html, /Exact values are printed beside each mark/, slug);
    assert.match(html, /Source:[\s\S]{0,80}(landmark publication|primary result report)/, slug);
    assert.ok(
      html.indexOf("Primary endpoint") < html.indexOf("Study population"),
      `${slug}: primary endpoint should precede study population`,
    );
  }
});

test("groups paired BTK programs and withholds unverified publication markers", async () => {
  const homepage = await (await render("/")).text();
  assert.equal((homepage.match(/FENhance 1 &amp; 2/g) ?? []).length > 0, true);
  assert.equal((homepage.match(/GEMINI 1 &amp; 2/g) ?? []).length > 0, true);

  for (const slug of ["fenhance", "fentrepid", "gemini", "hercules", "perseus"]) {
    assert.match(homepage, new RegExp(`/trials/${slug}`));
  }

  for (const slug of ["fenhance", "fentrepid", "perseus"]) {
    const html = await (await render(`/trials/${slug}`)).text();
    assert.doesNotMatch(html, /Landmark publication/);
    assert.match(html, /No peer-reviewed primary paper/);
  }
});

test("uses trial-era McDonald criteria phrasing in affected inclusion lists", async () => {
  const expectedVersions = {
    affirm: "2001",
    clarity: "2001",
    confirm: "2005",
    define: "2005",
    opera: "2010",
    oratorio: "2005",
    sunbeam: "2010",
    optimum: "2010",
    fenhance: "2017",
    fentrepid: "2017",
    gemini: "2017",
    hercules: "2017",
    perseus: "2017",
  };

  for (const [slug, version] of Object.entries(expectedVersions)) {
    const html = await (await render(`/trials/${slug}`)).text();
    assert.match(html, new RegExp(`Defined based on McDonald criteria ${version}`), slug);
  }
});
