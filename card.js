document.querySelectorAll(".flip-card").forEach((card) => {
    const front = card.querySelector(".card-front");
    const back = card.querySelector(".card-back");
    const openButton = card.querySelector(".flip-open");
    const closeButton = card.querySelector(".flip-close");

    // Prepare the back without making it accessible yet.
    back.inert = true;
    back.hidden = false;

    function flipCard(showBack) {
        card.classList.toggle("is-flipped", showBack);

        const incomingFace = showBack ? back : front;
        const outgoingFace = showBack ? front : back;
        const nextButton = showBack ? closeButton : openButton;

        incomingFace.inert = false;
        nextButton.focus({ preventScroll: true });
        outgoingFace.inert = true;
    }

    openButton.addEventListener("click", () => {
        flipCard(true);

        if (typeof navigator.vibrate === "function") {
            navigator.vibrate(10);
        }
    });

    closeButton.addEventListener("click", () => {
        flipCard(false);

        if (typeof navigator.vibrate === "function") {
            navigator.vibrate(10);
        }
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && card.classList.contains("is-flipped")) {
            flipCard(false);
        }
    });

    openButton.disabled = false;
    closeButton.disabled = false;
});