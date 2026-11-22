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

  function renderIcon(icon) {
    if (icon.tag === "img") return element("img", icon.attributes);
    const paths = (icon.children || []).map(child => element(child.tag, child.attributes)).join("");
    return element("svg", icon.attributes, paths);
  }

  function renderHeading(heading) {
    if (!heading) return "";
    let decoration = "";
    if (heading.decoration) {
      let icon = renderIcon(heading.decoration.icon);
      if (heading.decoration.wrapper) {
        icon = element(heading.decoration.wrapper.tag, heading.decoration.wrapper.attributes, icon);
      }
      decoration = element(heading.decoration.tag, heading.decoration.attributes, icon);
    }
    return element(
      heading.tag,
      heading.attributes,
      renderField(heading.title) + decoration
    );
  }

  function renderTopFact(data) {
    const content = data.render.content;
    const divider = content.separator
      ? () => element(content.separator.tag, content.separator.attributes)
      : () => "";
    let markup = "";

    if (content.slot) {
      const image = element("img", content.slot.image);
      const frame = element(content.slot.frame.tag, content.slot.frame.attributes, image);
      markup += element("div", content.slot.attributes, frame);
      if (content.separatorCount === content.items.length) markup += divider();
    }

    content.items.forEach((item, index) => {
      if (index > 0) markup += divider();
      markup += element(
        "div",
        item.attributes,
        item.fields.map(renderField).join("")
      );
    });

    return markup;
  }

  function renderFactList(list) {
    const separatorsAfter = new Set(list.separatorsAfter);
    let content = "";
    list.items.forEach((item, index) => {
      content += element(
        "div",
        item.attributes,
        renderField(item.label) + renderField(item.value)
      );
      if (separatorsAfter.has(index)) {
        content += element(list.separator.tag, list.separator.attributes);
      }
    });
    return element(list.tag, list.attributes, content);
  }

  function renderQuickFactsImageRow(imageRow) {
    const artist = imageRow.artist;
    const avatar = element(
      artist.avatar.tag,
      artist.avatar.attributes,
      element("img", artist.avatar.image)
    );
    const artistPair = element(
      "div",
      artist.pair.attributes,
      renderField(artist.pair.label) + renderField(artist.pair.value)
    );
    const artistMarkup = element(
      "div",
      artist.attributes,
      avatar + artistPair
    );
    const pairs = imageRow.pairs.map(pair => element(
      "div",
      pair.attributes,
      renderField(pair.label) + renderField(pair.value)
    )).join("");
    const row = element("div", imageRow.row.attributes, artistMarkup + pairs);
    return element("div", imageRow.frame.attributes, row);
  }

  function renderQuickFactsMore(more) {
    if (!more) return "";
    return element(
      "div",
      more.attributes,
      renderField(more.button) + renderIcon(more.icon)
    );
  }

  function renderQuickFacts(data) {
    const content = data.render.content;
    let markup = "";
    if (content.photoSlot) {
      markup += element(content.photoSlot.tag, content.photoSlot.attributes);
    }
    if (content.imageRow) {
      markup += renderQuickFactsImageRow(content.imageRow);
    } else if (content.list) {
      markup += renderFactList(content.list);
    }
    return markup + renderQuickFactsMore(content.more);
  }

  function renderAwards(data) {
    const content = data.render.content;
    const items = content.list.items.map(item => element(
      item.tag,
      item.attributes,
      item.fields.map(renderField).join("")
    )).join("");
    return renderHeading(content.heading) +
      element(content.list.tag, content.list.attributes, items);
  }

  function renderAttributionSegment(segment) {
    if (segment.kind === "text") return escapeHTML(segment.value);
    if (segment.kind === "link") {
      return element("a", segment.attributes, escapeHTML(segment.value));
    }
    return element(segment.tag, segment.attributes, escapeHTML(segment.value));
  }

  function renderAttributions(data) {
    return data.render.content.paragraphs.map(paragraph => element(
      "p",
      paragraph.attributes,
      paragraph.segments.map(renderAttributionSegment).join("")
    )).join("");
  }

  const renderers = {
    "top-fact": renderTopFact,
    "quick-facts": renderQuickFacts,
    awards: renderAwards,
    attributions: renderAttributions,
    attribution: renderAttributions
  };

  for (const [type, renderFn] of Object.entries(renderers)) {
    for (const platform of ["desktop", "mobile"]) {
      window.KCModules.register(type, platform, data => {
        if (!data.render?.content) {
          console.error(`Missing text-list data for "${type}" (${platform}).`);
          return null;
        }
        return renderFn(data);
      });
    }
  }
})();
