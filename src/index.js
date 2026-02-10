const roomItems = Array.from(document.querySelectorAll(".room-item"));
let activeIndex = 0;

const focusItem = index => {
    if (!roomItems.length) return;
    activeIndex = Math.max(0, Math.min(index, roomItems.length - 1));
    roomItems.forEach((item, idx) => {
        const isActive = idx === activeIndex;
        item.classList.toggle("is-selected", isActive);
        item.setAttribute("aria-selected", isActive ? "true" : "false");
        item.tabIndex = isActive ? 0 : -1;
    });
    roomItems[activeIndex].focus();
};

const openActiveRoom = () => {
    const item = roomItems[activeIndex];
    if (!item) return;
    const roomUrl = item.getAttribute("data-room");
    if (roomUrl) {
        window.location.href = roomUrl;
    }
};

const openSettings = () => {
    window.location.href = "/settings.html";
};

const initSoftkeys = () => {
    window.KK.initSoftkeys();
    window.KK.setSoftkeys({ left: "Settings", center: "Open", right: "Reload" });
};

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault();
            focusItem(activeIndex - 1);
            return;
        case "ArrowDown":
            event.preventDefault();
            focusItem(activeIndex + 1);
            return;
        case "Enter":
        case "SoftCenter":
            event.preventDefault();
            openActiveRoom();
            return;
        case "SoftLeft":
            event.preventDefault();
            openSettings();
            return;
        case "SoftRight":
            event.preventDefault();
            window.location.reload();
            return;
        default:
            return;
    }
});

roomItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        focusItem(index);
        openActiveRoom();
    });
});

window.addEventListener("load", () => {
    window.KK.applyTheme();
    initSoftkeys();
    focusItem(0);
});