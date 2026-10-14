const keySequence = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];

let recentKeys = [];

let messageTimer;

function activateSecret() {
    const message = document.querySelector("#extra-message");

    message.textContent = "Secret unlocked!";
    playEffect();

    clearTimeout(messageTimer);

    messageTimer = setTimeout(() => {
        message.textContent = "";
    }, 3000);
}
document.addEventListener("keydown", (event) => {
    const typing = event.target.closest("input, textarea, select")
    || event.target.isContentEditable;

    if (typing || event.ctrlKey || event.altKey || event.metaKey) {
        recentKeys = [];
        return;
    }


if (event.repeat) return;

const key=event.key.length === 1
    ? event.key.toLowerCase()
    : event.key;

    recentKeys.push(key);
    recentKeys = recentKeys.slice(-keySequence.length);

    if (recentKeys.join(",") === keySequence.join(",")) {
        activateSecret();
        recentKeys = [];
    }

});

function playEffect() {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const colors = ["#c49a45", "#73a580", "#a65368", "#729fbd"];

    for (let i = 0; i < 60; i++) {
    const piece = document.createElement("span");
    piece.className = "extra-piece";
    piece.setAttribute("aria-hidden", "true");

    piece.style.left = (5 + Math.random() * 90) + "vw";
    piece.style.setProperty(
        "--drift",
        (Math.random() * 200 - 100) + "px"
    );

    const duration = 2200 + Math.random() * 1600;
    const delay = Math.random() * 600;
    const spin = Math.random() * 1440 - 720;

    const colorIndex = Math.floor(Math.random() * colors.length);

    piece.style.backgroundColor = colors[colorIndex];
    piece.style.animationDuration = duration + "ms";
    piece.style.animationDelay = delay + "ms";
    piece.style.setProperty("--spin", spin + "deg");

    document.body.appendChild(piece);

    setTimeout(() => {
        piece.remove();
    }, duration + delay + 100);
}
}

//AI helped a lot with this. I am NOT good at Javascript yet. I did go through this line by line.