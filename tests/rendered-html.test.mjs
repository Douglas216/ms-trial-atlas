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
    "oratorio", "sunbeam", "optimum",
  ];

  for (const slug of slugs) {
    const response = await render(`/trials/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /data-outcome-figure=/, slug);
    assert.match(html, /Exact values are printed beside each mark/, slug);
    assert.match(html, /Source: landmark publication/, slug);
  }
});
