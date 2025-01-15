class Translator {
  constructor() {
    this.translations = {
      en: {
        footerText: "© {year} Soufiano Dev. All rights reserved.",
        messagePlaceholder: "Hello, I would like to discuss...",
        inputPlaceholder: "John Smith",
        submitButton: "Submit",
        sendingButton: "Sending...",
        thankYouMessage:
          "Thank you for reaching out! I'll get back to you soon.",
        errorMessage: "Oops! Something went wrong. Please try again later.",
        fillAllFieldsMessage: "Please fill out all fields before submitting.",
      },
      fr: {
        footerText: "© {year} Soufiano Dev. Tous droits réservés.",
        messagePlaceholder: "Bonjour, je voudrais discuter de...",
        inputPlaceholder: "John Smith",
        submitButton: "Envoyer un Message",
        sendingButton: "Envoi en cours...",
        thankYouMessage: "Merci de votre message ! Je vous répondrai bientôt.",
        errorMessage:
          "Oups ! Quelque chose s'est mal passé. Veuillez réessayer plus tard.",
        fillAllFieldsMessage:
          "Veuillez remplir tous les champs avant de soumettre.",
      },
      es: {
        footerText: "© {year} Soufiano Dev. Todos los derechos reservados.",
        messagePlaceholder: "Hola, me gustaría hablar de...",
        inputPlaceholder: "John Smith",
        submitButton: "Enviar Mensaje",
        sendingButton: "Enviando...",
        thankYouMessage:
          "¡Gracias por contactarme! Me pondré en contacto contigo pronto.",
        errorMessage:
          "¡Ups! Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
        fillAllFieldsMessage:
          "Por favor, complete todos los campos antes de enviar.",
      },
      ar: {
        footerText: "© {year} Soufiano Dev. جميع الحقوق محفوظة.",
        messagePlaceholder: "مرحبًا، أود مناقشة...",
        inputPlaceholder: "جون سميث",
        submitButton: "إرسال",
        sendingButton: "جارٍ الإرسال...",
        thankYouMessage: "شكرًا على تواصلك! سأرد عليك قريبًا.",
        errorMessage: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.",
        fillAllFieldsMessage: "يرجى ملء جميع الحقول قبل الإرسال.",
      },
      fa: {
        footerText: "© {year} Soufiano Dev. تمامی حقوق محفوظ است.",
        messagePlaceholder: "سلام، می‌خواهم درباره ... صحبت کنم.",
        inputPlaceholder: "جان اسمیت",
        submitButton: "ارسال",
        sendingButton: "در حال ارسال...",
        thankYouMessage: "با تشکر از تماس شما! به زودی با شما تماس خواهم گرفت.",
        errorMessage: "اوه! مشکلی پیش آمد. لطفاً بعداً دوباره امتحان کنید.",
        fillAllFieldsMessage: "لطفاً قبل از ارسال، تمام فیلدها را پر کنید.",
      },
    };

    this.showToastOnSwitch = false;
    this.languageNames = {
      en: "English",
      fr: "Français",
      es: "Español",
      ar: "العربية",
      fa: "فارسى",
    };
    this.initialLoad = true;

    this.toastMessages = {
      en: {
        languageNotAvailable: "Translations for {lang} not available.",
        alreadySelected: "{lang} is already selected.",
        switchedTo: "Language switched to {lang}.",
      },
      fr: {
        languageNotAvailable:
          "Les traductions pour {lang} ne sont pas disponibles.",
        alreadySelected: "{lang} est déjà sélectionné.",
        switchedTo: "Langue changée en {lang}.",
      },
      es: {
        languageNotAvailable:
          "Las traductions para {lang} no están disponibles.",
        alreadySelected: "{lang} ya está seleccionado.",
        switchedTo: "Idioma cambiado a {lang}.",
      },
      ar: {
        languageNotAvailable: "الترجمات للغة {lang} غير متوفرة.",
        alreadySelected: "اللغة {lang} مُختارة بالفعل.",
        switchedTo: "تم تغيير اللغة إلى {lang}.",
      },
      fa: {
        languageNotAvailable: "ترجمه‌ها برای زبان {lang} موجود نیست.",
        alreadySelected: "زبان {lang} از قبل انتخاب شده است.",
        switchedTo: "زبان به {lang} تغییر یافت.",
      },
    };
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
      Toast.makeText(document.body, message, Toast.LENGTH_SHORT)
        .setPosition(Toast.POSITION_TOP_CENTER)
        .setStyle("default2")
        .setIcon("./resources/assets/checkmark.webm", "EXTRA_LARGE")
        .addCallback(() => console.log("Toast shown!"))
        .show();
      return;
    }

    if (document.documentElement.lang === lang) {
      if (!this.initialLoad) {
        const message = this.getToastMessage(lang, "alreadySelected");
        Toast.makeText(document.body, message, Toast.LENGTH_SHORT)
          .setPosition(Toast.POSITION_TOP_CENTER)
          .setStyle("default2")
          .setIcon("./resources/assets/ic_error1_150x150.webm", "EXTRA_LARGE")
          .addCallback(() => console.log("Toast shown!"))
          .show();
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

    // Update textarea placeholder and direction
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.placeholder = this.translations[lang].messagePlaceholder || "";
      if (lang === "ar" || lang === "fa") {
        textarea.style.direction = "rtl"; // Set direction to rtl for Arabic and Farsi
      } else {
        textarea.style.direction = "ltr"; // Reset direction for other languages
      }
    }

    const button = document.querySelector("button");
    if (button) {
      textarea.placeholder = this.translations[lang].messagePlaceholder || "";
      if (lang === "ar" || lang === "fa") {
        textarea.style.direction = "rtl"; // Set direction to rtl for Arabic and Farsi
      } else {
        textarea.style.direction = "ltr"; // Reset direction for other languages
      }
    }

    // Update input placeholder and direction
    const input = document.querySelector("input");
    if (input) {
      input.placeholder = this.translations[lang].inputPlaceholder || "";
      if (lang === "ar" || lang === "fa") {
        input.style.direction = "rtl"; // Set direction to rtl for Arabic and Farsi
      } else {
        input.style.direction = "ltr"; // Reset direction for other languages
      }
    }

    // Update footer text (unchanged)
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
      Toast.makeText(document.body, message, Toast.LENGTH_SHORT)
        .setPosition(Toast.POSITION_TOP_CENTER)
        .setStyle("default2")
        .setIcon("./resources/assets/checkmark.webm", "EXTRA_LARGE")
        .addCallback(() => console.log("Toast shown!"))
        .show();
    }

    this.initialLoad = false;
  }

  getToastMessage(lang, messageType) {
    const template = this.toastMessages[lang]?.[messageType] || "";
    return template.replace("{lang}", this.languageNames[lang] || lang);
  }

  bindLanguageSwitch() {
    document.querySelectorAll(".dropdown a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = e.target.getAttribute("data-lang");
        this.showToastOnSwitch = true;
        this.switchLanguage(lang);
        window.location.hash = lang;
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
translator.loadTranslations(["en", "fr", "es", "ar", "fa"]).then(() => {
  translator.bindLanguageSwitch();
  const preSelectedLang = window.location.hash.slice(1) || "en";
  translator.switchLanguage(preSelectedLang);
});

// class Translator {
//   constructor() {
//     this.translations = {
//       en: {
//         footerText: "© {year} Soufiano Dev. All rights reserved.",
//         messagePlaceholder: "Hello, I would like to discuss...",
//         inputPlaceholder: "John Smith",
//         submitButton: "Submit",
//         sendingButton: "Sending...",
//         thankYouMessage:
//           "Thank you for reaching out! I'll get back to you soon.",
//         errorMessage: "Oops! Something went wrong. Please try again later.",
//         fillAllFieldsMessage: "Please fill out all fields before submitting.",
//       },
//       fr: {
//         footerText: "© {year} Soufiano Dev. Tous droits réservés.",
//         messagePlaceholder: "Bonjour, je voudrais discuter de...",
//         inputPlaceholder: "John Smith",
//         submitButton: "Envoyer un Message",
//         sendingButton: "Envoi en cours...",
//         thankYouMessage: "Merci de votre message ! Je vous répondrai bientôt.",
//         errorMessage:
//           "Oups ! Quelque chose s'est mal passé. Veuillez réessayer plus tard.",
//         fillAllFieldsMessage:
//           "Veuillez remplir tous les champs avant de soumettre.",
//       },
//       es: {
//         footerText: "© {year} Soufiano Dev. Todos los derechos reservados.",
//         messagePlaceholder: "Hola, me gustaría hablar de...",
//         inputPlaceholder: "John Smith",
//         submitButton: "Enviar Mensaje",
//         sendingButton: "Enviando...",
//         thankYouMessage:
//           "¡Gracias por contactarme! Me pondré en contacto contigo pronto.",
//         errorMessage:
//           "¡Ups! Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
//         fillAllFieldsMessage:
//           "Por favor, complete todos los campos antes de enviar.",
//       },
//       ar: {
//         footerText: "© {year} Soufiano Dev. جميع الحقوق محفوظة.",
//         messagePlaceholder: "مرحبًا، أود مناقشة...",
//         inputPlaceholder: "جون سميث",
//         submitButton: "إرسال",
//         sendingButton: "جارٍ الإرسال...",
//         thankYouMessage: "شكرًا على تواصلك! سأرد عليك قريبًا.",
//         errorMessage: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.",
//         fillAllFieldsMessage: "يرجى ملء جميع الحقول قبل الإرسال.",
//       },

//       fa: {
//         footerText: "© {year} Soufiano Dev. تمامی حقوق محفوظ است.",
//         messagePlaceholder: "سلام، می‌خواهم درباره ... صحبت کنم.",
//         inputPlaceholder: "جان اسمیت",
//         submitButton: "ارسال",
//         sendingButton: "در حال ارسال...",
//         thankYouMessage: "با تشکر از تماس شما! به زودی با شما تماس خواهم گرفت.",
//         errorMessage: "اوه! مشکلی پیش آمد. لطفاً بعداً دوباره امتحان کنید.",
//         fillAllFieldsMessage: "لطفاً قبل از ارسال، تمام فیلدها را پر کنید.",
//       },
//     };
//     this.toast = document.getElementById("toast");
//     this.showToastOnSwitch = false;
//     this.languageNames = {
//       en: "English",
//       fr: "Français",
//       es: "Español",
//       ar: "العربية",
//       fa: "فارسى",
//     };
//     this.initialLoad = true;

//     this.toastMessages = {
//       en: {
//         languageNotAvailable: "Translations for {lang} not available.",
//         alreadySelected: "{lang} is already selected.",
//         switchedTo: "Language switched to {lang}.",
//       },
//       fr: {
//         languageNotAvailable:
//           "Les traductions pour {lang} ne sont pas disponibles.",
//         alreadySelected: "{lang} est déjà sélectionné.",
//         switchedTo: "Langue changée en {lang}.",
//       },
//       es: {
//         languageNotAvailable:
//           "Las traducciones para {lang} no están disponibles.",
//         alreadySelected: "{lang} ya está seleccionado.",
//         switchedTo: "Idioma cambiado a {lang}.",
//       },
//       ar: {
//         languageNotAvailable: "الترجمات للغة {lang} غير متوفرة.",
//         alreadySelected: "اللغة {lang} مُختارة بالفعل.",
//         switchedTo: "تم تغيير اللغة إلى {lang}.",
//       },

//       fa: {
//         languageNotAvailable: "ترجمه‌ها برای زبان {lang} موجود نیست.",
//         alreadySelected: "زبان {lang} از قبل انتخاب شده است.",
//         switchedTo: "زبان به {lang} تغییر یافت.",
//       },
//     };
//   }

//   async loadTranslationsFromFile(lang, filePath) {
//     try {
//       const response = await fetch(filePath);
//       if (!response.ok)
//         throw new Error(`Failed to load translations for ${lang}`);
//       const data = await response.json();
//       this.translations[lang] = { ...this.translations[lang], ...data };
//     } catch (err) {
//       console.error(`Error loading translations from file (${filePath}):`, err);
//     }
//   }

//   async loadTranslations(langs) {
//     for (const lang of langs) {
//       try {
//         const filePath = `./resources/languages/${lang}.json`;
//         await this.loadTranslationsFromFile(lang, filePath);
//       } catch (err) {
//         console.error(`Error loading ${lang} translations:`, err);
//       }
//     }
//   }

//   switchLanguage(lang) {
//     if (!Object.keys(this.translations[lang]).length) {
//       this.showToast(this.getToastMessage(lang, "languageNotAvailable"), lang);
//       return;
//     }

//     if (document.documentElement.lang === lang) {
//       if (!this.initialLoad) {
//         this.showToast(this.getToastMessage(lang, "alreadySelected"), lang);
//       }
//       return;
//     }

//     document.documentElement.lang = lang;

//     // Update elements with data-translate attribute
//     document.querySelectorAll("[data-translate]").forEach((el) => {
//       const key = el.getAttribute("data-translate");
//       let translation = this.translations[lang][key];
//       if (translation) {
//         if (translation.includes("{year}")) {
//           translation = translation.replace("{year}", new Date().getFullYear());
//         }
//         el.innerHTML = translation; // Apply HTML directly for other elements
//       }
//     });

//     // Update textarea placeholder and direction
//     const textarea = document.querySelector("textarea");
//     if (textarea) {
//       textarea.placeholder = this.translations[lang].messagePlaceholder || "";
//       if (lang === "ar" || lang === "fa") {
//         textarea.style.direction = "rtl"; // Set direction to rtl for Arabic and Farsi
//       } else {
//         textarea.style.direction = "ltr"; // Reset direction for other languages
//       }
//     }

//     const button = document.querySelector("button");
//     if (button) {
//       textarea.placeholder = this.translations[lang].messagePlaceholder || "";
//       if (lang === "ar" || lang === "fa") {
//         textarea.style.direction = "rtl"; // Set direction to rtl for Arabic and Farsi
//       } else {
//         textarea.style.direction = "ltr"; // Reset direction for other languages
//       }
//     }

//     // Update input placeholder and direction
//     const input = document.querySelector("input");
//     if (input) {
//       input.placeholder = this.translations[lang].inputPlaceholder || "";
//       if (lang === "ar" || lang === "fa") {
//         input.style.direction = "rtl"; // Set direction to rtl for Arabic and Farsi
//       } else {
//         input.style.direction = "ltr"; // Reset direction for other languages
//       }
//     }

//     // Update footer text (unchanged)
//     const footerTextElement = document.querySelector(
//       "[data-translate='footerText']"
//     );
//     if (footerTextElement) {
//       let footerText = this.translations[lang].footerText;
//       if (footerText.includes("{year}")) {
//         footerText = footerText.replace("{year}", new Date().getFullYear());
//       }
//       footerTextElement.innerHTML = footerText;
//     }

//     if (this.showToastOnSwitch) {
//       this.showToast(this.getToastMessage(lang, "switchedTo"), lang);
//     }

//     this.initialLoad = false;
//   }

//   getToastMessage(lang, messageType) {
//     const template = this.toastMessages[lang]?.[messageType] || "";
//     return template.replace("{lang}", this.languageNames[lang] || lang);
//   }

//   showToast(msg, lang) {
//     if (!this.toast) return console.warn("Toast element missing.");
//     this.toast.innerText = msg;
//     this.toast.classList.add("show");
//     setTimeout(() => this.toast.classList.remove("show"), 4000);
//   }

//   bindLanguageSwitch() {
//     document.querySelectorAll(".dropdown a").forEach((link) => {
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const lang = e.target.getAttribute("data-lang");
//         this.showToastOnSwitch = true;
//         this.switchLanguage(lang);
//         window.location.hash = lang;
//       });
//     });
//   }
// }

// function updateFooterDate() {
//   document.addEventListener("DOMContentLoaded", () => {
//     const footerYear = document.querySelector(".text-gray-400");
//     const currentYear = new Date().getFullYear();
//     footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
//   });
// }

// const translator = new Translator();
// translator.loadTranslations(["en", "fr", "es", "ar", "fa"]).then(() => {
//   translator.bindLanguageSwitch();
//   const preSelectedLang = window.location.hash.slice(1) || "en";
//   translator.switchLanguage(preSelectedLang);
// });
