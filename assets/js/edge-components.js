const componentBoard = document.querySelector(".edge-components-board");
const componentWindow = document.querySelector(".edge-components-window");
const componentWidth = document.querySelector("#edge-component-width");
const componentWidthOutput = document.querySelector(".edge-components-controls output");
const componentThemeButtons = [...document.querySelectorAll("[data-theme-choice]")];
const componentIcons = {
  globe16: "../assets/icons/globe_16_regular.svg",
  dismiss12: "../assets/icons/dismiss_12_regular.svg",
  add16: "../assets/icons/ic_fluent_add_16_regular.svg",
  minimize16: "../assets/icons/subtract_16_regular.svg",
  maximize16: "../assets/icons/square_16_regular.svg",
  dismiss16: "../assets/icons/dismiss_16_regular.svg",
  back20: "../assets/icons/arrow_left_20_regular.svg",
  refresh16: "../assets/icons/arrow_clockwise_16_regular.svg",
  search16: "../assets/icons/ic_fluent_search_16_regular.svg",
  star20: "../assets/icons/star_20_regular.svg",
  more20: "../assets/icons/more_horizontal_20_regular.svg",
  readAloud: "../assets/icons/ic_fluent_star_add_24_regular.svg",
  extensions: "../assets/icons/ic_fluent_more_circle_24_regular.svg",
  grid24: "../assets/icons/ic_fluent_grid_24_filled.svg",
  refresh24: "../assets/icons/ic_fluent_arrow_clockwise_24_regular.svg",
  alert24: "../assets/icons/ic_fluent_alert_24_regular.svg",
  feedback24: "../assets/icons/ic_fluent_person_feedback_24_regular.svg",
  search24: "../assets/icons/ic_fluent_search_20_regular.svg",
  add24: "../assets/icons/ic_fluent_add_24_regular.svg",
};
const componentIconCache = new Map();

async function inlineComponentIcon(slot) {
  const path = componentIcons[slot.dataset.icon];
  if (!path) {
    throw new Error(`Unknown Edge component icon: ${slot.dataset.icon}`);
  }

  if (!componentIconCache.has(path)) {
    componentIconCache.set(path, (async () => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Could not load Edge component icon: ${path} (${response.status})`);
      }

      const source = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      const svg = source.documentElement;
      if (svg.localName !== "svg") {
        throw new Error(`Invalid SVG returned for Edge component icon: ${path}`);
      }

      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      svg.querySelectorAll('[fill="#212121"]').forEach((shape) => shape.setAttribute("fill", "currentColor"));
      return svg;
    })());
  }

  slot.replaceChildren(document.importNode(await componentIconCache.get(path), true));
}

function applyComponentTheme(theme) {
  document.documentElement.dataset.theme = theme;
  componentBoard.dataset.theme = theme;
  componentThemeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
}

function updateComponentWidth() {
  const width = Number(componentWidth.value);
  componentWindow.style.setProperty("--edge-demo-width", `${width}px`);
  componentWidthOutput.value = `${width} px`;
  componentWidthOutput.textContent = `${width} px`;
}

componentThemeButtons.forEach((button) => {
  button.addEventListener("click", () => applyComponentTheme(button.dataset.themeChoice));
});

componentWidth.addEventListener("input", updateComponentWidth);

document.querySelectorAll(".edge-components-window [data-icon]").forEach((slot) => {
  inlineComponentIcon(slot).catch((error) => {
    slot.dataset.iconError = "true";
    console.error(error);
  });
});

document.querySelectorAll(".ntp-search-slot").forEach((form) => {
  form.addEventListener("submit", (event) => event.preventDefault());
});

updateComponentWidth();
