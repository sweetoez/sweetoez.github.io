class MsnHeaderControls extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    this.innerHTML = `<div class="p2-header__controls" aria-label="MSN controls">
  <label class="p2-header__toggle">
    <span class="win-panel__toggle-label"><span class="win-panel__toggle-title">Copilot Discover</span><span class="win-panel__toggle-preview"> (Preview)</span></span>
    <input type="checkbox" role="switch" checked aria-label="Copilot Discover (Preview)">
  </label>
  <button class="p2-header__button" type="button" aria-label="Refresh">
    <span class="win-icon win-icon--24" data-icon="refresh24" aria-hidden="true"></span>
  </button>
  <button class="p2-header__button" type="button" aria-label="Notifications">
    <span class="win-icon win-icon--24" data-icon="alert24" aria-hidden="true"></span>
  </button>
  <button class="p2-header__button" type="button" aria-label="Feedback">
    <span class="win-icon win-icon--24" data-icon="feedback24" aria-hidden="true"></span>
  </button>
  <button class="p2-header__profile" type="button" aria-label="Olivia profile">
    <span class="p2-header__avatar"><img src="../assets/images/windows/avatar.png" alt="" aria-hidden="true" onerror="this.remove()"><span>OL</span></span>
  </button>
</div>`;
  }
}

customElements.define("msn-header-controls", MsnHeaderControls);
