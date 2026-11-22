class MsnCard extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    const escapeHtml = (value) => String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

    const variant = this.getAttribute("variant") === "ad" ? "ad" : "article";
    const title = escapeHtml(this.getAttribute("title") || "");
    const publisher = escapeHtml(this.getAttribute("publisher") || "Quantis");
    const time = escapeHtml(this.getAttribute("time") || "1d");
    const href = escapeHtml(this.getAttribute("href") || "#");
    const sponsor = escapeHtml(this.getAttribute("sponsor") || "Sponsored");
    const cta = escapeHtml(this.getAttribute("cta") || "");
    const image = this.getAttribute("image");
    const publisherIcon = this.getAttribute("publisher-icon");

    if (variant === "ad") {
      this.innerHTML = `<article class="ad-card">
  <div class="ad-card__content">
    <div class="ad-card__media">
      ${image ? `<img src="${image}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'">` : ""}
      <button class="ad-card__more" type="button" aria-label="More options">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="6" cy="12" r="1.75" fill="currentColor"/><circle cx="12" cy="12" r="1.75" fill="currentColor"/><circle cx="18" cy="12" r="1.75" fill="currentColor"/></svg>
      </button>
    </div>
    <div class="ad-card__text">
      <div class="ad-card__publisher">
        <div class="ad-card__base">
          <div class="ad-card__attribution">
            <span class="ad-card__icon"><span class="ad-card__favicon" aria-hidden="true">${publisherIcon ? `<img src="${publisherIcon}" alt="" width="16" height="16" onerror="this.style.visibility='hidden'">` : "N"}</span></span>
            <span class="ad-card__name-wrap"><span class="ad-card__name">${publisher}</span></span>
          </div>
          <div class="ad-card__meta"><span class="ad-card__dot" aria-hidden="true">·</span><span class="ad-card__sponsored">${sponsor}</span></div>
        </div>
      </div>
      <div class="ad-card__title-wrap"><h3 class="ad-card__title"><a class="ad-card__link" href="${href}">${title}${cta ? ` ${cta}` : ""}</a></h3></div>
    </div>
  </div>
</article>`;
      const card = this.querySelector(".ad-card");
      this.classList.forEach((name) => card.classList.add(name));
      [...this.attributes].filter((attribute) => attribute.name.startsWith("data-")).forEach((attribute) => {
        card.setAttribute(attribute.name, attribute.value);
      });
      return;
    }

    this.innerHTML = `<article class="article-1u win-story-card" data-variant="subtitle">
  <div class="article-media article-media--standard">
    ${image ? `<img src="${image}" alt="" width="288" height="172" onerror="this.style.visibility='hidden'">` : `<div aria-hidden="true"></div>`}
    <button class="hover-actions" type="button" aria-label="More options">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="6" cy="12" r="1.75" fill="currentColor"/><circle cx="12" cy="12" r="1.75" fill="currentColor"/><circle cx="18" cy="12" r="1.75" fill="currentColor"/></svg>
    </button>
  </div>
  <div class="article-text">
    <div class="cg-pub">
      <span class="cg-pub-brand"><span class="cg-fav-frame">${publisherIcon ? `<img src="${publisherIcon}" alt="" width="16" height="16" onerror="this.style.visibility='hidden'">` : ""}</span><span class="cg-pub-name">${publisher}</span></span>
      <span class="cg-pub-dot" aria-hidden="true">·</span><span class="cg-pub-time">${time}</span>
    </div>
    <h3 class="article-title">${title}</h3>
  </div>
</article>`;
    const card = this.querySelector(".article-1u");
    this.classList.forEach((name) => card.classList.add(name));
    [...this.attributes].filter((attribute) => attribute.name.startsWith("data-")).forEach((attribute) => {
      card.setAttribute(attribute.name, attribute.value);
    });
  }
}

customElements.define("msn-card", MsnCard);
