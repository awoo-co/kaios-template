(function () {
  const hasNativeSoftkeys =
    (navigator.softkeyManager && typeof navigator.softkeyManager.setKeys === "function") ||
    (navigator.mozSettings && typeof navigator.mozSettings.createLock === "function");

  const storage = {
    get(key, fallback) {
      const value = window.localStorage.getItem(key);
      return value === null ? fallback : value;
    },
    set(key, value) {
      window.localStorage.setItem(key, value);
    }
  };

  const setNativeSoftkeys = ({ left, center, right }) => {
    if (navigator.softkeyManager && typeof navigator.softkeyManager.setKeys === "function") {
      navigator.softkeyManager.setKeys({
        left: left || "",
        center: center || "",
        right: right || ""
      });
      return;
    }

    if (navigator.mozSettings && typeof navigator.mozSettings.createLock === "function") {
      try {
        navigator.mozSettings.createLock().set({
          "softkey.left": left || "",
          "softkey.center": center || "",
          "softkey.right": right || ""
        });
      } catch (error) {
        return;
      }
    }
  };

  const setSoftkeys = ({ left, center, right }) => {
    const leftLabel = document.getElementById("left");
    const centerLabel = document.getElementById("center");
    const rightLabel = document.getElementById("right");

    if (leftLabel) leftLabel.innerText = left || "";
    if (centerLabel) centerLabel.innerText = center || "";
    if (rightLabel) rightLabel.innerText = right || "";
    setNativeSoftkeys({ left, center, right });
  };

  const initSoftkeys = () => {
    if (hasNativeSoftkeys) {
      document.documentElement.classList.add("native-softkeys");
    }
  };

  const applyTheme = () => {
    const theme = storage.get("catchat.theme", "dark");
    document.documentElement.setAttribute("data-theme", theme);
    return theme;
  };

  const setTheme = theme => {
    storage.set("catchat.theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const getDisplayName = () => storage.get("catchat.displayName", "Kai User");
  const setDisplayName = name => storage.set("catchat.displayName", name);

  window.KK = {
    applyTheme,
    setTheme,
    getDisplayName,
    setDisplayName,
    setSoftkeys,
    initSoftkeys
  };
})();
