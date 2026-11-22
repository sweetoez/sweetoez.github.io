document.querySelectorAll(".card-grid, .edge-card-grid").forEach((grid) => {
  let previousLayout = "";

  function fillRow() {
    if (!grid.getClientRects().length) return;

    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const cards = [...grid.children].filter((child) =>
      !child.hasAttribute("data-feed-row-fill") &&
      child.matches(".article-1u, .ad-card") &&
      getComputedStyle(child).display !== "none"
    );
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
      grid.insertBefore(card, overlay);
    }
  }

  new ResizeObserver(fillRow).observe(grid);
  fillRow();
});
