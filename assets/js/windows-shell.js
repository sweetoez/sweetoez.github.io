const desktop = document.querySelector(".win-desktop");
const stageFit = document.querySelector(".win-stage-fit");
const themeSelect = document.querySelector("#win-theme");
const scaleToggle = document.querySelector("[data-scale-toggle]");
const outlinesToggle = document.querySelector("[data-outlines-toggle]");
const themeStorageKey = "windows-panel-theme";
const params = new URLSearchParams(location.search);
const isEmbed = params.get("embed") === "1";
const embedTheme = params.get("theme");
const iconPaths = {
  apps: "../assets/icons/ic_fluent_apps_20_regular.svg",
  grid: "../assets/icons/ic_fluent_grid_24_filled.svg",
  search: "../assets/icons/ic_fluent_search_16_regular.svg",
  windowMultiple: "../assets/icons/ic_fluent_window_multiple_24_regular.svg",
  sparkle: "../assets/icons/ic_fluent_sparkle_24_regular.svg",
  folder: "../assets/icons/ic_fluent_folder_24_regular.svg",
  globe: "../assets/icons/ic_fluent_globe_24_regular.svg",
  buildingShop: "../assets/icons/ic_fluent_building_shop_24_regular.svg",
  chatSparkle: "../assets/icons/ic_fluent_chat_sparkle_24_regular.svg",
  mail: "../assets/icons/ic_fluent_mail_24_regular.svg",
  people: "../assets/icons/ic_fluent_people_24_regular.svg",
  settings: "../assets/icons/ic_fluent_settings_20_regular.svg",
  refresh: "../assets/icons/ic_fluent_arrow_clockwise_24_regular.svg",
  refresh24: "../assets/icons/ic_fluent_arrow_clockwise_24_regular.svg",
  notifications: "../assets/icons/ic_fluent_alert_24_regular.svg",
  alert24: "../assets/icons/ic_fluent_alert_24_regular.svg",
  feedback: "../assets/icons/ic_fluent_person_feedback_24_regular.svg",
  feedback24: "../assets/icons/ic_fluent_person_feedback_24_regular.svg",
  arrowClockwise16: "../assets/icons/arrow_clockwise_16_regular.svg",
  arrowLeft20: "../assets/icons/arrow_left_20_regular.svg",
  arrowRight20: "../assets/icons/ic_fluent_arrow_right_20_regular.svg",
  moreHorizontal: "../assets/icons/more_horizontal_20_regular.svg",
};
const iconCache = new Map();
const storySections = [
  { gridId: "win-feed-grid", count: 6 },
  { gridId: "win-feed-grid-more", count: 6 },
];
const storyTimes = ["24m", "1h", "3h", "5h", "7h", "9h", "12h", "18h", "1d", "1d", "2d", "2d"];
let scaleMode = "fit";

function readSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    return ["light", "light-warm", "dark", "dark-navy"].includes(savedTheme) ? savedTheme : "light";
  } catch (error) {
    console.error("Could not read the Windows panel theme preference.", error);
    return "light";
  }
}

function applyTheme(theme, save = false) {
  document.documentElement.dataset.theme = theme;
  themeSelect.value = theme;

  if (!save) return;

  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    console.error("Could not save the Windows panel theme preference.", error);
  }
}

function updateScale() {
  const scale = scaleMode === "fit"
    ? Math.min((window.innerWidth - (isEmbed ? 0 : 32)) / 1920, (window.innerHeight - (isEmbed ? 0 : 88)) / 1200)
    : 1;
  stageFit.style.transform = `translate(-50%, -50%) scale(${Math.max(.01, scale)})`;
  scaleToggle.setAttribute("aria-pressed", String(scaleMode === "fit"));
}

function populateStories() {
  const articles = window.MSN_CONTENT.articles;
  const storyCount = storySections.reduce((total, section) => total + section.count, 0);
  let storyIndex = 0;
  storySections.forEach(({ gridId, count }) => {
    const cards = Array.from({ length: count }, () => {
      const originalIndex = (storyIndex + 3) % storyCount;
      const story = articles[originalIndex % articles.length];
      const card = document.createElement("msn-card");
      card.setAttribute("variant", "article");
      card.setAttribute("title", story.title);
      card.setAttribute("publisher-key", story.publisherKey);
      card.setAttribute("time", storyTimes[originalIndex] || "1d");
      card.setAttribute("image", story.image);
      card.setAttribute("image-alt", story.alt);
      storyIndex += 1;
      return card;
    });
    document.getElementById(gridId).replaceChildren(...cards);
  });
}

async function inlineIcon(slot) {
  const path = iconPaths[slot.dataset.icon];
  if (!path) {
    throw new Error(`Unknown Windows panel icon: ${slot.dataset.icon}`);
  }

  if (!iconCache.has(path)) {
    iconCache.set(path, (async () => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Could not load Windows panel icon: ${path} (${response.status})`);
      }

      const source = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      const svg = source.documentElement;
      if (svg.localName !== "svg") {
        throw new Error(`Invalid SVG returned for Windows panel icon: ${path}`);
      }

      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      svg.querySelectorAll('[fill="#212121"]').forEach((shape) => shape.setAttribute("fill", "currentColor"));
      return svg;
    })());
  }

  slot.replaceChildren(document.importNode(await iconCache.get(path), true));
}

function hydrateIcons() {
  document.querySelectorAll("[data-icon]").forEach((slot) => {
    inlineIcon(slot).catch((error) => {
      slot.dataset.iconError = "true";
      console.error(error);
    });
  });
}

document.querySelectorAll(".p2-rail__item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".p2-rail__item").forEach((item) => item.removeAttribute("aria-current"));
    button.setAttribute("aria-current", "page");
  });
});

themeSelect.addEventListener("change", () => applyTheme(themeSelect.value, true));

scaleToggle.addEventListener("click", () => {
  scaleMode = scaleMode === "fit" ? "100" : "fit";
  updateScale();
});

outlinesToggle.addEventListener("click", () => {
  const enabled = document.documentElement.dataset.outlines !== "true";
  document.documentElement.dataset.outlines = String(enabled);
  outlinesToggle.setAttribute("aria-pressed", String(enabled));
});

document.querySelector(".p2-refresh__button").addEventListener("click", () => {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.querySelector(".win-feed-scroll").scrollTo({ top: 0, behavior });
});

window.addEventListener("resize", updateScale);
populateStories();
document.documentElement.dataset.embed = String(isEmbed);
applyTheme(isEmbed && ["light", "light-warm", "dark", "dark-navy"].includes(embedTheme) ? embedTheme : readSavedTheme());
updateScale();
hydrateIcons();
