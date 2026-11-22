(function () {
  const voidElements = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
  ]);

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function renderAttributes(attributes) {
    return Object.entries(attributes || {}).map(([name, value]) => {
      if (value === true) return ` ${name}`;
      if (value == null || value === false) return "";
      const text = Array.isArray(value) ? value.join(" ") : value;
      return ` ${name}="${escapeHTML(text)}"`;
    }).join("");
  }

  function renderNode(node) {
    if (node == null) return "";
    if (typeof node === "string") return escapeHTML(node);
    if (!node.tag) throw new Error("KC utility content nodes require a tag.");

    const openingTag = `<${node.tag}${renderAttributes(node.attributes)}>`;
    if (voidElements.has(node.tag)) return openingTag;
    const children = (node.children || []).map(renderNode).join("");
    return `${openingTag}${children}</${node.tag}>`;
  }

  function renderUtility(data) {
    const content = data.render?.content;
    if (!Array.isArray(content)) {
      throw new Error(`KC utility data for "${data.type}" is missing render content.`);
    }
    return content.map(renderNode).join("");
  }

  if (!window.KCModules) {
    console.error("kc-module.js must load before utility.js.");
    return;
  }

  ["news", "poll-trivia", "quote"].forEach(type => {
    ["desktop", "mobile"].forEach(platform => {
      window.KCModules.register(type, platform, renderUtility);
    });
  });
})();
