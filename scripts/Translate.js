class Translator {
  constructor() {
    // Initialize with minimal translations, will load from files
    this.translations = {
      en: {}, fr: {}, es: {}, ar: {}, fa: {}, ru: {}
    };

    this.showToastOnSwitch = false;
    this.languageNames = {
      en: "English",
      fr: "Français",
      es: "Español",
      ar: "العربية",
      fa: "فارسى",
      ru: "Русский"
    };
    this.initialLoad = true;

    // Default language
    this.defaultLanguage = "en";
    
    // Get user's preferred language from localStorage if available
    this.currentLanguage = localStorage.getItem('userLanguage') || this.defaultLanguage;
  }

  async loadTranslationsFromFile(lang, filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok)
        throw new Error(`Failed to load translations for ${lang}`);
      const data = await response.json();
      this.translations[lang] = { ...this.translations[lang], ...data };
    } catch (err) {
      console.error(`Error loading translations from file (${filePath}):`, err);
    }
  }

  async loadTranslations(langs) {
    for (const lang of langs) {
      try {
        // Skip loading en.json if the language is English - we'll use the default language file paths
        // for all languages including English for consistency
        const filePath = `./resources/languages/${lang}.json`;
        await this.loadTranslationsFromFile(lang, filePath);
      } catch (err) {
        console.error(`Error loading ${lang} translations:`, err);
      }
    }
  }

  switchLanguage(lang) {
    if (!Object.keys(this.translations[lang]).length) {
      const message = this.getToastMessage(lang, "languageNotAvailable");
      const notAvailableToast = Toast.makeText(document.body, message, Toast.LENGTH_SHORT);
      notAvailableToast.setPosition(Toast.POSITION_TOP_CENTER);
      notAvailableToast.setStyle(Toast.STYLE_DARK_MODE); 
      notAvailableToast.setIcon("./resources/assets/ic_error2.webm", Toast.ICON_SIZE.LARGE);
      notAvailableToast.setAnimation(Toast.SLIDE_IN_TOP_CENTER, Toast.SLIDE_OUT_TOP_CENTER);
      notAvailableToast.show();
      return;
    }

    if (document.documentElement.lang === lang) {
      // Always show toast for language selection, even when language is already selected
      // This improves UX by providing clear feedback, especially for the root language (English)
      if (this.showToastOnSwitch) {
        const message = this.getToastMessage(lang, "alreadySelected");

        const alreadySelectedToast = Toast.makeText(document.body, message, Toast.LENGTH_SHORT);
        alreadySelectedToast.setPosition(Toast.POSITION_TOP_CENTER);
        alreadySelectedToast.setStyle(Toast.STYLE_TRANSPARENT); 
        alreadySelectedToast.setIcon("./resources/assets/ic_error4.webm", Toast.ICON_SIZE.MEDIUM);
        alreadySelectedToast.setAnimation(Toast.SLIDE_IN_TOP_CENTER, Toast.SLIDE_OUT_TOP_CENTER); 
        alreadySelectedToast.show();
        alreadySelectedToast.addCallback(() => console.log("Toast shown!"));
        console.warn(`(${lang}) is already selected.`);
      }
      return;
    }
    document.documentElement.lang = lang;

    // Update elements with data-translate attribute
    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate");
      let translation = this.translations[lang][key];
      if (translation) {
        if (translation.includes("{year}")) {
          translation = translation.replace("{year}", new Date().getFullYear());
        }
        el.innerHTML = translation; // Apply HTML directly for other elements
      }
    });

    // Array of element selectors to apply placeholders and direction dynamically
    const elements = ["textarea", "button", "input"];

    const setPlaceholderAndDirection = (el, placeholderKey) => {
      if (el) {
        el.placeholder = this.translations[lang][placeholderKey] || "";
        el.style.direction = ["ar", "fa"].includes(lang) ? "rtl" : "ltr";
      }
    };



    elements.forEach((selector) =>
      setPlaceholderAndDirection(
        document.querySelector(selector),
        selector === "input" ? "inputPlaceholder" : "messagePlaceholder"
      )
    );

    // Update footer text
    const footerTextElement = document.querySelector(
      "[data-translate='footerText']"
    );
    if (footerTextElement) {
      let footerText = this.translations[lang].footerText;
      if (footerText.includes("{year}")) {
        footerText = footerText.replace("{year}", new Date().getFullYear());
      }
      footerTextElement.innerHTML = footerText;
    }

    if (this.showToastOnSwitch) {
      const message = this.getToastMessage(lang, "switchedTo");
      const switchedToast = Toast.makeText(document.body, message, Toast.LENGTH_SHORT);
      switchedToast.setPosition(Toast.POSITION_TOP_CENTER);
      switchedToast.setStyle(Toast.STYLE_TRANSPARENT); 
      switchedToast.setIcon("./resources/assets/ic_checkmark.webm", Toast.ICON_SIZE.LARGE);
      switchedToast.setAnimation(Toast.SLIDE_IN_TOP_CENTER, Toast.SLIDE_OUT_TOP_CENTER); 
      switchedToast.show();
    }

    this.initialLoad = false;
  }

  getToastMessage(lang, messageType) {
    const template = this.translations[lang]?.[messageType] || "";
    return template.replace("{lang}", this.languageNames[lang] || lang);
  }

  bindLanguageSwitch() {
    document.querySelectorAll(".dropdown a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = e.target.getAttribute("data-lang");
        this.showToastOnSwitch = true;
        this.switchLanguage(lang);
        // Save language preference to localStorage instead
        localStorage.setItem('userLanguage', lang);
      });
    });
  }
}

function updateFooterDate() {
  document.addEventListener("DOMContentLoaded", () => {
    const footerYear = document.querySelector(".text-gray-400");
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
  });
}

const translator = new Translator();
translator.loadTranslations(["en", "fr", "es", "ar", "fa", "ru"]).then(() => {
  translator.bindLanguageSwitch();
  // Get language from localStorage instead of URL hash
  const userLanguage = localStorage.getItem('userLanguage') || "en";
  translator.switchLanguage(userLanguage);
});

