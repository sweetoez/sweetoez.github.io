const app = document.querySelector(".edge-ntp-app");
const controls = document.querySelector(".shell-controls");
const stageViewport = document.querySelector(".edge-stage-viewport");
const stageFit = document.querySelector(".edge-stage-fit");
const desktop = document.querySelector(".edge-desktop");
const edgeWindow = document.querySelector(".edge-window");
const widthSlider = document.querySelector("#edge-width");
const widthReadout = document.querySelector("#edge-width-readout");
const widthButtons = [...document.querySelectorAll("[data-width]")];
const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
const feedGrid = document.querySelector("#edge-feed-grid");
const moreFeedGrid = document.querySelector("#edge-feed-grid-more");
const feedArticles = window.MSN_CONTENT.articles;
const feedAds = window.MSN_CONTENT.ads;
const iconPaths = {
  globe16: "../assets/icons/globe_16_regular.svg",
  dismiss12: "../assets/icons/dismiss_12_regular.svg",
  add16: "../assets/icons/ic_fluent_add_16_regular.svg",
  minimize16: "../assets/icons/subtract_16_regular.svg",
  maximize16: "../assets/icons/square_16_regular.svg",
  dismiss16: "../assets/icons/dismiss_16_regular.svg",
  back20: "../assets/icons/arrow_left_20_regular.svg",
  refresh16: "../assets/icons/arrow_clockwise_16_regular.svg",
  refresh24: "../assets/icons/ic_fluent_arrow_clockwise_24_regular.svg",
  alert24: "../assets/icons/ic_fluent_alert_24_regular.svg",
  feedback24: "../assets/icons/ic_fluent_person_feedback_24_regular.svg",
  search16: "../assets/icons/ic_fluent_search_16_regular.svg",
  star20: "../assets/icons/star_20_regular.svg",
  more20: "../assets/icons/more_horizontal_20_regular.svg",
  readAloud: "../assets/icons/ic_fluent_star_add_24_regular.svg",
  extensions: "../assets/icons/ic_fluent_more_circle_24_regular.svg",
  grid24: "../assets/icons/ic_fluent_grid_24_filled.svg",
  search24: "../assets/icons/ic_fluent_search_20_regular.svg",
  add24: "../assets/icons/ic_fluent_add_24_regular.svg",
  search: "../assets/icons/ic_fluent_search_20_regular.svg",
  refresh: "../assets/icons/ic_fluent_arrow_clockwise_24_regular.svg",
  notifications: "../assets/icons/ic_fluent_alert_24_regular.svg",
  feedback: "../assets/icons/ic_fluent_person_feedback_24_regular.svg",
  add: "../assets/icons/ic_fluent_add_20_regular.svg",
  play: "../assets/icons/ic_fluent_play_20_filled.svg",
  feeds: "../assets/icons/text_bullet_list_square_20_regular.svg",
};
const widthStorageKey = "edge-ntp-width";
const themeStorageKey = "edge-ntp-theme";
const iconCache = new Map();
const isFullScreen = new URLSearchParams(location.search).get("full") === "1";

