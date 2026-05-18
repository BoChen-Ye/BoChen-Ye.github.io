(function () {
  var root = document.documentElement;
  var languageKey = "site-language";
  var themeKey = "site-theme";

  function renderClustrMaps(theme) {
    var widgets = Array.prototype.slice.call(document.querySelectorAll("[data-clustrmaps-widget]"));
    if (!widgets.length) {
      return;
    }

    widgets.forEach(function (widget, index) {
      var widgetId = widget.getAttribute("data-widget-id");
      var width = widget.getAttribute("data-widget-width") || "260";
      var color = "ffffff";

      if (!widgetId) {
        return;
      }

      widget.innerHTML = "";

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = index === 0 ? "clustrmaps" : "clustrmaps-" + index;
      script.src = "//clustrmaps.com/map_v2.js?d=" + encodeURIComponent(widgetId) + "&cl=" + color + "&w=" + encodeURIComponent(width) + "&t=n";
      widget.appendChild(script);
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
