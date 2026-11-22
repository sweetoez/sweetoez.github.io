class WindowsWallpaper extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    this.innerHTML = `<div class="win-wallpaper">
  <img src="../assets/images/windows/wallpaper-light.jpg" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'">
</div>`;
  }
}

customElements.define("windows-wallpaper", WindowsWallpaper);
