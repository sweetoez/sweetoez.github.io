(function () {
  if (!new URLSearchParams(location.search).has("audit")) return;
  if (!["dark", "dark-navy"].includes(document.documentElement.dataset.theme)) return;

  const excluded = new Set(["IMG", "PICTURE", "VIDEO", "CANVAS", "MAP"]);
  const luminance = value => {
    const match = value.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;
    const channels = match[1].split(",").slice(0, 3).map(channel => Number.parseFloat(channel.trim()) / 255);
    if (channels.some(channel => !Number.isFinite(channel))) return null;
    const linear = channels.map(channel => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };

  const offenders = [];
  document.querySelectorAll("kc-card, kc-hero, kc-module").forEach(root => {
    root.querySelectorAll("*").forEach(element => {
      if (excluded.has(element.tagName) || element.closest("img, picture, video, canvas, svg[data-photo], svg[data-map]")) return;
      const style = getComputedStyle(element);
      const background = luminance(style.backgroundColor);
      const text = luminance(style.color);
      const module = element.closest("kc-module, kc-hero, kc-card");
      const base = { module: module?.className || module?.tagName || "", element: element.className || element.tagName };
      if (background != null && background > 0.6) {
        offenders.push({ ...base, property: "background-color", value: style.backgroundColor });
      }
      if (text != null && text < 0.25) {
        offenders.push({ ...base, property: "color", value: style.color });
      }
    });
  });
  offenders.forEach(({ element }) => {
    const node = [...document.querySelectorAll("kc-card *, kc-hero *, kc-module *")]
      .find(candidate => (candidate.className || candidate.tagName) === element);
    if (node) node.style.outline = "2px solid red";
  });
  console.table(offenders);
})();
