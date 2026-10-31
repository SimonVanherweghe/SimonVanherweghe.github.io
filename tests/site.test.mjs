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
