(() => {
  if (!document.querySelector(".demo")) return;

  let motionResetToken = 0;
  function suspendMotion() {
    const token = ++motionResetToken;
    document.body.classList.add("motion-disabled");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (token === motionResetToken) document.body.classList.remove("motion-disabled");
    }));
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest('.demo [data-width], .demo [data-theme-choice], .demo [data-scenario]')) {
      suspendMotion();
    }
  }, true);
  document.addEventListener("input", (event) => {
    if (event.target.matches('.demo input[type="range"]')) suspendMotion();
  }, true);
  document.addEventListener("change", (event) => {
    if (event.target.matches(".demo select")) suspendMotion();
  }, true);

  const imageSelector = [
    ".kc-img img",
    ".kc-hero-img img",
    ".shorts-card__image",
    ".article-media > img",
    ".art05-image img",
  ].map((selector) => `.demo ${selector}`).join(",");

  function watchImage(image) {
    if (image.dataset.fluentLoadObserved === "true") return;
    image.dataset.fluentLoadObserved = "true";
    image.addEventListener("load", () => image.classList.add("is-loaded"), { once: true });

    if (image.complete && image.naturalWidth > 0) {
      image.classList.add("is-loaded");
    }
  }

  document.querySelectorAll(imageSelector).forEach(watchImage);
  new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches(imageSelector)) watchImage(node);
        node.querySelectorAll(imageSelector).forEach(watchImage);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });

  function updateRailIndicator(navigation) {
    const selected = navigation.querySelector('.p2-rail__item[aria-current="page"]');
    if (!selected) return;
    navigation.style.setProperty("--fluent-rail-indicator-top", `${selected.offsetTop + selected.offsetHeight / 2}px`);
  }

  document.querySelectorAll(".p2-rail__navigation").forEach((navigation) => {
    updateRailIndicator(navigation);
    navigation.addEventListener("click", () => requestAnimationFrame(() => updateRailIndicator(navigation)));
    new MutationObserver(() => updateRailIndicator(navigation)).observe(navigation, {
      attributes: true,
      attributeFilter: ["aria-current"],
      subtree: true,
    });
    new ResizeObserver(() => updateRailIndicator(navigation)).observe(navigation);
  });

  document.addEventListener("click", (event) => {
    const refreshButton = event.target.closest('.p2-refresh__button, .p2-header__button[aria-label="Refresh"]');
    if (refreshButton) {
      const icon = refreshButton.querySelector("img, svg");
      if (icon) {
        icon.classList.remove("fluent-refreshing");
        void icon.getBoundingClientRect();
        icon.classList.add("fluent-refreshing");
        icon.addEventListener("animationend", () => icon.classList.remove("fluent-refreshing"), { once: true });
      }
    }

    const expansion = event.target.closest(".kc-mobile-expansion-see-more");
    if (!expansion) return;
    const panel = document.getElementById(expansion.getAttribute("aria-controls"));
    if (!panel) return;

    if (expansion.getAttribute("aria-expanded") === "true") {
      panel.hidden = false;
      panel.inert = false;
      panel.removeAttribute("aria-hidden");
      requestAnimationFrame(() => {
        if (expansion.getAttribute("aria-expanded") === "true") panel.classList.add("is-open");
      });
      return;
    }

    panel.hidden = false;
    panel.inert = true;
    panel.setAttribute("aria-hidden", "true");
    panel.classList.remove("is-open");

    let finished = false;
    let fallback;
    const finishClose = (transitionEvent) => {
      if (transitionEvent && transitionEvent.target !== panel) return;
      if (finished) return;
      finished = true;
      clearTimeout(fallback);
      panel.removeEventListener("transitionend", finishClose);
      if (expansion.getAttribute("aria-expanded") !== "true") panel.hidden = true;
    };

    panel.addEventListener("transitionend", finishClose);
    fallback = window.setTimeout(finishClose, 450);
  });
})();
