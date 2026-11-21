const app = document.querySelector(".edge-ntp-app");
const controls = document.querySelector(".shell-controls");
const stageViewport = document.querySelector(".edge-stage-viewport");
const stageFit = document.querySelector(".edge-stage-fit");
const edgeWindow = document.querySelector(".edge-window");
const widthSlider = document.querySelector("#edge-width");
const widthReadout = document.querySelector("#edge-width-readout");
const wallpaper = document.querySelector(".edge-desktop .win-wallpaper img");
const widthButtons = [...document.querySelectorAll("[data-width]")];
const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
const feedGrid = document.querySelector("#edge-feed-grid");
const moreFeedGrid = document.querySelector("#edge-feed-grid-more");
const articleTemplate = document.querySelector("#edge-article-template");
const adTemplate = document.querySelector("#edge-ad-template");
const iconPaths = {
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
const headlines = [
  "Five pantry staples that last longer than you think",
  "A beginner's guide to tidy home networks",
  "The quiet comeback of the overnight train",
  "Why small design systems scale better than big ones",
  "Weekend recipes built around one great pan",
  "A Symbol of Beauty: Exploring the Secret Lives of Peacocks",
];
const moreHeadlines = [
  "Five neighborhood trails to explore before the next sunny weekend",
  "Ways to make an older apartment brighter and more spacious",
  "What new local transit plans could mean for your daily commute",
  "A practical guide to better screen habits throughout the week",
  "The small kitchen tools that make weeknight cooking easier",
  "How designers are making public spaces work for more people",
];

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
  app.dataset.theme = theme;
  wallpaper.src = `../assets/images/windows/wallpaper-${theme}.jpg`;
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
}

function updateDesktopScale() {
  const scale = Math.min(
    1,
    stageViewport.clientWidth / 2222,
    Math.max(0, window.innerHeight - controls.getBoundingClientRect().height - 72) / 1302,
  );
  stageViewport.style.height = `${1302 * scale}px`;
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

function populateFeed(grid, stories) {
  const cards = [];
  stories.forEach((headline, index) => {
    const article = articleTemplate.content.firstElementChild.cloneNode(true);
    article.classList.add("edge-feed-article");
    article.dataset.feedArticle = String(index + 1);
    article.querySelector(".article-title").textContent = headline;
    cards.push(article);

    if ((index + 1) % 2 === 0) {
      const ad = adTemplate.content.firstElementChild.cloneNode(true);
      ad.classList.add("edge-feed-ad");
      ad.dataset.feedAd = String((index + 1) / 2);
      cards.push(ad);
    }
  });
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
  document.querySelectorAll(".edge-window [data-icon]").forEach((slot) => {
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
new ResizeObserver(updateDesktopScale).observe(app);
populateFeed(feedGrid, headlines);
populateFeed(moreFeedGrid, moreHeadlines);
applyTheme();
applyWidth();
hydrateIcons();
