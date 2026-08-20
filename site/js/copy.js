/* The install command's copy button. */
export function initCopy() {
// served over HTTPS but is also opened from file:// while editing, where
// navigator.clipboard is undefined.
const btn = document.getElementById("copy");
const cmd = document.getElementById("cmd");

btn.addEventListener("click", async () => {
  const text = cmd.textContent.trim();
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    btn.textContent = "Copied";
    btn.classList.add("done");
  } catch {
    btn.textContent = "Press ⌘C";
  }
  setTimeout(() => {
    btn.textContent = "Copy";
    btn.classList.remove("done");
  }, 2000);
});
}
