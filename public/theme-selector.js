const currentThemeIcons = document.querySelectorAll(
  "[data-current-theme-icon]",
);
const systemIconTemplate = document.querySelector("#theme-system-icon");
const lightIconTemplate = document.querySelector("#theme-light-icon");
const darkIconTemplate = document.querySelector("#theme-dark-icon");
const themeSelect = document.getElementById('theme__select');

const updateIcon = () => {
  const theme = localStorage.getItem("theme");
  if (
    !theme ||
    !currentThemeIcons.length ||
    !systemIconTemplate ||
    !lightIconTemplate ||
    !darkIconTemplate
  )
    return;
  currentThemeIcons.forEach((currentThemeIcon) => {
    if (theme === "system") {
      currentThemeIcon.innerHTML = "";
      currentThemeIcon.appendChild(systemIconTemplate.content.cloneNode(true));
    } else if (theme === "light") {
      currentThemeIcon.innerHTML = "";
      currentThemeIcon.appendChild(lightIconTemplate.content.cloneNode(true));
    } else if (theme === "dark") {
      currentThemeIcon.innerHTML = "";
      currentThemeIcon.appendChild(darkIconTemplate.content.cloneNode(true));
    }
    themeSelect.value = theme;
  });
};

const getColorPreference = () => {
  let preference = localStorage.getItem("theme");
  if (preference === "system") {
    return preference;
  }

  if (!preference) {
    preference = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return preference;
};

const setPreference = (themeName) => {
  localStorage.setItem("theme", themeName);
  if (!document.firstElementChild) return;
  if (themeName === "system") {
    themeName = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.firstElementChild.classList.toggle("dark", themeName === "dark");
  document.firstElementChild.classList.toggle("light", themeName !== "dark");
  document.firstElementChild.setAttribute(
    "style",
    themeName === "dark" ? "color-scheme: dark" : "color-scheme: light",
  );
  updateIcon();
  const properties = {
    stylesheetUrls: ["/inkeep-styles.css"],
    chatButtonType: "ICON_TEXT",
    isPositionFixed: false,
    baseSettings: {
      apiKey: "4f4da4a5733032ef8ff23e3b7906954877fd0ee54d58d1e0",
      integrationId: "clpbm8p9y002ns601vbbswj5i",
      organizationId: "clog94xy50001s601yapu7swn",
      organizationDisplayName: "Drizzle ORM",
      theme: {
        colorMode: {
          forcedColorMode: "dark",
        },
      },
    },
    modalSettings: {
      areOpenHotKeysDisabled: true,
    },
    aiChatSettings: {
      botAvatarSrcUrl: "/svg/drizzle-dark.svg",
      botAvatarDarkSrcUrl: "/svg/drizzle.svg",
    },
  };
  if (window.inkeepWidget) {
    window.inkeepWidget.render({
      ...properties,
      baseSettings: {
        ...properties.baseSettings,
        theme: {
          ...properties.baseSettings.theme,
          colorMode: {
            forcedColorMode: themeName,
          },
        },
      },
    });
  }
};


const theme = getColorPreference();
setPreference(theme);

const dropdownItems = document.getElementById("theme-dropdown-items");
const themeItems = document.querySelectorAll("[data-theme-value]");

const themeCurrentBtn = document.querySelector(".theme__current-btn");
if (themeCurrentBtn) {
  themeCurrentBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdownItems) {
      dropdownItems.classList.toggle("d-flex");
    }
  });
}

window.addEventListener("click", (e) => {
  const clickedElement = e.target;
  if (!clickedElement.matches(".dialect-selector__button")) {
    if (dropdownItems && dropdownItems.classList.contains("d-flex")) {
      dropdownItems.classList.remove("d-flex");
    }
  }
});

if (themeItems) {
  themeItems.forEach((element) => {
    element.addEventListener("click", () => {
      const theme = element.dataset.themeValue;
      if (!theme) return;
      setPreference(theme);
      dropdownItems.classList.remove("d-flex");
    });
  });
}

if (themeSelect) {
  themeSelect.addEventListener("change", (e) => {
    const theme = e.target.value;
    if (!theme) return;
    setPreference(theme);
  });
}
