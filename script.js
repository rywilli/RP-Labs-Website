if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const year = document.getElementById('year');

const updateHeaderLogoSize = () => {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle('is-scrolled', window.scrollY > 0);
};

if (year) {
  year.textContent = new Date().getFullYear();
}

updateHeaderLogoSize();

let isScrollUpdateQueued = false;
window.addEventListener('scroll', () => {
  if (isScrollUpdateQueued) {
    return;
  }

  isScrollUpdateQueued = true;
  window.requestAnimationFrame(() => {
    updateHeaderLogoSize();
    isScrollUpdateQueued = false;
  });
});

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
