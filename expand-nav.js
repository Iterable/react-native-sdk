// Expand all navigation folders on page load
(function () {
  'use strict';

  function expandAllNavigation() {
    // Find all details elements in various navigation contexts
    const selectors = [
      '.tsd-navigation details',
      '#tsd-nav-container details',
      '.site-menu details',
      '.tsd-accordion',
      'nav details',
    ];

    let foundAny = false;
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        foundAny = true;
        elements.forEach((el) => {
          if (el.tagName === 'DETAILS') {
            el.open = true;
          }
        });
      }
    });

    return foundAny;
  }

  // Strategy 1: Try immediately
  expandAllNavigation();

  // Strategy 2: Hook into TypeDoc's app if available
  let checkCount = 0;
  const maxChecks = 50; // Check for up to 5 seconds

  function checkAndExpand() {
    checkCount++;

    if (expandAllNavigation()) {
      // Keep expanding even if found, in case more navigation loads
      if (checkCount < maxChecks) {
        setTimeout(checkAndExpand, 100);
      }
    } else if (checkCount < maxChecks) {
      setTimeout(checkAndExpand, 100);
    }
  }

  // Strategy 3: MutationObserver for dynamic content
  // eslint-disable-next-line no-undef
  const observer = new MutationObserver(() => {
    expandAllNavigation();
  });

  // Strategy 4: Multiple event listeners
  window.addEventListener('load', () => {
    expandAllNavigation();
    checkAndExpand();

    // Start observing after page load
    const navContainer = document.querySelector(
      '#tsd-nav-container, .site-menu'
    );
    if (navContainer) {
      observer.observe(navContainer, {
        childList: true,
        subtree: true,
      });
    }
  });

  // Strategy 5: Check for TypeDoc's app initialization
  if (window.app) {
    expandAllNavigation();
  } else {
    Object.defineProperty(window, 'app', {
      configurable: true,
      set: function (value) {
        delete window.app;
        window.app = value;
        setTimeout(expandAllNavigation, 100);
        setTimeout(expandAllNavigation, 500);
      },
      get: function () {
        return window._app;
      },
    });
  }
})();
