document.querySelectorAll(".kc-entity-board iframe").forEach(frame => {
  let observer;
  let mutations;
  const region = frame.parentElement;

  function connect() {
    if (observer) observer.disconnect();
    if (mutations) mutations.disconnect();
    const doc = frame.contentDocument;
    const canvas = doc && doc.querySelector(".kc-full-knowledge-card");
    if (!canvas) return;

    const elements = [canvas, ...canvas.querySelectorAll(".kc-card-stack, .kc-modules-panel")];
    function resize() {
      const bottom = Math.max(...elements.map(element => element.getBoundingClientRect().bottom + doc.defaultView.scrollY));
      frame.style.height = `${Math.ceil(bottom + 32)}px`;
    }

    observer = new ResizeObserver(resize);
    elements.forEach(element => observer.observe(element));
    mutations = new MutationObserver(resize);
    mutations.observe(canvas, { attributes:true, childList:true, characterData:true, subtree:true });
    resize();
    if (!region.dataset.centered && region.scrollWidth > region.clientWidth && region.scrollLeft === 0) {
      region.scrollLeft = (region.scrollWidth - region.clientWidth) / 2;
      region.dataset.centered = "true";
    }
  }

  frame.addEventListener("load", connect);
  if (frame.contentDocument && frame.contentDocument.readyState === "complete") connect();
});
