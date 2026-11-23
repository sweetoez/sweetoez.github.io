(function () {
  const searchIcon = '<svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7291 14.4362C12.5924 15.411 11.115 16 9.5 16C5.91015 16 3 13.0899 3 9.5C3 5.91015 5.91015 3 9.5 3C13.0899 3 16 5.91015 16 9.5C16 11.115 15.411 12.5924 14.4361 13.7292L17.8535 17.1465C18.0487 17.3417 18.0487 17.6583 17.8535 17.8536L17.1464 17.8536L13.7291 14.4362ZM13.0196 13.7266C13.276 13.5128 13.5127 13.2761 13.7265 13.0197C14.5216 12.0659 15 10.8388 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15C10.8388 15 12.0658 14.5217 13.0196 13.7266Z" fill="currentColor"/><path d="M13.7291 14.4362L17.1464 17.8536C17.3417 18.0488 17.6583 18.0488 17.8535 17.8536C18.0488 17.6583 18.0488 17.3417 17.8535 17.1465L14.4361 13.7292" fill="currentColor"/></svg>';
  const playIcon = '<svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2221 8.68458C18.2586 9.25438 18.2586 10.7437 17.2221 11.3135L7.22259 16.8105C6.22292 17.36 5 16.6367 5 15.496L5 4.50214C5 3.36137 6.22292 2.63812 7.22259 3.18766L17.2221 8.68458Z" fill="currentColor"/></svg>';
  const moreIcon = '<svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.69036 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>';

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  class BingSerp extends HTMLElement {
    static get observedAttributes() {
      return ["entity"];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    render() {
      const entity = this.getAttribute("entity") || "company";
      const data = window.KC_ENTITIES?.[entity]?.desktop;
      if (!data) {
        console.error(`No desktop KC entity data found for <bing-serp> (${entity}).`);
        return;
      }

      const title = data.hero.title;
      const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      const videoResults = ["Latest videos", "Featured clips", "Popular videos", "More to watch"];
      const webResults = ["Overview and facts", "Photos and information", "Latest news and updates", "Related topics"];
      const videoRows = videoResults.map((label, index) => `<article class="bing-serp__video">
        <div class="bing-serp__thumbnail" aria-hidden="true">${playIcon}</div>
        <div class="bing-serp__result-copy">
          <a class="bing-serp__result-title bing-serp__video-title" href="#">${escapeHTML(title)} ${escapeHTML(label)}: Lorem ipsum dolor sit amet, consectetur adipiscing elit</a>
          <p>Example site · ${index + 1} days ago</p>
        </div>
      </article>`).join("");
      const webRows = webResults.map((label) => `<article class="bing-serp__web-result">
        <p class="bing-serp__site">example.com › ${escapeHTML(entity)}</p>
        <a class="bing-serp__result-title" href="#">${escapeHTML(title)} ${escapeHTML(label)}</a>
        <p class="bing-serp__description">${escapeHTML(description)} ${escapeHTML(description)}</p>
      </article>`).join("");

      this.innerHTML = `<header class="bing-serp__header">
        <div class="bing-serp__topbar">
          <div class="bing-serp__wordmark">Microsoft Bing</div>
          <div class="bing-serp__search" role="search">
            <span class="bing-serp__search-query">${escapeHTML(title)}</span>
            <span class="bing-serp__search-icon">${searchIcon}</span>
            <span class="bing-serp__mic-fallback" aria-label="Microphone icon unavailable">Mic</span>
          </div>
          <button class="bing-serp__signin" type="button">Sign in</button>
        </div>
        <nav class="bing-serp__tabs" aria-label="Search categories">
          <span aria-current="page">ALL</span><span>SEARCH</span><span>IMAGES</span><span>VIDEOS</span><span>MAPS</span><span>NEWS</span><span>SHOPPING</span><span>MORE ${moreIcon}</span>
        </nav>
      </header>
      <section class="bing-serp__controls" aria-label="Search filters">
        <div class="bing-serp__filter-row">
          <span>About 98,700,000 results</span><button type="button">Any time</button>
          <span class="bing-serp__location"><span aria-label="Location icon unavailable">Location</span> Results near City, State · <button type="button">Change</button></span>
          <label class="bing-serp__toggle-label" for="bing-open-links">Open links in new tab</label>
          <input id="bing-open-links" class="bing-serp__toggle" type="checkbox" aria-label="Open links in new tab">
        </div>
        <div class="bing-serp__entity-row">
          <span class="bing-serp__entity-image"><img src="${escapeHTML(data.hero.image)}" alt="${escapeHTML(data.hero.imageAlt || "")}" onerror="this.hidden=true"></span>
          <div class="bing-serp__entity-info">
            <h1>${escapeHTML(title)}</h1>
            <p>${escapeHTML(description)}</p>
          </div>
          <div class="bing-serp__pills"><span>Lorem</span><span>Ipsum</span><span>Dolor</span><span>Sit amet</span><span>More</span></div>
        </div>
      </section>
      <div class="bing-serp__body">
        <main class="bing-serp__mainline">
          <section class="bing-serp__videos" aria-labelledby="bing-video-heading">
            <h2 id="bing-video-heading">Videos of ${escapeHTML(title)}</h2>
            ${videoRows}
          </section>
          <section class="bing-serp__web-results" aria-label="Web results">${webRows}</section>
        </main>
        <aside class="bing-serp__rail" aria-label="Knowledge card">
          <kc-card entity="${escapeHTML(entity)}" platform="desktop"></kc-card>
        </aside>
      </div>`;
    }
  }

  customElements.define("bing-serp", BingSerp);
})();
