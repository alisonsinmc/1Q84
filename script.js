let isAlternateReality = false;
let isPlaying = false;

// Quotes matching the world state
const quotes = {
    "1984": "“In this world, sincerity can sometimes save people, but it can also destroy them.”",
    "1Q84": "“I think you lost all interest in this world. You were disappointed and discouraged, and lost interest in everything. So you abandoned your physical body. You went to a world apart and you're living a different kind of life there. In a world inside you.”"
};

function toggleWorld() {
    const body = document.body;
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const button = document.getElementById('shift-btn');
    const tag = document.querySelector('.tag');
    const quoteElem = document.getElementById('quote-box');

    isAlternateReality = !isAlternateReality;

    quoteElem.style.opacity = '0';

    setTimeout(() => {
        if (isAlternateReality) {
            body.classList.remove('world-1984');
            body.classList.add('world-1q84');

            tag.textContent = "Air Chrysalis — Sector 9";
            title.textContent = "1Q84";
            description.textContent = "The air feels heavier here. Look closely at the sky—there are two moons now. You have stepped off the regular highway.";
            button.textContent = "Return to 1984";
            quoteElem.textContent = quotes["1Q84"];
        } else {
            body.classList.remove('world-1q84');
            body.classList.add('world-1984');

            tag.textContent = "06:00 PM — Tokyo";
            title.textContent = "1984";
            description.textContent = "The air is ordinary. The highway is quiet. Nothing has changed yet.";
            button.textContent = "Step Through the Exit";
            quoteElem.textContent = quotes["1984"];
        }
        quoteElem.style.opacity = '1';
    }, 300);
}

// Food Database
const recipes = {
    spaghetti: {
        title: "Aomame's Midnight Spaghetti",
        text: "Boil a generous amount of water. Drop the spaghetti in only when the water is roaring. While it cooks, she pours herself a glass of water, listens to the quiet apartment, and waits for the exact minute specified on the packet. Perfect al dente—simple, precise, and grounding."
    },
    whiskey: {
        title: "Cutty Sark on the Rocks",
        text: "The sound of a single, large crystal-clear ice cube clinking against the side of a heavy lowball glass. Poured slowly in a dimly lit jazz bar while outside, the Tokyo rain washes down the glass panes and the second moon looms overhead."
    },
    sandwich: {
        title: "Tengo's Simple Toasted Sandwich",
        text: "Two slices of white bread, a slice of sharp cheddar, a thin smear of butter. Toasted until golden brown on a quiet afternoon while staring at a blank manuscript, accompanied by a chipped mug of black coffee."
    }
};

function loadRecipe(dishKey) {
    const dish = recipes[dishKey];
    if (!dish) return;

    const titleElem = document.getElementById('recipe-title');
    const textElem = document.getElementById('recipe-instructions');
    const boxElem = document.getElementById('recipe-display');

    boxElem.style.opacity = '0.3';

    setTimeout(() => {
        titleElem.textContent = dish.title;
        textElem.textContent = dish.text;
        boxElem.style.opacity = '1';
    }, 200);
}

// Character Database
const characters = {
    aomame: {
        name: "Aomame",
        desc: "A professional fitness instructor who leads a double life as an assassin for abused women. She steps off the emergency staircase of the Shuto Expressway into a world she realizes is no longer 1984, but 1Q84—where the air feels thicker and a second, misshapen moon watches from the sky."
    },
    tengo: {
        name: "Tengo Kawana",
        desc: "A mild-mannered math teacher and aspiring novelist who spends his days grading papers and his nights working on complex ghostwriting projects. He gets pulled into a profound conspiracy surrounding a mysterious dyslexic teenage girl named Fuka-Eri and her manuscript, Air Chrysalis."
    }
};

function loadCharacter(charKey) {
    const char = characters[charKey];
    if (!char) return;

    const nameElem = document.getElementById('char-name');
    const descElem = document.getElementById('char-desc');
    const cardElem = document.getElementById('char-display');
    const buttons = document.querySelectorAll('.char-btn');

    buttons.forEach(btn => {
        if(btn.textContent.toLowerCase().includes(charKey)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    cardElem.style.opacity = '0.3';

    setTimeout(() => {
        nameElem.textContent = char.name;
        descElem.textContent = char.desc;
        cardElem.style.opacity = '1';
    }, 200);
}

// Audio Toggle Function
function toggleAudio() {
    const audio = document.getElementById('ambient-audio');
    const status = document.getElementById('audio-status');
    const toggleBtn = document.getElementById('audio-toggle');

    isPlaying = !isPlaying;

    if (isPlaying) {
        audio.play().catch(e => console.log("Audio play blocked by browser policy:", e));
        status.textContent = "Playing (Atmosphere)";
        toggleBtn.textContent = "❚❚ Pause Atmosphere";
    } else {
        audio.pause();
        status.textContent = "Muted";
        toggleBtn.textContent = "♫ Play Atmosphere";
    }
}
