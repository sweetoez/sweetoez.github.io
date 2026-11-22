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

  function element(tag, attributes, content = "") {
    const openingTag = `<${tag}${renderAttributes(attributes)}>`;
    return voidElements.has(tag) ? openingTag : `${openingTag}${content}</${tag}>`;
  }

  function renderField(field) {
    return element(field.tag, field.attributes, escapeHTML(field.text));
  }

  function renderImageSlot(slot) {
    const image = slot.image ? element("img", slot.image.attributes) : "";
    return element(slot.tag, slot.attributes, image);
  }

  function renderIcon(icon) {
    if (icon.tag === "img") return element("img", icon.attributes);
    const paths = (icon.paths || []).map(path => element(path.tag, path.attributes)).join("");
    return element("svg", icon.attributes, paths);
  }

  function renderHeading(heading) {
    if (!heading) return "";
    const title = element(
      heading.heading.tag,
      heading.heading.attributes,
      escapeHTML(heading.heading.text)
    );
    if (!heading.trailing) return element(heading.tag, heading.attributes, title);

    let icon = renderIcon(heading.trailing.icon);
    if (heading.trailing.wrapper) {
      icon = element(
        heading.trailing.wrapper.tag,
        heading.trailing.wrapper.attributes,
        icon
      );
    }
    return element(
      heading.tag,
      heading.attributes,
      title + element(heading.trailing.tag, heading.trailing.attributes, icon)
    );
  }

  function renderControl(control) {
    return element(
      control.tag,
      control.attributes,
      control.icon ? renderIcon(control.icon) : ""
    );
  }

  function renderCarousel(data) {
    const content = data.render.content;
    const items = content.items.map(renderImageSlot).join("");
    const track = content.track
      ? element(content.track.tag, content.track.attributes, items)
      : items;
    return track + content.controls.map(renderControl).join("");
  }

  function renderIngredients(data) {
    const content = data.render.content;
    const rows = content.rows.map(row => element(
      row.tag,
      row.attributes,
      row.items.map(item => element(
        item.tag,
        item.attributes,
        renderImageSlot(item.image) + renderField(item.label)
      )).join("")
    )).join("");
    return renderHeading(content.heading) +
      element(content.list.tag, content.list.attributes, rows);
  }

  function renderMain(data) {
    const content = data.render.content;
    const items = content.items.map(item => {
      const text = element(
        item.text.tag,
        item.text.attributes,
        renderField(item.title) + (item.subtitle ? renderField(item.subtitle) : "")
      );
      return element(
        item.tag,
        item.attributes,
        renderImageSlot(item.image) + text
      );
    }).join("");
    return renderHeading(content.heading) +
      element(content.list.tag, content.list.attributes, items);
  }

  function renderPlacesToVisit(data) {
    const content = data.render.content;
    const items = content.items.map(item => element(
      item.tag,
      item.attributes,
      renderImageSlot(item.image) + renderField(item.title)
    )).join("");
    return renderHeading(content.heading) +
      element(content.list.tag, content.list.attributes, items);
  }

  function renderTopFactImage(data) {
    return data.render.content.blocks.map(block => {
      if (block.kind === "separator") {
        return element(block.tag, block.attributes);
      }
      const text = element(
        block.text.tag,
        block.text.attributes,
        block.text.fields.map(renderField).join("")
      );
      return element(
        block.tag,
        block.attributes,
        text + renderImageSlot(block.image)
      );
    }).join("");
  }

  function renderTopSongs(data) {
    const content = data.render.content;
    const columns = content.columns.map(column => element(
      column.tag,
      column.attributes,
      column.songs.map(song => {
        const text = element(
          song.text.tag,
          song.text.attributes,
          renderField(song.title) + renderField(song.artist)
        );
        return element(
          song.tag,
          song.attributes,
          renderImageSlot(song.image) + text
        );
      }).join("")
    )).join("");
    return renderHeading(content.heading) +
      element(content.list.tag, content.list.attributes, columns);
  }

  function renderFactLine(line) {
    return line.kind === "divider"
      ? element(line.tag, line.attributes)
      : renderField(line.field);
  }

  function renderFactBlock(block) {
    if (block.kind === "paragraph") return renderField(block.field);
    if (block.kind === "image") return renderImageSlot(block.image);
    if (block.kind === "divider") return element(block.tag, block.attributes);
    if (block.kind === "text") {
      return element(
        block.tag,
        block.attributes,
        block.lines.map(renderFactLine).join("")
      );
    }
    return element(
      block.tag,
      block.attributes,
      block.parts.map(renderFactBlock).join("")
    );
  }

  function renderInterestingFacts(data) {
    return data.render.content.blocks.map(renderFactBlock).join("");
  }

  const renderers = {
    carousel: renderCarousel,
    ingredients: renderIngredients,
    "interesting-facts": renderInterestingFacts,
    main: renderMain,
    "places-to-visit": renderPlacesToVisit,
    "top-fact-image": renderTopFactImage,
    "top-songs": renderTopSongs
  };

  if (!window.KCModules) {
    console.error("kc-module.js must load before image-list.js.");
    return;
  }

  for (const [type, renderFn] of Object.entries(renderers)) {
    for (const platform of ["desktop", "mobile"]) {
      window.KCModules.register(type, platform, data => {
        if (!data.render?.content) {
          console.error(`Missing image-list data for "${type}" (${platform}).`);
          return null;
        }
        return renderFn(data);
      });
    }
  }
})();
