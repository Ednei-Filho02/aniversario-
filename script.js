
const bottom = document.getElementById("bottom");
const middle = document.getElementById("middle");
const topLayer = document.getElementById("top");
const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const title = document.getElementById("title");
const message = document.getElementById("message");
const replay = document.getElementById("replay");

let timers = [];

function later(callback, delay) {
    const id = setTimeout(callback, delay);
    timers.push(id);
}

function confetti() {
    const colors = [
    "#ff80b5", "#ffe47a", "#c7a1ff",
    "#8cf5df", "#ffffff", "#ff9a68"
    ];

    for (let i = 0; i < 900; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.textContent = Math.random() > .5 ? "●" : "✦";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.color =
        colors[Math.floor(Math.random() * colors.length)];
    piece.style.fontSize = (8 + Math.random() * 12) + "px";
    piece.style.setProperty(
        "--drift",
        (Math.random() * 240 - 120) + "px"
    );
    piece.style.animationDuration = (2.5 + Math.random() * 3) + "s";
    document.body.appendChild(piece);

    piece.addEventListener("animationend", () => piece.remove());
    }
}

function startAnimation() {
    timers.forEach(clearTimeout);
    timers = [];

    document.querySelectorAll(".confetti").forEach(el => el.remove());

    [bottom, middle, topLayer].forEach(layer => {
    layer.classList.remove("show");
    });

    candle.classList.remove("show");
    flame.classList.remove("lit");
    title.classList.remove("show-message");
    message.classList.remove("show-message");

    void bottom.offsetWidth;

    later(() => bottom.classList.add("show"), 400);
    later(() => middle.classList.add("show"), 1450);
    later(() => topLayer.classList.add("show"), 2500);
    later(() => candle.classList.add("show"), 3400);
    later(() => flame.classList.add("lit"), 4050);

    later(() => {
    title.classList.add("show-message");
    message.classList.add("show-message");
    confetti();
    }, 4750);
}

const start = document.getElementById("start");
const musica = document.getElementById("musica");

musica.volume = 0.2;

// Começa a surpresa ao clicar no botão.
start.addEventListener("click", async () => {
    document.body.classList.add("started");

    startAnimation();

    try {
        await musica.play();
    } catch (erro) {
        console.error("Não foi possível tocar a música:", erro);
    }
});

// Permite assistir à animação novamente.
replay.addEventListener("click", startAnimation);