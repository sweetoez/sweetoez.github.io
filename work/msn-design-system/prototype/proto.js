const root = document.body;
const themeSelect = document.querySelector('#themeSelect');
const densitySelect = document.querySelector('#densitySelect');
const columnSelect = document.querySelector('#columnSelect');
const inspectToggle = document.querySelector('#inspectToggle');
const feed = document.querySelector('#feed');
const cards = [...document.querySelectorAll('.story-card')];
const updateTheme = () => root.classList.toggle('dark', themeSelect.value === 'dark');
const updateDensity = () => root.classList.toggle('compact', densitySelect.value === 'compact');
const updateColumns = () => {
  const value = columnSelect.value;
  if (value === 'auto') {
    if (window.innerWidth >= 1024) feed.dataset.columns = '3';
    else if (window.innerWidth >= 640) feed.dataset.columns = '2';
    else feed.dataset.columns = '1';
  } else {
    feed.dataset.columns = value;
  }
};
const updateInspect = () => {
  cards.forEach((card) => {
    card.classList.toggle('inspecting', inspectToggle.checked);
    card.title = inspectToggle.checked ? card.dataset.token : '';
  });
};
themeSelect.addEventListener('change', updateTheme);
densitySelect.addEventListener('change', updateDensity);
columnSelect.addEventListener('change', updateColumns);
inspectToggle.addEventListener('change', updateInspect);
window.addEventListener('resize', updateColumns);
updateTheme(); updateDensity(); updateColumns(); updateInspect();
