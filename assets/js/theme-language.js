(function () {
  var root = document.documentElement;
  var languageKey = "site-language";
  var themeKey = "site-theme";

  function renderClustrMaps(theme) {
    var images = Array.prototype.slice.call(document.querySelectorAll("[data-clustrmaps-image]"));
    if (!images.length) {
      return;
    }

    var palette = theme === "dark"
      ? { ocean: "76b900", land: "000000", text: "edf5e9" }
      : { ocean: "d97757", land: "ffffff", text: "8e4a34" };

    images.forEach(function (image) {
      var widgetId = image.getAttribute("data-widget-id");
      var width = image.getAttribute("data-widget-width") || "260";
      var mapSrc;

      if (!widgetId) {
        return;
      }

      mapSrc = "//clustrmaps.com/map_v2.png?d="
        + encodeURIComponent(widgetId)
        + "&cl=" + palette.ocean
        + "&co=" + palette.land
        + "&ct=" + palette.text
        + "&w=" + encodeURIComponent(width)
        + "&t=n";

      image.src = mapSrc;

      if (image.parentElement && image.parentElement.tagName === "A") {
        image.parentElement.href = "https://clustrmaps.com/site/1c4l5";
      }
    });
  }

  function updateThemeLabels(theme) {
    var nextTheme = theme === "dark" ? "light" : "dark";
    var english = nextTheme === "dark" ? "Night Mode" : "Day Mode";
    var chinese = nextTheme === "dark" ? "夜间模式" : "日间模式";

    Array.prototype.slice.call(document.querySelectorAll("[data-theme-label-en]")).forEach(function (element) {
      element.textContent = english;
    });

    Array.prototype.slice.call(document.querySelectorAll("[data-theme-label-zh]")).forEach(function (element) {
      element.textContent = chinese;
    });

    Array.prototype.slice.call(document.querySelectorAll("[data-toggle-theme]")).forEach(function (element) {
      element.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      element.setAttribute("data-current-theme", theme);
    });
  }

  function setHidden(elements, shouldHide) {
    elements.forEach(function (element) {
      if (shouldHide) {
        element.setAttribute("hidden", "hidden");
      } else {
        element.removeAttribute("hidden");
      }
    });
  }

  function applyLanguage(language) {
    var enElements = Array.prototype.slice.call(document.querySelectorAll(".lang-en"));
    var zhElements = Array.prototype.slice.call(document.querySelectorAll(".lang-zh"));
    var nextLanguage = language === "zh" ? "zh" : "en";

    root.setAttribute("data-lang", nextLanguage);
    setHidden(enElements, nextLanguage !== "en");
    setHidden(zhElements, nextLanguage !== "zh");
    root.setAttribute("data-lang-ready", "true");

    try {
      window.localStorage.setItem(languageKey, nextLanguage);
    } catch (error) {}
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

  function getInitialLanguage() {
    try {
      return window.localStorage.getItem(languageKey) || "en";
    } catch (error) {
      return "en";
    }
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
    var languageButtons = Array.prototype.slice.call(document.querySelectorAll("[data-toggle-language]"));
    var themeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-toggle-theme]"));

    languageButtons.forEach(function (languageButton) {
      languageButton.addEventListener("click", function () {
        applyLanguage(root.getAttribute("data-lang") === "zh" ? "en" : "zh");
      });
    });

    themeButtons.forEach(function (themeButton) {
      themeButton.addEventListener("click", function () {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    });

    updateThemeLabels(root.getAttribute("data-theme") || "light");
    renderClustrMaps(root.getAttribute("data-theme") || "light");
  }

  applyLanguage(getInitialLanguage());
  applyTheme(getInitialTheme());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindControls);
  } else {
    bindControls();
  }
})();
