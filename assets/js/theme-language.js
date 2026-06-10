(function () {
  var root = document.documentElement;
  var themeKey = "site-theme";

  function renderClustrMaps(theme) {
    var images = Array.prototype.slice.call(document.querySelectorAll("[data-clustrmaps-image]"));
    if (!images.length) {
      return;
    }

    var palette = theme === "dark"
      ? { ocean: "000000", land: "76b900", text: "edf5e9" }
      : { ocean: "ffffff", land: "d97757", text: "8e4a34" };

    images.forEach(function (image) {
      var widgetId = image.getAttribute("data-widget-id");
      var width = image.getAttribute("data-widget-width") || "260";
      var mapSrc;
      var fallbackSrc;

      if (!widgetId) {
        return;
      }

      fallbackSrc = "https://clustrmaps.com/map_v2.png?d="
        + encodeURIComponent(widgetId)
        + "&cl=ffffff&w="
        + encodeURIComponent(width)
        + "&t=n";

      mapSrc = "https://clustrmaps.com/map_v2.png?d="
        + encodeURIComponent(widgetId)
        + "&cl=" + palette.ocean
        + "&co=" + palette.land
        + "&ct=" + palette.text
        + "&w=" + encodeURIComponent(width)
        + "&t=n";

      image.onerror = function () {
        image.onerror = null;
        image.src = fallbackSrc;
      };
      image.src = mapSrc;

      if (image.parentElement && image.parentElement.tagName === "A") {
        image.parentElement.href = "https://clustrmaps.com/site/1c4l5";
      }
    });
  }

  function updateThemeLabels(theme) {
    Array.prototype.slice.call(document.querySelectorAll("[data-toggle-theme]")).forEach(function (element) {
      element.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      element.setAttribute("data-current-theme", theme);
    });
  }

  function applyTheme(theme) {
    var nextTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", nextTheme);
    updateThemeLabels(nextTheme);

    if (document.body) {
      renderClustrMaps(nextTheme);
    }

    try {
      window.localStorage.setItem(themeKey, nextTheme);
    } catch (error) {}
  }

  function getInitialTheme() {
    try {
      var savedTheme = window.localStorage.getItem(themeKey);
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    } catch (error) {}

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function bindControls() {
    var themeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-toggle-theme]"));

    themeButtons.forEach(function (themeButton) {
      themeButton.addEventListener("click", function () {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    });

    updateThemeLabels(root.getAttribute("data-theme") || "light");
    renderClustrMaps(root.getAttribute("data-theme") || "light");
  }

  root.setAttribute("data-lang", "en");
  root.setAttribute("data-lang-ready", "true");
  applyTheme(getInitialTheme());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindControls);
  } else {
    bindControls();
  }
})();
