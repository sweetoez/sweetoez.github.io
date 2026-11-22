document.querySelectorAll(".card-grid, .edge-card-grid").forEach((grid) => {
  let previousLayout = "";

  function fillRow() {
    if (!grid.getClientRects().length) return;

    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const cards = [...grid.children].filter((child) => {
      if (child.hasAttribute("data-feed-row-fill")) return false;
      const card = child.matches("msn-card")
        ? child.querySelector(".article-1u, .ad-card")
        : child;
      return card?.matches(".article-1u, .ad-card") &&
        getComputedStyle(child).display !== "none" &&
        getComputedStyle(card).display !== "none";
    });
    const layout = `${columns}:${cards.map((card) => [...grid.children].indexOf(card)).join(",")}`;
    if (layout === previousLayout) return;
    previousLayout = layout;

    grid.querySelectorAll(":scope > [data-feed-row-fill]").forEach((card) => card.remove());
    if (!cards.length) return;

    const needed = (columns - cards.length % columns) % columns;
    const overlay = grid.querySelector(":scope > .column-overlay");
    for (let index = 0; index < needed; index += 1) {
      const card = cards[index % cards.length].cloneNode(true);
      card.setAttribute("data-feed-row-fill", "");
      card.setAttribute("aria-hidden", "true");
      card.inert = true;
      card.style.visibility = "hidden";
      grid.insertBefore(card, overlay);
    }
  }

  const resizeObserver = new ResizeObserver(fillRow);
  resizeObserver.observe(grid);
  const stage = grid.closest(".stage");
  if (stage) resizeObserver.observe(stage);
  new MutationObserver(fillRow).observe(grid, { childList: true });
  fillRow();
});
