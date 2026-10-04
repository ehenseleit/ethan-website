const themeButton = document.querySelector("#theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("theme");
} catch {
    // The switch still works if browser storage is unavailable.
}

if (savedTheme !== "light" && savedTheme !=="dark") {
    savedTheme = null;
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.textContent = theme === "dark"
        ? "Light mode"
        : "Dark mode";
}

applyTheme(savedTheme ?? (systemTheme.matches ? "dark" : "light"));
themeButton.hidden = false;

themeButton.addEventListener("click", () => {
    savedTheme = document.documentElement.dataset.theme === "dark"
    ? "light"
    : "dark";

    applyTheme(savedTheme)

    try {
        localStorage.setItem("theme", savedTheme);
    } catch {
        // The selected theme works, but cannot be remembered.
    }
});

systemTheme.addEventListener("change", (event) => {
    if (savedTheme === null) {
        applyTheme(event.matches ? "dark" : "light");
    }
})