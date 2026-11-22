const shell = document.querySelector(".shell-app");
const desktopFit = document.querySelector(".desktop-fit");
const desktopCanvas = document.querySelector(".desktop-canvas");
const edgeWindow = document.querySelector(".edge-window");
const edgeWidth = document.querySelector("#edge-width");
const edgeWidthReadout = document.querySelector("#edge-width-readout");
const edgePage = document.querySelector(".edge-page");
const windowsPanel = document.querySelector(".windows-panel-preview");
const widthPresets = [...document.querySelectorAll("[data-width]")];
const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
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
  document.documentElement.dataset.theme = theme;
  edgeWidth.value = String(width);
  edgeWindow.style.width = `${width}px`;
  edgeWidthReadout.value = `${width} px`;
  edgeWidthReadout.textContent = `${width} px`;

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
  if (new URL(windowsPanel.src).searchParams.get("theme") !== theme) {
    windowsPanel.src = `windows-panel-shell.html?embed=1&theme=${theme}`;
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
