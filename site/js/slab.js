/* The mark's geometry, as the app holds it.
 *
 * Ported from `packages/ui/src/lib/style/slab.ts` so anything this site draws is
 * the same shape the app draws, not a slant that looks about right. If the mark's
 * proportions ever change they change THERE and are re-ported here — this file is
 * a copy, and is not allowed to become a second opinion.
 */

// Ported from `packages/ui/src/lib/style/slab.ts` so the hubs below are the same
// shape the app's memory graph draws, not a slant that looks about right.
//
// Two across for every one down — atan(1/2) = 26.565°, which is what the artwork
// was measured at (26.91° weighted mean, tracing tolerance). Everything else
// follows from this one number.
export const SLAB_RUN_PER_RISE = 2;
export const SLAB_HUB_HEIGHT_RATIO = 0.55;
// Below this height the 2:1 offset is a few pixels and the eye reads a misaligned
// rectangle instead of a slab. Shallowing the angle to fit is forbidden — clamp
// the size or use a circle.
export const SLAB_MIN_HEIGHT = 16;

// A slab sized to sit inside a circle of radius r, centred on the origin. Pick the
// height, then SOLVE for the width the circle still has room for once the 2:1
// offset is spent — do not guess both.
export function inscribedSlab(r) {
  const h = r * SLAB_HUB_HEIGHT_RATIO;
  const halfH = h / 2;
  const halfW = Math.sqrt(Math.max(0, r * r - halfH * halfH));
  return { x: -halfW, y: -halfH, w: Math.max(0, 2 * halfW - h * SLAB_RUN_PER_RISE), h };
}

// x/y place the BOTTOM-LEFT corner — the one that sits on the leaf below it, the
// way the leaves in the mark rest on each other.
export function slabCorners(x, y, w, h) {
  const offset = h * SLAB_RUN_PER_RISE;
  return [[x, y + h], [x + offset, y], [x + offset + w, y], [x + w, y + h]];
}

export function traceSlab(ctx, cx, cy, r) {
  const s = inscribedSlab(r);
  const pts = slabCorners(s.x, s.y, s.w, s.h);
  ctx.beginPath();
  ctx.moveTo(cx + pts[0][0], cy + pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(cx + pts[i][0], cy + pts[i][1]);
  ctx.closePath();
}
