import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

function walk(dir, ext) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p, ext) : p.endsWith(ext) ? [p] : [];
  });
}

const index = () => readFileSync(join(dist, 'index.html'), 'utf8');

test('old fonts are gone', () => {
  for (const file of walk(dist, '.css')) {
    const css = readFileSync(file, 'utf8');
    for (const name of ['Bricolage', 'Hanken', 'Fragment Mono']) {
      assert.ok(!css.includes(name), `${name} found in ${file}`);
    }
  }
});

test('theme-color matches the ground', () => {
  const html = index();
  assert.ok(html.includes('#FFFFFF'));
  assert.ok(html.includes('#0F0F0F'));
  assert.ok(!html.includes('#faf7f0'));
});

test('IndieWeb markup survives', () => {
  const html = index();
  assert.match(html, /rel="me[ "]/);
  assert.match(html, /rel="webmention"/);
  const post = walk(dist, '.html').find((f) => /h-entry/.test(readFileSync(f, 'utf8')));
  assert.ok(post, 'no page with h-entry');
  const p = readFileSync(post, 'utf8');
  for (const cls of ['p-name', 'dt-published', 'e-content']) assert.ok(p.includes(cls), cls);
});

test('header keeps nav and theme toggle', () => {
  const html = index();
  const header = html.match(/<header[\s\S]*?<\/header>/)[0];
  assert.match(header, /class="[^"]*\bcomp\b/);
  assert.match(header, /plane--k/);
  assert.match(header, /plane--red/);
  const nav = header.match(/<nav[^>]*aria-label="Main"[\s\S]*?<\/nav>/)[0];
  assert.match(nav, /href="\/blog"/);
  assert.match(nav, /href="\/about"/);
  assert.match(nav, /class="[^"]*theme-toggle/);
  assert.ok(!header.includes('wordmark__dot'));
});

test('footer is a plane row with rel=me links intact', () => {
  const html = index();
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)[0];
  assert.match(footer, /class="[^"]*\bcomp\b/);
  assert.match(footer, /plane--blue/);
  assert.match(footer, /rel="me noopener noreferrer"/);
});

test('plane focus ring sits inside the plane', () => {
  const css = walk(dist, '.css').map((f) => readFileSync(f, 'utf8')).join('\n');
  assert.match(css, /\.plane:focus-visible\s*\{[^}]*outline-offset:\s*-\d+px/);
});

test('home title splits on two lines', () => {
  const h1 = index().match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1];
  assert.match(h1, /things done\s*<br[^>]*>\s*by simon/);
});

test('newest post is in the hero, not repeated in the gallery', () => {
  const html = index();
  const links = [...html.matchAll(/href="\/([^"/][^"]*)"/g)].map((m) => m[1]);
  const list = html.match(/<ul[^>]*class="[^"]*post-list[\s\S]*?<\/ul>/)[0];
  const hero = html.slice(0, html.indexOf('<ul class="post-list'));
  const latest = [...hero.matchAll(/class="[^"]*\bhero__photo[^"]*"[^>]*href="\/([^"]+)"|href="\/([^"]+)"[^>]*class="[^"]*\bhero__photo/g)][0];
  assert.ok(latest, 'no hero photo link');
  const permalink = latest[1] ?? latest[2];
  assert.ok(links.includes(permalink));
  assert.ok(!list.includes(`href="/${permalink}"`), 'latest repeated in gallery');
});

test('the gallery has no entry animation', () => {
  const css = walk(dist, '.css').map((f) => readFileSync(f, 'utf8')).join('\n');
  assert.ok(!/entry-in|hero-in/.test(css));
});

const postPages = () =>
  walk(dist, '.html').filter((f) => /class="[^"]*\bh-entry\b/.test(readFileSync(f, 'utf8')));

test('post has a details column and h-entry intact', () => {
  const html = readFileSync(join(dist, '2025/01/06/a-maze-ing-new-years-cards/index.html'), 'utf8');
  const aside = html.match(/<aside[^>]*aria-label="Project details"[\s\S]*?<\/aside>/)?.[0];
  assert.ok(aside, 'no details aside');
  assert.match(aside, /dt-published/);
  assert.match(aside, /href="\/tags\//);
  assert.match(aside, /p-author h-card/);
  for (const cls of ['h-entry', 'p-name', 'p-summary', 'u-url', 'e-content', 'post-photo']) {
    assert.ok(html.includes(cls), cls);
  }
});

test('archive post without preview has no photo plane', () => {
  const html = readFileSync(join(dist, '2006/10/17/1024/index.html'), 'utf8');
  assert.match(html, /h-entry/);
  assert.ok(!html.includes('post-photo'));
});

test('first and last post have a full-width pagination plane', () => {
  let solo = 0;
  for (const f of postPages()) {
    const nav = readFileSync(f, 'utf8').match(/<nav[^>]*class="[^"]*\bpagination\b[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, `no pagination in ${f}`);
    const links = [...nav.matchAll(/<a [^>]*class="[^"]*\bpagination__link\b[^"]*"/g)];
    const soloLinks = links.filter((m) => m[0].includes('pagination__link--solo'));
    if (links.length === 1) { assert.equal(soloLinks.length, 1, f); solo++; }
    else { assert.equal(links.length, 2, f); assert.equal(soloLinks.length, 0, f); }
  }
  assert.equal(solo, 2);
});

test('tag page has h1, then a visually-hidden h2, and no duplicate tag heading', () => {
  const dir = join(dist, 'tags');
  const page = readdirSync(dir).map((d) => join(dir, d, 'index.html')).find((f) => { try { return statSync(f).isFile(); } catch { return false; } });
  assert.ok(page, 'no tag page');
  const html = readFileSync(page, 'utf8');
  const heads = [...html.matchAll(/<(h[12])\b([^>]*)>([\s\S]*?)<\/\1>/g)];
  assert.equal(heads.filter((m) => m[1] === 'h1').length, 1);
  const h1i = heads.findIndex((m) => m[1] === 'h1');
  assert.ok(h1i >= 0 && heads[h1i + 1], 'h1 with following heading');
  assert.equal(heads[h1i + 1][1], 'h2');
  assert.match(heads[h1i + 1][2], /visually-hidden/);
  assert.equal(heads.filter((m) => m[1] === 'h2' && !/visually-hidden/.test(m[2])).length, 0);
});
