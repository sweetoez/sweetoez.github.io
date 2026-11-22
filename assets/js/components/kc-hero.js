(function () {
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);

  const classes = value => (Array.isArray(value) ? value : []).filter(Boolean).join(" ");
  const attr = (name, value) => value == null ? "" : ` ${name}="${escapeHTML(value)}"`;

  function resolveHero(element) {
    const data = window.KC_ENTITIES;
    if (!data) {
      console.error("KC_ENTITIES must load before <kc-hero>.");
      return null;
    }

    const platform = element.getAttribute("platform");
    const variant = element.getAttribute("variant");
    let hero;

    if (variant) {
      hero = variant === "cardDesktop" || variant === "cardMobile"
        ? data._samples?.[variant]
        : data._samples?.heroes?.[platform]?.find(sample => sample.id === variant);
    } else {
      const entity = element.getAttribute("entity");
      hero = data[entity]?.[platform]?.hero;
    }

    if (!hero) {
      console.error(`No KC hero data found for <kc-hero> (${variant || element.getAttribute("entity") || "missing entity"}).`);
      return null;
    }
    return hero;
  }

  function imageData(image, alt) {
    if (typeof image === "string") return { src: image, alt: alt || "" };
    return image || null;
  }

  function renderImage(image, imageClasses, alt) {
    const source = imageData(image, alt);
    if (!source) return "";
    return `<span class="${escapeHTML(classes(imageClasses))}"><img src="${escapeHTML(source.src)}" alt="${escapeHTML(source.alt || "")}" onerror="this.style.display='none'"></span>`;
  }

  function renderTitle(hero, platform, kind) {
    const nameTag = hero.nameTag || (platform === "mobile" ? "h3" : "h2");
    const category = `<p class="kc-${platform === "mobile" ? "mobile-" : ""}${kind === "designer" ? "designer" : kind === "single-image" ? "single-image" : kind}__category">${escapeHTML(hero.category)}</p>`;

    if (platform === "mobile" && kind === "designer") {
      return `<div class="kc-mobile-designer__title"><${nameTag} class="kc-mobile-designer__entity">${escapeHTML(hero.name)}</${nameTag}>${category}</div>`;
    }
    if (platform === "mobile" && kind === "single-image") {
      return `<div class="kc-mobile-single-image__title"><${nameTag} class="kc-mobile-single-image__entity">${escapeHTML(hero.name)}</${nameTag}>${category}</div>`;
    }

    const titleClass = kind === "designer" ? "kc-hero-designer__title" :
      kind === "single-image" ? "kc-hero-single-image__title" : "kc-hero-video-image__title";
    const nameClass = `${titleClass}__name`;
    const categoryClass = `${titleClass}__category`;
    const titleText = hero.titleMode === "nested"
      ? `<div class="kc-hero-title__text ${titleClass}__text"><${nameTag} class="${nameClass}">${escapeHTML(hero.name)}</${nameTag}><p class="${categoryClass}">${escapeHTML(hero.category)}</p></div>`
      : `<${nameTag} class="${nameClass}">${escapeHTML(hero.name)}</${nameTag}><p class="${categoryClass}">${escapeHTML(hero.category)}</p>`;
    return `<div class="kc-hero-title ${titleClass}">${titleText}</div>`;
  }

  function renderSocial(hero) {
    if (!hero.social) return "";
    const list = hero.social;
    const badges = (hero.brands || []).map(brand => {
      const tag = brand.tag || "a";
      const badgeClass = "kc-hero-social__badge";
      const badge = `<${tag} class="${badgeClass}"${attr("href", brand.href)}${attr("aria-label", brand.ariaLabel)}${attr("role", brand.role)}><img src="../assets/images/kc/brands/${escapeHTML(brand.slug)}.svg" alt="${escapeHTML(brand.alt || "")}" width="${escapeHTML(brand.width || "32")}" height="${escapeHTML(brand.height || "32")}"></${tag}>`;
      return `<li>${badge}</li>`;
    }).join("");
    return `<ul class="${escapeHTML(classes(list.classes))}"${attr("data-kc", list.dataKC)}${attr("aria-label", list.ariaLabel)}>${badges}</ul>`;
  }

  function renderButton(button, platform, kind) {
    const buttonClasses = platform === "mobile" && kind === "single-image"
      ? ["kc-mobile-single-image__share"]
      : button.classes;
    const label = button.label
      ? `<span class="kc-hero-button__label">${escapeHTML(button.label)}</span>`
      : "";
    const icon = button.svg || `<img src="${escapeHTML(button.icon)}" alt="" aria-hidden="true">`;
    return `<button class="${escapeHTML(classes(buttonClasses))}" type="button"${attr("aria-label", button.ariaLabel)}>${icon}${label}</button>`;
  }

  function renderActions(hero, platform, kind) {
    const buttons = hero.buttons || [];
    if (!buttons.length) return "";
    if (kind === "no-image") return renderButton(buttons[0], platform, kind);
    if ((kind === "video-image" || kind === "single-image") && platform === "desktop") {
      return renderButton(buttons[0], platform, kind);
    }
    if (kind === "single-image" && platform === "mobile") {
      return renderButton(buttons[0], platform, kind);
    }
    const dataKC = Object.prototype.hasOwnProperty.call(hero, "topActionsDataKC")
      ? hero.topActionsDataKC
      : platform === "desktop" ? "Top Actions" : null;
    return `<div class="${escapeHTML(classes(hero.topActionsClass))}"${attr("data-kc", dataKC)}>${buttons.map(button => renderButton(button, platform, kind)).join("")}</div>`;
  }

  function renderWebsite(website, mobile) {
    if (!website) return "";
    const prefix = mobile ? "kc-mobile-hero" : "kc-hero";
    const wrapperClass = classes(website.wrapperClass) || `${prefix}-website`;
    const iconClass = classes(website.iconClass) || `${prefix}-website__globe`;
    const icon = website.iconSvg || `<span class="${escapeHTML(iconClass)}" aria-hidden="true"></span>`;
    const labelTag = website.href == null ? (website.labelTag || "span") : "a";
    const labelClass = classes(website.labelClass);
    const label = `<${labelTag}${labelClass ? attr("class", labelClass) : ""}${attr("href", website.href)}>${escapeHTML(website.label)}</${labelTag}>`;
    return `<div class="${escapeHTML(wrapperClass)}">${icon}${label}</div>`;
  }

  function renderTabs(hero) {
    if (!hero.tabsVisible || !hero.tabs?.length) return "";
    const tabs = hero.tabs.map(tab => `<button class="kc-mobile-hero-tab${tab.selected ? " kc-mobile-hero-tab--selected" : ""}" type="button" role="tab" aria-selected="${tab.selected ? "true" : "false"}">${escapeHTML(tab.label)}</button>`).join("");
    return `<div class="kc-mobile-hero-tabs"${attr("data-kc", hero.tabsDataKC)}><div class="kc-mobile-hero-tabs-container" role="tablist">${tabs}</div></div>`;
  }

  function renderBody(hero, platform) {
    const mobile = platform === "mobile";
    if (!hero.bodyClass?.length && !hero.description && !hero.website && !hero.tabsVisible) return "";
    const body = escapeHTML(hero.description || "");
    const website = renderWebsite(hero.website, mobile);
    if (mobile) {
      return `<section class="${escapeHTML(classes(hero.bodyClass))}"${attr("data-kc", hero.bodyDataKC)}>${renderTabs(hero)}<div class="kc-mobile-hero-text"><p>${body}</p>${website}</div></section>`;
    }
    return `<div class="${escapeHTML(classes(hero.bodyClass))}"${attr("data-kc", hero.bodyDataKC)}><p class="${escapeHTML(classes(hero.bodyTextClass))}">${body}</p>${website}</div>`;
  }

  function renderHeroImage(hero, platform, kind) {
    if (platform === "mobile" && kind === "designer") {
      return `<div class="${escapeHTML(classes(hero.imageFrameClass))}">${renderImage(hero.image, hero.imageClass, hero.imageAlt)}<div class="${escapeHTML(classes(hero.gradientClass))}" aria-hidden="true"></div></div>`;
    }
    return renderImage(hero.image, hero.imageClass, hero.imageAlt);
  }

  function renderVideoFrame(hero) {
    const mainImage = renderImage(hero.mainImage, hero.imageClass);
    const title = renderTitle(hero, "desktop", "video-image");
    return `<div class="${escapeHTML(classes(hero.imageFrameClass))}">${mainImage}<div class="kc-hero-video-image__gradient"></div>${title}</div>`;
  }

  function renderPart(part, hero, platform, kind) {
    if (part === "image") return renderHeroImage(hero, platform, kind);
    if (part === "band") {
      const bandClass = kind === "video-image"
        ? "kc-hero-video-image__band"
        : platform === "mobile" ? "kc-mobile-single-image__band" : "kc-hero-single-image__band";
      return `<div class="${bandClass}"></div>`;
    }
    if (part === "title") return renderTitle(hero, platform, kind);
    if (part === "social") return renderSocial(hero);
    if (part === "actions") return renderActions(hero, platform, kind);
    if (part === "share") return renderActions(hero, platform, kind);
    if (part === "shareSmall") return renderActions(hero, platform, kind);
    if (part === "mainImageFrame") return renderVideoFrame(hero);
    if (part === "thumbnail") {
      return renderImage(hero.thumbnail, ["kc-img", "kc-hero-img", "kc-hero-video-image__thumbnail"]);
    }
    if (part === "frame") {
      const bodyClass = hero.bodyClass || [];
      const textClass = bodyClass.includes("kc-text-list-website") ? "kc-text-list-website" : "kc-text-list-attribution";
      return `<div class="${escapeHTML(classes(hero.frameClass))}">${hero.website ? renderBody(hero, platform) : `<div class="${textClass}"><p class="kc-hero-body">${escapeHTML(hero.description || "")}</p></div>`}</div>`;
    }
    if (part === "shareLarge") return renderActions(hero, platform, kind);
    return "";
  }

  function render(hero, element) {
    const platform = element.getAttribute("platform") || hero.platform;
    const kind = hero.kind || hero.type || "designer";
    element.className = classes(hero.classes);
    element.setAttribute("role", "article");
    if (hero.dataKC != null) element.setAttribute("data-kc", hero.dataKC);
    else element.removeAttribute("data-kc");

    if (kind === "no-image") {
      element.innerHTML = (hero.headerOrder || ["frame", "shareLarge", "social"])
        .map(part => renderPart(part, hero, platform, kind)).join("");
      return;
    }

    const headerClass = classes(hero.headerClass);
    const header = (hero.headerOrder || []).map(part => renderPart(part, hero, platform, kind)).join("");
    element.innerHTML = `<div class="${escapeHTML(headerClass)}">${header}</div>${renderBody(hero, platform)}`;
    element.querySelectorAll(".kc-mobile-hero-tabs-container").forEach(tablist => {
      tablist.addEventListener("click", event => {
        const tab = event.target.closest(".kc-mobile-hero-tab");
        if (!tab || !tablist.contains(tab)) return;
        tablist.querySelectorAll(".kc-mobile-hero-tab").forEach(item => {
          const selected = item === tab;
          item.classList.toggle("kc-mobile-hero-tab--selected", selected);
          item.setAttribute("aria-selected", String(selected));
        });
      });
    });
  }

  class KCHero extends HTMLElement {
    connectedCallback() {
      if (this._rendered) return;
      const hero = resolveHero(this);
      if (!hero) return;
      render(hero, this);
      this._rendered = true;
    }
  }

  if (!customElements.get("kc-hero")) customElements.define("kc-hero", KCHero);
})();
