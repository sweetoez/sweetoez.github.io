(function () {
  const search20Icon = '<svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7291 14.4362C12.5924 15.411 11.115 16 9.5 16C5.91015 16 3 13.0899 3 9.5C3 5.91015 5.91015 3 9.5 3C13.0899 3 16 5.91015 16 9.5C16 11.115 15.411 12.5924 14.4361 13.7292L17.8535 17.1465C18.0487 17.3417 18.0487 17.6583 17.8535 17.8536C17.6799 18.0271 17.4105 18.0464 17.2156 17.9114L17.1464 17.8536L13.7291 14.4362ZM13.0196 13.7266C13.276 13.5128 13.5127 13.2761 13.7265 13.0197C14.5216 12.0659 15 10.8388 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15C10.8388 15 12.0658 14.5217 13.0196 13.7266Z" fill="currentColor"/></svg>';
  const search16Icon = '<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0195 11.7266C10.0658 12.5217 8.83875 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5C13 8.83875 12.5217 10.0658 11.7266 11.0195L14.8535 14.1464C15.0488 14.3417 15.0488 14.6583 14.8535 14.8536C14.6583 15.0488 14.3417 15.0488 14.1464 14.8536L11.0195 11.7266ZM12 7.5C12 5.01472 9.98528 3 7.5 3C5.01472 3 3 5.01472 3 7.5C3 9.98528 5.01472 12 7.5 12C9.98528 12 12 9.98528 12 7.5Z" fill="currentColor"/></svg>';
  const chevronRightIcon = '<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z" fill="currentColor"/></svg>';
  const chevronDownIcon = '<svg aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z" fill="currentColor"/></svg>';
  const loremSnippet = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae lectus ut orci tincidunt laoreet. Praesent commodo, justo a placerat feugiat, urna erat consequat est.";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function renderHeaderTab(label, icon, active = false) {
    return `<button class="bing-serp__header-tab${active ? " is-active" : ""}" type="button"${active ? ' aria-current="page"' : ""}>
      <span class="bing-serp__header-tab-inner">${icon}<span>${label}</span></span>
    </button>`;
  }

  function renderAlgoHeader() {
    return `<div class="bing-serp__algo-header">
      <span class="bing-serp__favicon" aria-hidden="true"><span></span></span>
      <div class="bing-serp__site-attribution">
        <span class="bing-serp__site-name">Site name</span>
        <div class="bing-serp__site-url"><a href="#">www.example.com</a><span class="bing-serp__url-caret">${chevronDownIcon}</span></div>
      </div>
    </div>`;
  }

  function renderResultList() {
    return `<div class="bing-serp__explore-list">
      ${["Result Title", "Result Title", "Result Title"].map((label, index) => `<div class="bing-serp__explore-row">
        <span class="bing-serp__small-favicon" aria-hidden="true"></span>
        <a href="#">${label}</a>
        <span class="bing-serp__explore-domain">example${index + 1}.com</span>
      </div>`).join("")}
    </div>`;
  }

  function renderRichAlgo() {
    return `<section class="bing-serp__algoblock bing-serp__algoblock--rich" aria-label="Search result">
      ${renderAlgoHeader()}
      <div class="bing-serp__algo-body bing-serp__algo-body--rich">
        <h2 class="bing-serp__algo-title"><a href="#">Title of a search result</a></h2>
        <div class="bing-serp__rich-snippet">
          <div class="bing-serp__rich-meta"><span class="bing-serp__web-badge">Web</span><span>Oct 26, 2018</span><span aria-hidden="true">·</span></div>
          <p>${loremSnippet}</p>
        </div>
        <div class="bing-serp__algo-details">
          <div class="bing-serp__tabs-shell" aria-label="Result details">
            <button class="bing-serp__row-scroll bing-serp__row-scroll--left" type="button" aria-label="Scroll result tabs left" data-scroll-target=".bing-serp__body-tabs" data-scroll-direction="-1"><span aria-hidden="true">‹</span></button>
            <div class="bing-serp__body-tabs">
              <button class="bing-serp__body-tab is-active" type="button" aria-current="page">Overview</button>
              <button class="bing-serp__body-tab" type="button">History</button>
              <button class="bing-serp__body-tab" type="button">Geography</button>
              <button class="bing-serp__body-tab" type="button">Demographics</button>
              <button class="bing-serp__body-tab" type="button">Economy</button>
              <button class="bing-serp__body-tab" type="button">Culture</button>
            </div>
            <button class="bing-serp__row-scroll bing-serp__row-scroll--right" type="button" aria-label="Scroll result tabs right" data-scroll-target=".bing-serp__body-tabs" data-scroll-direction="1">${chevronRightIcon}</button>
          </div>
          <div class="bing-serp__expanded-snippet">
            <p>${loremSnippet}</p>
            <a href="#">See more on…</a>
          </div>
        </div>
      </div>
      <div class="bing-serp__algo-footer">
        <div class="bing-serp__explore-title">EXPLORE FURTHER</div>
        ${renderResultList()}
        <div class="bing-serp__recommendation">Recommended to you based on what's popular · <a href="#">Feedback</a></div>
      </div>
    </section>`;
  }

  function renderQuestionCard(index) {
    const questions = [
      "Question title lorem ipsum",
      "How does this topic work?",
      "What is a useful overview?",
      "Where can I learn more?"
    ];
    return `<article class="bing-serp__question-card">
      <div class="bing-serp__question-title">
        <h3>${questions[index]}</h3>
        <span class="bing-serp__question-icon" aria-hidden="true">?</span>
      </div>
      <div class="bing-serp__answer">
        <p>${loremSnippet}</p>
        <div class="bing-serp__question-divider"></div>
        <div class="bing-serp__answer-link">
          <a href="#">Title of a search result</a>
          <a class="bing-serp__answer-attribution" href="#"><span class="bing-serp__small-favicon" aria-hidden="true"></span>example.com</a>
        </div>
      </div>
    </article>`;
  }

  function renderPeopleAlsoAsk() {
    return `<section class="bing-serp__people" aria-labelledby="bing-people-heading">
      <div class="bing-serp__section-title bing-serp__section-title--people"><h2 id="bing-people-heading">People also ask</h2></div>
      <div class="bing-serp__people-carousel">
        <div class="bing-serp__people-track" aria-label="Questions">
          ${[0, 1, 2, 3].map(renderQuestionCard).join("")}
        </div>
        <button class="bing-serp__carousel-next" type="button" aria-label="Next questions" data-scroll-target=".bing-serp__people-track" data-scroll-direction="1">${chevronRightIcon}</button>
      </div>
      <div class="bing-serp__people-feedback">
        <span>Feedback</span>
        <button type="button" aria-label="Helpful">+</button>
        <button type="button" aria-label="Not helpful">-</button>
      </div>
    </section>`;
  }

  function renderSimpleAlgo(index) {
    return `<section class="bing-serp__algoblock bing-serp__algoblock--simple" aria-label="Search result">
      ${renderAlgoHeader()}
      <div class="bing-serp__algo-body bing-serp__algo-body--simple">
        <h2 class="bing-serp__algo-title"><a href="#">Title of a search result</a></h2>
        <p class="bing-serp__simple-snippet">${index === 1 ? loremSnippet : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at neque quis lorem volutpat tempus."}</p>
      </div>
    </section>`;
  }

  function renderNewsCard(index) {
    return `<article class="bing-serp__news-card">
      <div class="bing-serp__news-copy">
        <div class="bing-serp__news-meta"><span>News source</span><span aria-hidden="true">·</span><span>1d</span></div>
        <a href="#">Title of a search result</a>
      </div>
      <span class="bing-serp__news-thumbnail" aria-hidden="true" data-news-image="${index}"></span>
    </article>`;
  }

  function renderNews() {
    return `<section class="bing-serp__news" aria-labelledby="bing-news-heading">
      <div class="bing-serp__news-results">
        <div class="bing-serp__section-title bing-serp__section-title--news"><h2 id="bing-news-heading">News</h2></div>
        <div class="bing-serp__news-grid">${[0, 1, 2, 3].map(renderNewsCard).join("")}</div>
      </div>
      <div class="bing-serp__explore-news">
        <h2>Explore More News</h2>
        <div class="bing-serp__news-topics">
          <button type="button"><span aria-hidden="true"></span>Topic one</button>
          <button type="button"><span aria-hidden="true"></span>Topic two</button>
          <button type="button"><span aria-hidden="true"></span>Topic three</button>
        </div>
      </div>
    </section>`;
  }

  function renderRelatedSearches(title) {
    return `<section class="bing-serp__related" aria-labelledby="bing-related-heading">
      <h2 id="bing-related-heading">Related searches for ${title}</h2>
      <div class="bing-serp__related-grid">
        ${Array.from({ length: 8 }, () => `<a href="#" class="bing-serp__related-item">${search16Icon}<span>Title of a search result</span></a>`).join("")}
      </div>
    </section>`;
  }

  class BingSerp extends HTMLElement {
    static get observedAttributes() {
      return ["entity"];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "entity" && oldValue !== newValue && this.isConnected) this.render();
    }

    render() {
      const entity = this.getAttribute("entity") || "company";
      const data = window.KC_ENTITIES?.[entity]?.desktop;
      if (!data) {
        console.error(`No desktop KC entity data found for <bing-serp> (${entity}).`);
        return;
      }

      const title = escapeHTML(data.hero.title);
      const headerTabs = [
        renderHeaderTab("ALL", search16Icon, true),
        renderHeaderTab("COPILOT", '<span class="bing-serp__copilot-tab-fallback" aria-hidden="true">C</span>'),
        renderHeaderTab("IMAGES", '<span class="bing-serp__tab-fallback" aria-hidden="true">I</span>'),
        renderHeaderTab("VIDEOS", '<span class="bing-serp__tab-fallback" aria-hidden="true">V</span>'),
        renderHeaderTab("MAPS", '<span class="bing-serp__tab-fallback" aria-hidden="true">M</span>'),
        renderHeaderTab("NEWS", '<span class="bing-serp__tab-fallback" aria-hidden="true">N</span>'),
        renderHeaderTab("SHOPPING", '<span class="bing-serp__tab-fallback" aria-hidden="true">S</span>'),
        renderHeaderTab("MORE", '<span class="bing-serp__more-fallback" aria-hidden="true"><i></i><i></i><i></i></span>')
      ].join("");

      this.innerHTML = `<header class="bing-serp__header">
        <div class="bing-serp__header-inner">
          <div class="bing-serp__topbar">
            <div class="bing-serp__search-container">
              <div class="bing-serp__search-form">
                <span class="bing-serp__wordmark" role="img" aria-label="Microsoft Bing">Microsoft Bing</span>
                <div class="bing-serp__search-box" role="search">
                  <div class="bing-serp__search-input">${search20Icon}<input type="search" aria-label="Search" value="${title}" readonly></div>
                  <div class="bing-serp__search-actions">
                    <button class="bing-serp__search-action" type="button" aria-label="Microphone"><span aria-hidden="true">M</span></button>
                    <button class="bing-serp__search-action" type="button" aria-label="Visual search"><span aria-hidden="true">V</span></button>
                  </div>
                </div>
              </div>
              <button class="bing-serp__copilot-button" type="button" aria-label="Copilot"><span aria-hidden="true"></span></button>
            </div>
            <div class="bing-serp__identity">
              <div class="bing-serp__identity-controls">
                <button class="bing-serp__signin" type="button">Sign in</button>
                <button class="bing-serp__rewards" type="button" aria-label="Rewards, 5 points"><span>5</span><span class="bing-serp__rewards-icon" aria-hidden="true"></span></button>
                <button class="bing-serp__hamburger" type="button" aria-label="Menu"><span aria-hidden="true"><i></i><i></i><i></i></span></button>
              </div>
            </div>
          </div>
          <nav class="bing-serp__header-tabs" aria-label="Search categories"><div class="bing-serp__header-tabs-track">${headerTabs}</div></nav>
        </div>
      </header>
      <section class="bing-serp__controls" aria-label="Search filters">
        <div class="bing-serp__filter-row">
          <span class="bing-serp__result-count">About <span>98,700,000</span> results</span>
          <button class="bing-serp__filter-button" type="button">Any time ${chevronDownIcon}</button>
          <span class="bing-serp__location"><span class="bing-serp__location-fallback" aria-hidden="true">•</span><span>Results near City, State</span><span aria-hidden="true">·</span><a href="#">Change</a></span>
          <label class="bing-serp__toggle-label" for="bing-open-links-in-new-tab">Open links in new tab</label>
          <input id="bing-open-links-in-new-tab" class="bing-serp__toggle" type="checkbox" checked aria-label="Open links in new tab">
        </div>
        <div class="bing-serp__entity-row">
          <div class="bing-serp__entity-info">
            <h1>${title}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div class="bing-serp__pills"><span>Lorem</span><span>Ipsum</span><span>Dolor</span><span>Sit amet</span><span>More</span></div>
        </div>
      </section>
      <div class="bing-serp__body">
        <main class="bing-serp__mainline" aria-label="Search results">
          ${renderRichAlgo()}
          ${renderPeopleAlsoAsk()}
          ${renderSimpleAlgo(1)}
          ${renderSimpleAlgo(2)}
          ${renderNews()}
          ${renderSimpleAlgo(3)}
          ${renderRelatedSearches(title)}
        </main>
        <aside class="bing-serp__rail" aria-label="Knowledge card">
          <kc-card entity="${escapeHTML(entity)}" platform="desktop"></kc-card>
        </aside>
      </div>`;

      this.querySelectorAll(".bing-serp__row-scroll, .bing-serp__carousel-next").forEach(button => {
        const scroller = this.querySelector(button.dataset.scrollTarget);
        if (!scroller) return;
        button.addEventListener("click", () => {
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          scroller.scrollBy({
            left: scroller.clientWidth * 0.75 * Number(button.dataset.scrollDirection),
            behavior: reducedMotion ? "auto" : "smooth"
          });
        });
      });

      this.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener("click", event => event.preventDefault());
      });
    }
  }

  customElements.define("bing-serp", BingSerp);
})();
