// One Download at a time: the bar's button stays out of sight while the hero's own
// Download is on screen, and comes in once it has scrolled away.
const nav = document.querySelector(".topnav");
const hero = document.getElementById("download");
if (nav && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => nav.classList.toggle("hero-in-view", e.isIntersecting), {
    rootMargin: "-70px 0px 0px 0px",
  }).observe(hero);
}
