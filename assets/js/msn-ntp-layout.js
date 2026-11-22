const slider = document.querySelector("#stage-width");
const stage = document.querySelector(".stage");
const readout = document.querySelector("#layout-readout");
const presetButtons = [...document.querySelectorAll("[data-width]")];
const columnsToggle = document.querySelector("#show-columns");
const layoutSelect = document.querySelector("#widget-layout");
const widgetGrid = document.querySelector(".widget-grid");
const columnOverlay = widgetGrid.querySelector(".column-overlay");
const isEmbed = new URLSearchParams(location.search).get("embed") === "1";
const requestedTheme = new URLSearchParams(location.search).get("theme");
document.documentElement.dataset.embed = String(isEmbed);
if (isEmbed) {
  stage.classList.add("is-embed");
  if (requestedTheme === "dark") document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
}
const defaultWidgets = [...widgetGrid.querySelectorAll(":scope > .widget-item")];
const defaultWidgetByName = {
  sports: widgetGrid.querySelector(".seg-sports"),
  finance: widgetGrid.querySelector(".seg-fin"),
};
const widgetTemplates = {
  podcast: document.querySelector("#podcast-template"),
  half: document.querySelector("#half-stack-template"),
  gem2: document.querySelector("#gem-2u-template"),
  gem1: document.querySelector("#gem-1u-template"),
};
const widgetLayouts = {
  default: null,
  "three-1u": ["podcast", "sports", "finance"],
  "two-1u-half": ["podcast", "sports", "half"],
  "gem-2u-half": ["gem2", "half"],
  "gem-2u-1u": ["gem2", "sports"],
};
let renderedWidgetLayout = "";

function getLayout(width) {
  if (isEmbed) {
    if (width >= 1448) return { columns: 4, sectionWidth: Math.min(width, 1440) };
    if (width >= 980) return { columns: 3, sectionWidth: Math.min(width, 1088) };
    if (width >= 664) return { columns: 2, sectionWidth: Math.min(width, 784) };
    return { columns: 1, sectionWidth: Math.min(width, width < 348 ? 320 : 408) };
  }
  if (width >= 1296) return { columns: 4, sectionWidth: Math.min(width, 1440) };
  if (width >= 980) return { columns: 3, sectionWidth: Math.min(width, 1088) };
  if (width >= 664) return { columns: 2, sectionWidth: Math.min(width, 784) };
  return { columns: 1, sectionWidth: Math.min(width, width < 348 ? 320 : 408) };
}

function updateLayout() {
  const width = isEmbed ? Math.round(stage.getBoundingClientRect().width) : Number(slider.value);
  const { columns, sectionWidth } = getLayout(width);
  const innerWidth = Math.max(0, sectionWidth - 48);
  const columnWidth = (innerWidth - (columns - 1) * 16) / columns;

  if (!isEmbed) stage.style.width = `${width}px`;
  if (readout) {
    readout.value = `${width}px stage · ${columns} ${columns === 1 ? "column" : "columns"} · ${columnWidth}px columns · ${sectionWidth}px section · ${innerWidth}px inner · Widget layout: ${layoutSelect.selectedOptions[0].textContent}`;
  }
  presetButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.width) === width));
  });
  renderWidgetLayout(columns);
}

function renderWidgetLayout(columns) {
  const key = `${layoutSelect.value}:${columns}`;
  if (key === renderedWidgetLayout) return;
  widgetGrid.dataset.layout = layoutSelect.value;

  const selectedLayout = layoutSelect.value;
  const items = widgetLayouts[selectedLayout] ? [...widgetLayouts[selectedLayout]] : null;

  if (items && columns === 4) {
    items.push(items.includes("finance") ? "podcast" : "finance");
  }

  const nodes = items
    ? items.map((item) => {
      if (item === "sports" || item === "finance") return defaultWidgetByName[item].cloneNode(true);
      if (item === "gem2" && columns === 1) item = "gem1";
      return widgetTemplates[item].content.firstElementChild.cloneNode(true);
    })
    : defaultWidgets;

  let remaining = columns;
  const visibleNodes = nodes.filter((node) => {
    const span = Math.min(columns, node.classList.contains("span-2") ? 2 : 1);
    if (span > remaining) return false;
    remaining -= span;
    return true;
  });
  widgetGrid.replaceChildren(...visibleNodes, columnOverlay);
  renderedWidgetLayout = key;
}

slider.addEventListener("input", updateLayout);
if (isEmbed) window.addEventListener("resize", updateLayout);

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    slider.value = button.dataset.width;
    updateLayout();
  });
});

columnsToggle.addEventListener("change", () => {
  stage.classList.toggle("show-columns", columnsToggle.checked);
});

layoutSelect.addEventListener("change", () => {
  history.replaceState(null, "", `${location.pathname}${location.search}#layout=${encodeURIComponent(layoutSelect.value)}`);
  updateLayout();
});

widgetGrid.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const playButton = event.target.closest(".pod-play");
  const pauseButton = event.target.closest(".pod-pause");
  const button = playButton || pauseButton;
  if (!button) return;

  const podcast = button.closest(".seg-pod");
  const isPlaying = button === playButton;
  podcast.dataset.state = isPlaying ? "play" : "rest";
  podcast.querySelector(".pod-rest").hidden = isPlaying;
  podcast.querySelector(".pod-playing").hidden = !isPlaying;
  podcast.querySelector(isPlaying ? ".pod-pause" : ".pod-play").focus();
});

document.querySelector(".ntp-search-slot").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.querySelector(".feeds-button").addEventListener("click", () => {
  const firstSection = document.querySelector(".card-section[data-headlines]");
  const top = firstSection.getBoundingClientRect().top + window.scrollY;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  window.scrollTo({ top, behavior });
});

document.querySelectorAll(".card-section[data-headlines]").forEach((section) => {
  const grid = section.querySelector(".card-grid");
  const articleTemplate = document.querySelector("#article-template");
  const adTemplate = document.querySelector("#ad-template");
  const headlines = section.dataset.headlines.split("|");
  const count = Number(section.dataset.articles);
  section.querySelector(".section-title").textContent = section.dataset.title;
  let pairCount = 0;

  for (let index = 0; index < count; index += 1) {
    const article = articleTemplate.content.firstElementChild.cloneNode(true);
    article.querySelector(".article-title").textContent = headlines[index % headlines.length];
    grid.insertBefore(article, grid.querySelector(".column-overlay"));
    pairCount += 1;

    if (pairCount === 2) {
      grid.insertBefore(adTemplate.content.firstElementChild.cloneNode(true), grid.querySelector(".column-overlay"));
      pairCount = 0;
    }
  }

  const subtitle = section.querySelector(".section-subtitle");
  if (section.dataset.subtitle) {
    subtitle.textContent = section.dataset.subtitle;
    subtitle.hidden = false;
  }
});

const requestedLayout = new URLSearchParams(location.hash.slice(1)).get("layout");
if ([...layoutSelect.options].some((option) => option.value === requestedLayout)) {
  layoutSelect.value = requestedLayout;
}

updateLayout();
