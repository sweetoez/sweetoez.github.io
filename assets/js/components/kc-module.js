(function () {
  const renderers = Object.create(null);

  window.KCModules = {
    register(type, platform, renderFn) {
      if (typeof renderFn !== "function") {
        console.error(`KC module renderer for "${type}" (${platform}) must be a function.`);
        return;
      }
      renderers[`${platform}:${type}`] = renderFn;
    },

    render(type, platform, data) {
      const renderFn = renderers[`${platform}:${type}`];
      return renderFn ? renderFn(data) : null;
    }
  };

  function resolveData(element) {
    const data = window.KC_ENTITIES;
    if (!data) {
      console.error("KC_ENTITIES must load before <kc-module>.");
      return null;
    }

    const declaredPlatform = element.getAttribute("platform");
    const entity = element.getAttribute("entity");
    if (entity) {
      const platform = declaredPlatform;
      const index = Number(element.getAttribute("index"));
      if (!Number.isInteger(index) || index < 0) {
        console.error(`Invalid module index for <kc-module entity="${entity}">.`);
        return null;
      }
      const module = data[entity]?.[platform]?.modules?.[index];
      if (!module) console.error(`No KC module data found for ${entity} (${platform}) at index ${index}.`);
      return module || null;
    }

    const type = element.getAttribute("type");
    const samples = data._samples?.modules || {};
    const sampleId = element.getAttribute("variant");
    const sample = sampleId
      ? samples[sampleId]
      : Object.values(samples).find(item => item.type === type && item.platform === declaredPlatform);
    const platform = declaredPlatform || sample?.platform;
    if (!sample || sample.type !== type || sample.platform !== platform) {
      console.error(`No KC module sample found for "${type || "missing type"}" (${platform || "missing platform"}).`);
      return null;
    }
    return sample;
  }

  function applyRoot(element, root) {
    for (const [name, value] of Object.entries(root.attributes || {})) {
      if (name === "class") {
        element.className = Array.isArray(value) ? value.join(" ") : value;
      } else if (value === true) {
        element.setAttribute(name, "");
      } else if (value != null && value !== false) {
        element.setAttribute(name, value);
      }
    }

    if (root.tag === "section" && !root.attributes?.role &&
        (root.attributes?.["aria-label"] || root.attributes?.["aria-labelledby"])) {
      element.setAttribute("role", "region");
    }
  }

  class KCModule extends HTMLElement {
    connectedCallback() {
      if (this._rendered) return;
      const data = resolveData(this);
      if (!data) return;

      const platform = this.getAttribute("platform") || data.platform;
      const markup = window.KCModules.render(data.type, platform, data);
      if (markup == null) {
        console.error(`No KC module renderer registered for "${data.type}" (${platform}).`);
        return;
      }

      if (data.render?.root) applyRoot(this, data.render.root);
      this.innerHTML = markup;
      this._rendered = true;
    }
  }

  if (!customElements.get("kc-module")) customElements.define("kc-module", KCModule);
})();
