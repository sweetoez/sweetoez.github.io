class MsnWidgetMore extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;
    this.innerHTML = `<button class="seg-more" type="button" aria-label="More options"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.75" fill="currentColor"/><circle cx="12" cy="12" r="1.75" fill="currentColor"/><circle cx="18" cy="12" r="1.75" fill="currentColor"/></svg></button>`;
  }
}

customElements.define("msn-widget-more", MsnWidgetMore);
