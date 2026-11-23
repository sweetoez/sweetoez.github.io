const shell = document.querySelector(".shell-app");
const desktopFit = document.querySelector(".desktop-fit");
const desktopCanvas = document.querySelector(".desktop-canvas");
const edgeWindow = document.querySelector(".edge-window");
const edgeChrome = document.querySelector("edge-chrome");
const edgeWidth = document.querySelector("#edge-width");
const edgeWidthReadout = document.querySelector("#edge-width-readout");
const edgePage = document.querySelector(".edge-page");
const bingSerp = document.querySelector("bing-serp");
const bingEntity = document.querySelector("#bing-entity");
const windowsPanel = document.querySelector(".windows-panel-preview");
const widthPresets = [...document.querySelectorAll("[data-width]")];
const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
const entitySlugs = ["animal", "country", "state", "city", "artist", "actor", "band", "food", "ingredient", "planet", "plant", "team", "company"];
const searchParams = new URLSearchParams(location.search);
const hashEntity = location.hash.match(/^#bing\/([a-z-]+)$/)?.[1];
const requestedScenario = searchParams.get("s");
const initialScenario = hashEntity
  ? "bing"
  : ["edge", "bing", "prong"].includes(requestedScenario) ? requestedScenario : "edge";
const initialTheme = ["light", "dark"].includes(searchParams.get("theme")) ? searchParams.get("theme") : "light";
const requestedWidth = Number(searchParams.get("w"));
const initialWidth = Number.isFinite(requestedWidth) && requestedWidth > 0
  ? Math.min(1978, Math.max(320, Math.round(requestedWidth)))
  : 1978;

let scenario = initialScenario;
let theme = initialTheme;
let width = initialWidth;
let entity = entitySlugs.includes(hashEntity) ? hashEntity : "company";

entitySlugs.forEach((slug) => {
  const option = document.createElement("option");
  option.value = slug;
  option.textContent = window.KC_ENTITIES[slug].desktop.hero.title;
  bingEntity.append(option);
});

function renderShell() {
  shell.dataset.scenario = scenario;
  document.documentElement.dataset.theme = theme;
  edgeWidth.value = String(width);
  edgeWindow.style.width = `${scenario === "bing" ? 1655 : width}px`;
  edgeWidthReadout.value = `${width} px`;
  edgeWidthReadout.textContent = `${width} px`;
  edgeWindow.setAttribute("aria-label", scenario === "bing" ? "Bing search results window" : "Edge new tab page");

  scenarioButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scenario === scenario));
  });
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
  widthPresets.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.width) === width));
  });
  bingEntity.value = entity;
  if (bingSerp.getAttribute("entity") !== entity) bingSerp.setAttribute("entity", entity);

  if (scenario === "bing") {
    const title = window.KC_ENTITIES[entity].desktop.hero.title;
    edgeChrome.setAttribute("tab-title", `${title} - Search`);
    edgeChrome.setAttribute("url", `https://www.bing.com/search?q=${encodeURIComponent(title)}`);
  } else {
    edgeChrome.removeAttribute("tab-title");
    edgeChrome.removeAttribute("url");
  }

  const iframeTheme = new URL(edgePage.src).searchParams.get("theme");
  if (iframeTheme !== theme) {
    edgePage.src = `msn-ntp-layout.html?embed=1&theme=${theme}&v=135`;
  }
  if (new URL(windowsPanel.src).searchParams.get("theme") !== theme) {
    windowsPanel.src = `windows-panel-shell.html?embed=1&theme=${theme}&v=135`;
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
  const hash = scenario === "bing" ? `#bing/${entity}` : "";
  history.replaceState(null, "", `${location.pathname}?${params.toString()}${hash}`);
}

scenarioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scenario = button.dataset.scenario;
    renderShell();
  });
});

bingEntity.addEventListener("change", () => {
  entity = bingEntity.value;
  renderShell();
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    theme = button.dataset.themeChoice;
    renderShell();
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
renderShell();
