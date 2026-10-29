/* The install command's copy buttons. Each `.copy[data-copy]` copies the text of the
 * element whose id it names; a button without one copies #cmd, as the page used to. */
export function initCopy() {
  for (const btn of document.querySelectorAll(".copy")) {
    const cmd = document.getElementById(btn.dataset.copy || "cmd");
    if (!cmd) continue;
    btn.addEventListener("click", async () => {
      const text = cmd.textContent.trim();
      try {
        // navigator.clipboard is undefined over file://, which is how the page is
        // sometimes opened while editing.
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
}
