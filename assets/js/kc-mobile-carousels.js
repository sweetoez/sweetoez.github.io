document.querySelectorAll(".kc-module--mobile .kc-scroll-row").forEach(row => {
  const module = row.closest(".kc-module--mobile");
  const name = row.getAttribute("aria-label") || module.getAttribute("aria-label") ||
    module.querySelector("h3")?.textContent || module.dataset.kc || "Items";
  row.tabIndex = 0;
  row.setAttribute("role", "region");
  if (!row.hasAttribute("aria-label")) row.setAttribute("aria-label", name);

  const makeControl = direction => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `kc-btn-flipper kc-mobile-scroll-control kc-mobile-scroll-control--${direction}`;
    button.setAttribute("aria-label", `${direction === "previous" ? "Previous" : "Next"} ${name}`);
    button.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z" fill="currentColor"/></svg>';
    button.addEventListener("click", () => {
      const step = row.children[1]?.offsetLeft - row.children[0].offsetLeft || row.clientWidth;
      row.scrollBy({
        left: direction === "previous" ? -step : step,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
      });
    });
    module.append(button);
    return button;
  };

  const previous = module.querySelector('button[aria-label^="Previous"]') || makeControl("previous");
  const next = module.querySelector('button[aria-label^="Next"]') || makeControl("next");
  const alignItems = () => {
    const columnWidth = parseFloat(getComputedStyle(row).gridTemplateColumns);
    if (!columnWidth) return;
    for (const item of row.children) {
      item.style.scrollMarginInlineStart = `${Math.max(0, (columnWidth - item.getBoundingClientRect().width) / 2)}px`;
    }
  };
  const sync = () => {
    if (!row.clientWidth) return;
    previous.disabled = row.scrollLeft <= 1;
    next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 1;
  };
  row.addEventListener("scroll", sync, { passive:true });
  new ResizeObserver(() => {
    alignItems();
    sync();
  }).observe(row);
  alignItems();
  sync();
});
