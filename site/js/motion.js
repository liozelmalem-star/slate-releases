/* Whether this reader asked for less motion.
 *
 * Read once, at module load, and shared. Every animated module on the site gates
 * on this, and each one computing it separately would be three identical media
 * queries and one more place to forget. */
export const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
