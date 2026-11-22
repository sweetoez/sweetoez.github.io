class NtpComposer extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    this.innerHTML = `<div class="ntp-search-shell">
  <form class="ntp-search-slot" role="search">
    <button class="ntp-search-submit" type="submit" aria-label="Search">
      <span class="edge-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M10.5 3.75A6.75 6.75 0 1 0 10.5 17.25A6.75 6.75 0 1 0 10.5 3.75ZM2.25 10.5A8.25 8.25 0 1 1 14.791 16.3344L20.2284 21.7715C20.5213 22.0644 20.9962 22.0644 21.2891 21.7715C21.582 21.4786 21.582 21.0037 21.2891 20.7108L15.8516 15.2734A8.25 8.25 0 0 1 2.25 10.5Z" fill="currentColor"/>
        </svg>
      </span>
    </button>
    <input type="search" placeholder="Ask Copilot" aria-label="Ask Copilot">
    <button class="ntp-search-submit" type="button" aria-label="Copilot">
      <img src="../assets/images/windows/taskbar/copilot.svg" width="24" height="24" alt="" aria-hidden="true">
    </button>
  </form>
</div>`;

    this.querySelector("form").addEventListener("submit", (event) => event.preventDefault());
  }
}

customElements.define("ntp-composer", NtpComposer);
