const shell = document.querySelector(".shell-app");
const desktopFit = document.querySelector(".desktop-fit");
const desktopCanvas = document.querySelector(".desktop-canvas");
const edgeWindow = document.querySelector(".edge-window");
const edgeWidth = document.querySelector("#edge-width");
const edgeWidthReadout = document.querySelector("#edge-width-readout");
const edgePage = document.querySelector(".edge-page");
const wallpaper = document.querySelector(".desktop-wallpaper img");
const feedGrid = document.querySelector("#prong-feed-grid");
const articleTemplate = document.querySelector("#prong-article-template");
const adTemplate = document.querySelector("#prong-ad-template");
const headlines = [
  "Five pantry staples that last longer than you think",
  "A beginner's guide to tidy home networks",
  "The quiet comeback of the overnight train",
  "Why small design systems scale better than big ones",
  "Weekend recipes built around one great pan",
  "A Symbol of Beauty: Exploring the Secret Lives of Peacocks",
];
const widthPresets = [...document.querySelectorAll("[data-width]")];
const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
const railItems = [...document.querySelectorAll(".p2-rail__item")];
const searchParams = new URLSearchParams(location.search);
const initialScenario = ["edge", "prong"].includes(searchParams.get("s")) ? searchParams.get("s") : "edge";
const initialTheme = ["light", "dark"].includes(searchParams.get("theme")) ? searchParams.get("theme") : "light";
const requestedWidth = Number(searchParams.get("w"));
const initialWidth = Number.isFinite(requestedWidth) && requestedWidth > 0
  ? Math.min(1978, Math.max(320, Math.round(requestedWidth)))
  : 1978;

let scenario = initialScenario;
let theme = initialTheme;
let width = initialWidth;

function renderShell() {
  shell.dataset.scenario = scenario;
  shell.dataset.theme = theme;
  edgeWidth.value = String(width);
  edgeWindow.style.width = `${width}px`;
  edgeWidthReadout.value = `${width} px`;
  edgeWidthReadout.textContent = `${width} px`;
  wallpaper.src = `../assets/images/msn/shell/wallpaper-${theme}.jpg`;

  scenarioButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scenario === scenario));
  });
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
  widthPresets.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.width) === width));
  });

  const iframeTheme = new URL(edgePage.src).searchParams.get("theme");
  if (iframeTheme !== theme) {
    edgePage.src = `msn-ntp-layout.html?embed=1&theme=${theme}`;
  }
  updateDesktopScale();
  updateUrl();
}

function updateDesktopScale() {
  const shellStyles = getComputedStyle(shell);
  const paddingLeft = Number.parseFloat(shellStyles.paddingLeft);
  const paddingRight = Number.parseFloat(shellStyles.paddingRight);
  const availableWidth = shell.clientWidth - paddingLeft - paddingRight;
  const scale = Math.min(1, availableWidth / 2222);
  desktopFit.style.width = `${2222 * scale}px`;
  desktopFit.style.height = `${1302 * scale}px`;
  desktopCanvas.style.transform = `scale(${scale})`;
}

function updateUrl() {
  const params = new URLSearchParams({ s: scenario, theme, w: String(width) });
  history.replaceState(null, "", `${location.pathname}?${params.toString()}`);
}

function populateFeed() {
  const cards = [];
  headlines.forEach((headline, index) => {
    const article = articleTemplate.content.firstElementChild.cloneNode(true);
    article.querySelector(".article-title").textContent = headline;
    cards.push(article);

    if ((index + 1) % 2 === 0) {
      cards.push(adTemplate.content.firstElementChild.cloneNode(true));
    }
  });
  feedGrid.replaceChildren(...cards);
}

scenarioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scenario = button.dataset.scenario;
    renderShell();
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    theme = button.dataset.themeChoice;
    renderShell();
  });
});

railItems.forEach((button) => {
  button.addEventListener("click", () => {
    railItems.forEach((item) => item.removeAttribute("aria-current"));
    button.setAttribute("aria-current", "page");
  });
});

edgeWidth.addEventListener("input", () => {
  width = Number(edgeWidth.value);
  renderShell();
});

widthPresets.forEach((button) => {
  button.addEventListener("click", () => {
    width = Number(button.dataset.width);
    renderShell();
  });
});

window.addEventListener("resize", updateDesktopScale);
new ResizeObserver(updateDesktopScale).observe(shell);
populateFeed();
renderShell();
