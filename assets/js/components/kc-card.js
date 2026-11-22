(function () {
  const inlineChevron = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.14645 5.14645C3.34171 4.95118 3.65829 4.95118 3.85355 5.14645L8 9.29289L12.1464 5.14645C12.3417 4.95118 12.6583 4.95118 12.8536 5.14645C13.0488 5.34171 13.0488 5.65829 12.8536 5.85355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L3.14645 5.85355C2.95118 5.65829 2.95118 5.34171 3.14645 5.14645Z" fill="currentColor"/></svg>';

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function resolveCard(element) {
    const data = window.KC_ENTITIES;
    if (!data) {
      console.error("KC_ENTITIES must load before <kc-card>.");
      return null;
    }

    const variant = element.getAttribute("variant");
    const entity = element.getAttribute("entity");
    const platform = element.getAttribute("platform");
    let card;

    if (variant === "cardDesktop" || variant === "cardMobile") {
      card = data._cards?.samples?.[variant === "cardDesktop" ? "desktop" : "mobile"];
      return card ? { card, data, platform: variant === "cardDesktop" ? "desktop" : "mobile", variant } : null;
    }

    card = data._cards?.entities?.[entity]?.[platform];
    if (!card || !data[entity]?.[platform]) {
      console.error(`No KC card data found for <kc-card> (${entity || "missing entity"}, ${platform || "missing platform"}).`);
      return null;
    }
    return { card, data, entity, platform };
  }

  function expansionIcon(icon) {
    if (icon?.kind === "image") {
      return `<img src="${escapeHTML(icon.src)}" alt="${escapeHTML(icon.alt || "")}">`;
    }
    if (icon?.kind === "symbol") {
      return `<svg width="16" height="16" viewBox="${escapeHTML(icon.viewBox || "0 0 16 16")}" aria-hidden="true" focusable="false"><use href="${escapeHTML(icon.href)}"></use></svg>`;
    }
    return inlineChevron;
  }

  function renderModule(module, index, entity, platform, data) {
    if (module.type === "reviews") {
      return renderReviews(data._cards.samples.reviews, module.platform);
    }
    if (entity) {
      return `<kc-module entity="${escapeHTML(entity)}" platform="${escapeHTML(platform)}" index="${index}"></kc-module>`;
    }
    return `<kc-module type="${escapeHTML(module.type)}" platform="${escapeHTML(module.platform)}" variant="${escapeHTML(module.variant)}"></kc-module>`;
  }

  function renderReviews(reviews, platform) {
    const items = reviews[platform];
    if (platform === "desktop") {
      return `<section class="kc-module kc-reviews-critics" id="kc-mod-critics" data-kc="Reviews / Critics" aria-labelledby="kc-title-critics">
        <div class="kc-module-title"><h3 id="kc-title-critics">Critic reviews</h3><a class="kc-link" href="#" aria-label="See all Critic reviews"><span class="kc-title-chevron"><img src="../assets/icons/ic_fluent_chevron_right_16_regular.svg" alt="" aria-hidden="true"></span></a></div>
        ${items.map((item, index) => `<div class="kc-reviews-critics__review">
          <p class="kc-copy kc-reviews-critics__copy kc-clamp-2">${escapeHTML(item.text)} <a class="kc-link" href="#">Full review</a></p>
          <div class="kc-reviews-critics__reviewer"><span class="kc-img" style="width:16px;height:16px;border-radius:2px"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}" onerror="this.style.display='none'"></span><span class="kc-copy">${escapeHTML(item.reviewer)}</span></div>
          ${index < items.length - 1 ? '<span class="kc-divider"></span>' : ""}
        </div>`).join("")}
      </section>`;
    }

    return `<section class="kc-module kc-module--mobile kc-mobile-reviews-critics" id="kc-mobile-critics" data-kc="Mobile / Reviews / Critics">
      <div class="kc-module-title"><h3>Critic Reviews</h3></div>
      ${items.map((item, index) => `<article class="kc-mobile-reviews-critics__review">
        <div class="kc-mobile-reviews-critics__inner">
          <p class="kc-m-reg kc-clamp-3">${escapeHTML(item.text)} <a class="kc-m-text-button" href="#">Full review</a></p>
          <div class="kc-mobile-reviews-critics__reviewer"><span class="kc-img" style="width:16px;height:16px;border-radius:2px"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}" onerror="this.style.display='none'"></span><span class="kc-m-reg">${escapeHTML(item.reviewer)}</span></div>
        </div>
        ${index < items.length - 1 ? '<span class="kc-m-divider"></span>' : ""}
      </article>`).join("")}
    </section>`;
  }

  function renderExpansion(card) {
    const dataKC = card.buttonDataKC == null ? "" : ` data-kc="${escapeHTML(card.buttonDataKC)}"`;
    return `<button class="kc-mobile-expansion-see-more" type="button"${dataKC} aria-expanded="false" aria-controls="${escapeHTML(card.moreId)}">
      <span class="kc-mobile-expansion-see-more__line" aria-hidden="true"></span>
      <span class="kc-mobile-expansion-see-more__circle" aria-hidden="true">${expansionIcon(card.icon)}</span>
      <span class="kc-mobile-expansion-see-more__label">See more</span>
    </button>`;
  }

  function renderCardContent(config, entity, platform, data) {
    const card = config.card;
    const modules = entity
      ? data[entity][platform].modules.map((module, index) => ({ index, module }))
      : card.modules.map((module, index) => ({ index, module }));
    const hero = entity
      ? `<kc-hero entity="${escapeHTML(entity)}" platform="${escapeHTML(platform)}"></kc-hero>`
      : `<kc-hero variant="${escapeHTML(config.variant)}"></kc-hero>`;

    if (platform !== "mobile") {
      return hero + modules.map(({ index, module }) => renderModule(module, index, entity, platform, data)).join("");
    }

    const visibleCount = Math.max(0, Math.min(Number(card.visibleModules) || 0, modules.length));
    const visible = modules.slice(0, visibleCount);
    const overflow = modules.slice(visibleCount);
    const hasExpansion = overflow.length > 0 || card.showExpansion;
    if (hasExpansion && !card.moreId) {
      throw new Error(`KC mobile card "${entity || config.variant}" is missing its See more panel id.`);
    }
    const more = hasExpansion
      ? `<div class="kc-card-more" id="${escapeHTML(card.moreId)}" hidden>${overflow.map(({ index, module }) => renderModule(module, index, entity, platform, data)).join("")}</div>`
      : "";
    const expansion = hasExpansion ? renderExpansion(card) : "";

    return hero +
      visible.map(({ index, module }) => renderModule(module, index, entity, platform, data)).join("") +
      (card.moreBeforeButton === false ? expansion + more : more + expansion);
  }

  class KCCard extends HTMLElement {
    connectedCallback() {
      if (this._rendered) return;
      const config = resolveCard(this);
      if (!config) {
        console.error("No KC card configuration is available for <kc-card>.");
        return;
      }

      this._config = config;
      this.className = config.card.classes;
      this.setAttribute("role", "article");
      this.setAttribute("aria-label", config.card.ariaLabel);
      if (config.card.dataKC == null) this.removeAttribute("data-kc");
      else this.setAttribute("data-kc", config.card.dataKC);
      this.innerHTML = renderCardContent(config, config.entity, config.platform, config.data);
      this._rendered = true;

      this.querySelectorAll(".kc-mobile-expansion-see-more").forEach(button => {
        button.addEventListener("click", () => {
          const expanded = button.getAttribute("aria-expanded") !== "true";
          button.setAttribute("aria-expanded", String(expanded));
          button.querySelector(".kc-mobile-expansion-see-more__label").textContent = expanded ? "See less" : "See more";
          this.syncCardLast();
          requestAnimationFrame(() => this.syncCardLast());
          this.dispatchEvent(new CustomEvent("kc-card-expansion-change", {
            bubbles: true,
            detail: { expanded }
          }));
        });
      });

      this.initializeQuickFacts();
      this.initializeTabs();
      this.initializeScrollRows();
      this.syncCardLast();
    }

    syncCardLast() {
      const { card, platform } = this._config;
      const modules = Array.from(this.querySelectorAll(".kc-module"));
      if (platform === "mobile") {
        if (card.lastModuleMode === "visible") {
          const directModules = Array.from(this.querySelectorAll(":scope > .kc-module"));
          directModules.forEach(module => module.classList.remove("kc-module--card-last"));
          directModules.filter(module => !module.hidden).at(-1)?.classList.add("kc-module--card-last");
        } else if (card.lastModuleMode === "expanded") {
          const visibleModules = Array.from(this.querySelectorAll(":scope > .kc-module, :scope > .kc-card-more:not([hidden]) > .kc-module"));
          visibleModules.forEach(module => module.classList.remove("kc-module--card-last"));
          if (this.querySelector(".kc-mobile-expansion-see-more")?.getAttribute("aria-expanded") === "true") {
            visibleModules.at(-1)?.classList.add("kc-module--card-last");
          }
        }
        return;
      }

      modules.forEach(module => module.classList.remove("kc-module--card-last"));
      modules.filter(module => !module.hidden).at(-1)?.classList.add("kc-module--card-last");
    }

    initializeQuickFacts() {
      const { card, platform } = this._config;
      if (platform !== "mobile") return;

      this.querySelectorAll(".kc-mobile-text-list-quick-facts").forEach(quickFacts => {
        const button = quickFacts.querySelector(".kc-mobile-text-list-quick-facts__more button");
        if (!button) return;

        if (card.linkQuickFactsToExpansion) {
          if (!button.hasAttribute("data-city-more")) {
            button.addEventListener("click", () => {
              this.querySelector(".kc-mobile-expansion-see-more")?.click();
            });
          }
          this.addEventListener("kc-card-expansion-change", event => {
            const expanded = event.detail.expanded;
            button.setAttribute("aria-expanded", String(expanded));
            button.textContent = expanded ? "See less" : "See more";
            if (card.quickFactsExpandedClass) {
              quickFacts.classList.toggle(card.quickFactsExpandedClass, expanded);
            }
          });
          return;
        }

        const extraFacts = Array.from(quickFacts.querySelectorAll("[data-extra-fact]"));
        if (!extraFacts.length) return;
        button.addEventListener("click", () => {
          const expanded = button.getAttribute("aria-expanded") !== "true";
          extraFacts.forEach(fact => { fact.hidden = !expanded; });
          button.setAttribute("aria-expanded", String(expanded));
          button.textContent = expanded ? "See less" : "See more";
          if (card.quickFactsExpandedClass) {
            quickFacts.classList.toggle(card.quickFactsExpandedClass, expanded);
          }
        });
      });

      this.querySelectorAll("[data-city-more]").forEach(button => {
        button.addEventListener("click", () => {
          this.querySelector(".kc-mobile-expansion-see-more")?.click();
        });
        this.addEventListener("kc-card-expansion-change", event => {
          const expanded = event.detail.expanded;
          button.setAttribute("aria-expanded", String(expanded));
          button.textContent = expanded ? "See less" : "See more";
        });
      });
    }

    initializeTabs() {
      this.querySelectorAll(".kc-mobile-hero-tabs-container").forEach(tablist => {
        const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
        if (!tabs.length) return;
        const select = tab => {
          tabs.forEach(item => {
            const selected = item === tab;
            item.classList.toggle("kc-mobile-hero-tab--selected", selected);
            item.setAttribute("aria-selected", String(selected));
            item.tabIndex = selected ? 0 : -1;
          });
        };
        const selected = tabs.find(tab => tab.getAttribute("aria-selected") === "true");
        if (selected) select(selected);
        tablist.addEventListener("click", event => {
          const tab = event.target.closest('[role="tab"]');
          if (tab && tabs.includes(tab)) select(tab);
        });
        tablist.addEventListener("keydown", event => {
          const index = tabs.indexOf(document.activeElement);
          const next = event.key === "ArrowRight" ? (index + 1) % tabs.length
            : event.key === "ArrowLeft" ? (index - 1 + tabs.length) % tabs.length
            : event.key === "Home" ? 0
            : event.key === "End" ? tabs.length - 1
            : -1;
          if (next < 0) return;
          event.preventDefault();
          select(tabs[next]);
          tabs[next].focus();
        });
      });
    }

    initializeScrollRows() {
      this.querySelectorAll(".kc-scroll-row, .kc-image-list-carousel").forEach(row => {
        const module = row.closest(".kc-module") || row.parentElement;
        const previous = module.querySelector('button[aria-label^="Previous"]');
        const next = module.querySelector('button[aria-label^="Next"]');
        const items = Array.from(row.children);
        const first = items[0];
        const second = items[1];
        if (!first) return;

        const step = second
          ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
          : first.getBoundingClientRect().width + (parseFloat(getComputedStyle(row).columnGap) || 0);
        const scroll = direction => {
          row.scrollBy({
            left: direction * step,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
          });
        };
        const sync = () => {
          if (!row.clientWidth) return;
          if (previous) previous.disabled = row.scrollLeft <= 1;
          if (next) next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 1;
        };

        if (previous) previous.addEventListener("click", () => scroll(-1));
        if (next) next.addEventListener("click", () => scroll(1));
        row.tabIndex = row.hasAttribute("tabindex") ? row.tabIndex : 0;
        row.addEventListener("keydown", event => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          scroll(event.key === "ArrowLeft" ? -1 : 1);
        });
        row.addEventListener("scroll", sync, { passive: true });
        new ResizeObserver(sync).observe(row);
        sync();
      });
    }
  }

  if (!customElements.get("kc-card")) customElements.define("kc-card", KCCard);
})();
