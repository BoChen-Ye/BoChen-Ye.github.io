(function () {
  var root = document.documentElement;
  var languageKey = "site-language";
  var themeKey = "site-theme";

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
    var languageButton = document.querySelector("[data-toggle-language]");
    var themeButton = document.querySelector("[data-toggle-theme]");

    if (languageButton) {
      languageButton.addEventListener("click", function () {
        applyLanguage(root.getAttribute("data-lang") === "zh" ? "en" : "zh");
      });
    }

    if (themeButton) {
      themeButton.addEventListener("click", function () {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }
  }

  applyLanguage(getInitialLanguage());
  applyTheme(getInitialTheme());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindControls);
  } else {
    bindControls();
  }
})();
