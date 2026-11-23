(function () {
  const moreVerticalIcon = '<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5C7.44772 5 7 4.55228 7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5ZM8 9C7.44771 9 7 8.55229 7 8C7 7.44772 7.44771 7 8 7C8.55228 7 9 7.44772 9 8C9 8.55229 8.55229 9 8 9ZM7 12C7 12.5523 7.44771 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44771 11 7 11.4477 7 12Z" fill="currentColor"/></svg>';

  class PhoneFrame extends HTMLElement {
    static get observedAttributes() {
      return ["url"];
    }

    connectedCallback() {
      if (this._mounted) {
        this.syncUrl();
        return;
      }

      this.innerHTML = `<div class="phone-frame__body">
        <div class="phone-frame__statusbar">
          <span class="phone-frame__time">1:48</span>
          <span class="phone-frame__status-icons" aria-hidden="true">
            <span class="phone-frame__signal"><i></i><i></i><i></i><i></i></span>
            <span class="phone-frame__wifi"></span>
            <span class="phone-frame__battery"><i></i></span>
          </span>
        </div>
        <div class="phone-frame__browserbar" role="group" aria-label="Mobile browser controls">
          <span class="phone-frame__address"></span>
          <button class="phone-frame__tabs" type="button" aria-label="Two open tabs">2</button>
          <button class="phone-frame__more" type="button" aria-label="More browser options">${moreVerticalIcon}</button>
        </div>
        <div class="phone-frame__viewport"></div>
      </div>`;
      this._mounted = true;
      this.syncUrl();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "url" && oldValue !== newValue) this.syncUrl();
    }

    syncUrl() {
      const address = this.querySelector(".phone-frame__address");
      if (address) address.textContent = this.getAttribute("url") || "bing.com";
    }
  }

  customElements.define("phone-frame", PhoneFrame);
})();
