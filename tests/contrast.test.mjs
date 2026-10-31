import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/css/tokens.css', import.meta.url), 'utf8');

// Body of the first `{ ... }` block that follows `selector`.
function block(selector) {
  const start = css.indexOf(selector);
  assert.notEqual(start, -1, `missing ${selector}`);
  const open = css.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error(`unclosed ${selector}`);
}

function hexTokens(body) {
  const out = {};
  for (const [, name, value] of body.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) out[name] = value;
  return out;
}

function tokens(theme) {
  if (theme === 'light') return hexTokens(block(':root {'));
  const media = block('@media (prefers-color-scheme: dark)');
  return hexTokens(media);
}

function luminance(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

test('light and dark token pairs pass AA', () => {
  for (const theme of ['light', 'dark']) {
    const t = tokens(theme);
    for (const name of ['--bg', '--ink', '--soft', '--red', '--blue', '--grey', '--k', '--on-k', '--focus']) {
      assert.ok(t[name], `${theme}: ${name} missing`);
    }
    assert.ok(ratio(t['--ink'], t['--bg']) >= 4.5, `${theme} ink/bg`);
    assert.ok(ratio(t['--soft'], t['--bg']) >= 4.5, `${theme} soft/bg`);
    assert.ok(ratio('#FFFFFF', t['--red']) >= 4.5, `${theme} white/red`);
    assert.ok(ratio('#FFFFFF', t['--blue']) >= 4.5, `${theme} white/blue`);
    assert.ok(ratio(t['--on-k'], t['--k']) >= 4.5, `${theme} on-k/k`);
    assert.ok(ratio(t['--focus'], t['--bg']) >= 3, `${theme} focus/bg`);
  }
});

test('every dark token is also in the [data-theme=dark] override', () => {
  const media = hexTokens(block('@media (prefers-color-scheme: dark)'));
  const override = hexTokens(block(":root[data-theme='dark']"));
  assert.deepEqual(override, media);
});

test('every light token is also in the [data-theme=light] override', () => {
  const root = hexTokens(block(':root {'));
  const override = hexTokens(block(":root[data-theme='light']"));
  assert.deepEqual(override, root);
});