function readPreference(key, validate, fallback) {
  try {
    const savedValue = localStorage.getItem(key);
    return validate(savedValue) ? savedValue : fallback;
  } catch (error) {
    console.error(`Could not read the Edge new tab page preference: ${key}.`, error);
    return fallback;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Could not save the Edge new tab page preference: ${key}.`, error);
  }
}

let width = Number(readPreference(
  widthStorageKey,
  (value) => Number.isInteger(Number(value)) && Number(value) >= 663 && Number(value) <= 1978,
  "1978",
));
let theme = readPreference(themeStorageKey, (value) => value === "light" || value === "dark", "light");

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
}

function updateDesktopScale() {
  const desktopWidth = Math.max(1920, width + 48);
  stageFit.style.width = `${desktopWidth}px`;
  desktop.style.width = `${desktopWidth}px`;
  const availableHeight = isFullScreen
    ? window.innerHeight
    : Math.max(0, window.innerHeight - controls.getBoundingClientRect().height - 72);
  const scale = Math.min(
    1,
    stageViewport.clientWidth / desktopWidth,
    availableHeight / 1200,
  );
  stageViewport.style.height = `${1200 * scale}px`;
  stageFit.style.transform = `translateX(-50%) scale(${scale})`;
}

function applyWidth() {
  widthSlider.value = String(width);
  widthReadout.value = `${width} px`;
  widthReadout.textContent = `${width} px`;
  edgeWindow.style.width = `${width}px`;
  edgeWindow.dataset.windowWidth = String(width);
  widthButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.width) === width));
  });
  updateDesktopScale();
}

function populateFeed(grid, articleStart, adStart) {
  const cards = [];
  let adCount = 0;
  for (let index = 0; index < 8; index += 1) {
    const story = feedArticles[(articleStart + index) % feedArticles.length];
    const article = document.createElement("msn-card");
    article.setAttribute("variant", "article");
    article.setAttribute("title", story.title);
    article.setAttribute("publisher-key", story.publisherKey);
    article.setAttribute("time", "1d");
    article.setAttribute("image", story.image);
    article.setAttribute("image-alt", story.alt);
    article.classList.add("edge-feed-article");
    article.dataset.feedArticle = String(index + 1);
    cards.push(article);

    if ((index + 1) % 2 === 0) {
      const adContent = feedAds[(adStart + adCount) % feedAds.length];
      const ad = document.createElement("msn-card");
      ad.setAttribute("variant", "ad");
      ad.setAttribute("title", adContent.headline);
      ad.setAttribute("publisher-key", adContent.publisherKey);
      ad.setAttribute("image", adContent.image);
      ad.setAttribute("image-alt", adContent.alt);
      ad.classList.add("edge-feed-ad");
      ad.dataset.feedAd = String(adCount + 1);
      cards.push(ad);
      adCount += 1;
    }
  }
  grid.replaceChildren(...cards);
}

async function inlineIcon(slot) {
  const path = iconPaths[slot.dataset.icon];
  if (!path) {
    throw new Error(`Unknown Edge new tab page icon: ${slot.dataset.icon}`);
  }

  if (!iconCache.has(path)) {
    iconCache.set(path, (async () => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Could not load Edge new tab page icon: ${path} (${response.status})`);
      }

      const source = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      const svg = source.documentElement;
      if (svg.localName !== "svg") {
        throw new Error(`Invalid SVG returned for Edge new tab page icon: ${path}`);
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
  document.querySelectorAll(".edge-window [data-icon], msn-header-controls [data-icon]").forEach((slot) => {
    inlineIcon(slot).catch((error) => {
      slot.dataset.iconError = "true";
      console.error(error);
    });
  });
}

widthSlider.addEventListener("input", () => {
  width = Number(widthSlider.value);
  applyWidth();
  savePreference(widthStorageKey, String(width));
});

widthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    width = Number(button.dataset.width);
    applyWidth();
    savePreference(widthStorageKey, String(width));
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    theme = button.dataset.themeChoice;
    applyTheme();
    savePreference(themeStorageKey, theme);
  });
});

document.querySelector(".ntp-search-slot").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.querySelector(".feeds-button").addEventListener("click", () => {
  const content = document.querySelector(".edge-content");
  const firstFeedSection = document.querySelector("#trending-heading").closest(".edge-card-section");
  const scale = content.getBoundingClientRect().width / content.clientWidth;
  const top = (firstFeedSection.getBoundingClientRect().top - content.getBoundingClientRect().top) / scale + content.scrollTop;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  content.scrollTo({ top, behavior });
});

window.addEventListener("resize", updateDesktopScale);
populateFeed(feedGrid, 5, 0);
populateFeed(moreFeedGrid, 11, 3);
app.dataset.fullScreen = String(isFullScreen);
applyTheme();
applyWidth();
hydrateIcons();
