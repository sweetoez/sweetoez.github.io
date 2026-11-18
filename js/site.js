const setYear = () => {
  const yearEls = document.querySelectorAll('[data-year]');
  const year = new Date().getFullYear();
  yearEls.forEach((el) => { el.textContent = year; });
};

const setActivePage = () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentHash = window.location.hash;

  document.querySelectorAll('.site-nav a').forEach((link) => {
    const target = (link.getAttribute('href') || '').split('#')[0];
    const isHome = (currentPath === '' || currentPath === 'index.html') && (target === 'index.html' || target === '');
    const isMatch = target === currentPath || isHome;
    if (isMatch) {
      link.setAttribute('aria-current', 'page');
      if (currentHash === '#work' && link.getAttribute('href') === 'index.html#work') {
        link.setAttribute('aria-current', 'page');
      }
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  setActivePage();
});
