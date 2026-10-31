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
