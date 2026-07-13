/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// The fontsource packages ship only CSS, which TypeScript's side-effect import
// check can't resolve on its own.
declare module "@fontsource-variable/bricolage-grotesque";
declare module "@fontsource-variable/hanken-grotesk";
declare module "@fontsource/fragment-mono";