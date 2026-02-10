const displayNameInput = document.getElementById("displayName");
const themeSelect = document.getElementById("themeSelect");

const loadSettings = () => {
  const currentTheme = window.KK.applyTheme();
  themeSelect.value = currentTheme;
  displayNameInput.value = window.KK.getDisplayName();
};

const saveSettings = () => {
  const name = displayNameInput.value.trim() || "Kai User";
  const theme = themeSelect.value || "dark";

  window.KK.setDisplayName(name);
  window.KK.setTheme(theme);
};

const resetSettings = () => {
  window.KK.setDisplayName("Kai User");
  window.KK.setTheme("dark");
  loadSettings();
};

const initSoftkeys = () => {
  window.KK.initSoftkeys();
  window.KK.setSoftkeys({ left: "Back", center: "Save", right: "Reset" });
};

document.addEventListener("keydown", event => {
  switch (event.key) {
    case "SoftLeft":
      event.preventDefault();
      window.location.href = "/index.html";
      return;
    case "SoftCenter":
    case "Enter":
      event.preventDefault();
      saveSettings();
      return;
    case "SoftRight":
      event.preventDefault();
      resetSettings();
      return;
    default:
      return;
  }
});

window.addEventListener("load", () => {
  loadSettings();
  initSoftkeys();
});
