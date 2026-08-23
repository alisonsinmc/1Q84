let isAlternateReality = false;

// 1. World-Specific Quotes
const worldQuotes = {
    "1984": "“In this world, sincerity can sometimes save people, but it can also destroy them.”",
    "1Q84": "“I think you lost all interest in this world. You were disappointed and discouraged, and lost interest in everything. So you abandoned your physical body. You went to a world apart and you're living a different kind of life there. In a world inside you.”"
};

// 2. World-Specific Recipe Descriptions
const recipes = {
    spaghetti: {
        title: "Midnight Spaghetti",
        "1984": "Boil a generous amount of water. Drop the spaghetti in only when the water is roaring. Simple, precise, and completely grounded in the physical reality of a quiet Tokyo evening.",
        "1q84": "The water takes longer to boil, and the air around the stove feels heavy and thick. You keep glancing out the window at the second green moon while you wait for the exact minute specified on the packet."
    },
    whiskey: {
        title: "Cutty Sark on the Rocks",
        "1984": "The crisp sound of a single ice cube clinking against a heavy lowball glass in a standard, dimly lit jazz bar while rain taps on the windowpane.",
        "1q84": "Poured slowly in the shadows. The ice doesn't melt the same way here; the drink tastes sharper, carrying the eerie silence of a world where the regular rules no longer apply."
    },
    sandwich: {
        title: "Toasted Cheese Sandwich",
        "1984": "Two slices of white bread, cheddar, and a thin smear of butter. Eaten on a peaceful afternoon while staring at a blank notebook.",
        "1q84": "Toasted while a strange, silent manuscript lies open on the desk. Every bite feels like an anchor trying to keep you tied to your own memories."
    }
};

// 3. World-Specific Character Notes
const characters = {
    aomame: {
        name: "Aomame",
        "1984": "A professional fitness instructor who leads a disciplined, ordinary life on the surface—navigating the standard city streets of Tokyo with sharp focus.",
        "1q84": "An assassin and fugitive who stepped off an emergency staircase on the Shuto Expressway and slipped into a realm with two moons, the Little People, and hidden danger."
    },
    tengo: {
        name: "Tengo Kawana",
        "1984": "A mild-mannered math teacher and cram school instructor who grades papers by day and quietly dreams of writing a real novel.",
        "1q84": "A ghostwriter pulled into a metaphysical conspiracy surrounding the mysterious Air Chrysalis manuscript and a strange, deep connection across the city."
    }
};

// 4. World-Specific Marginalia Notes
const marginaliaNotes = {
    soul: {
        "1984": "\"I don't have a thing except my soul.\" — Tengo (The weight of having nothing left to lose in the ordinary world.)",
        "1q84": "\"I don't have a thing except my soul.\" — Tengo (In 1Q84, the soul is the only compass left that can navigate the alternate dimension.)"
    },
    fear: {
        "1984": "\"Are you afraid to die? Not particularly - living as myself scares me more.\"",
        "1q84": "The quiet terror of realizing your memories of the past are being rewritten by forces you cannot see."
    },
    confusion: {
        "1984": "The mundane, predictable haze of everyday urban life in late-20th-century Tokyo.",
        "1q84": "The state of being blissfully confused—where logic breaks down and surrealism becomes your only reality."
    }
};

// Toggle World Function
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
            quoteElem.textContent = worldQuotes["1Q84"];
        } else {
            body.classList.remove('world-1q84');
            body.classList.add('world-1984');
            
            tag.textContent = "06:00 PM — Tokyo";
            title.textContent = "1984";
            description.textContent = "The air is ordinary. The highway is quiet. Nothing has changed yet.";
            button.textContent = "Step Through the Exit";
            quoteElem.textContent = worldQuotes["1984"];
        }
        quoteElem.style.opacity = '1';

        loadRecipe(currentRecipeKey);
        loadCharacter(currentCharKey);
        loadNote(currentNoteKey);
    }, 300);
}

// Active Recipe Loader
let currentRecipeKey = 'spaghetti';
function loadRecipe(dishKey) {
    currentRecipeKey = dishKey;
    const dish = recipes[dishKey];
    if (!dish) return;

    const titleElem = document.getElementById('recipe-title');
    const textElem = document.getElementById('recipe-instructions');
    const boxElem = document.getElementById('recipe-display');

    boxElem.style.opacity = '0.3';
    
    setTimeout(() => {
        titleElem.textContent = dish.title;
        textElem.textContent = isAlternateReality ? dish["1q84"] : dish["1984"];
        boxElem.style.opacity = '1';
    }, 200);
}

// Active Character Loader
let currentCharKey = 'aomame';
function loadCharacter(charKey) {
    currentCharKey = charKey;
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
        descElem.textContent = isAlternateReality ? char["1q84"] : char["1984"];
        cardElem.style.opacity = '1';
    }, 200);
}

// Classical Music Database
const classicalTracks = {
    sinfonietta: {
        title: "Leoš Janáček — Sinfonietta",
        desc: "“Are you familiar with the Sinfonietta by Janáček?” The fierce, majestic fanfare of the brass instruments opens the novel. If you hear this piece and notice something slightly off with the sky, you are no longer in 1984."
    },
    goldberg: {
        title: "J.S. Bach — Goldberg Variations",
        desc: "A cornerstone of Murakami's atmospheric soundscapes. The meticulous, looping beauty of the variations provides a meditative anchor while characters navigate deeply surreal, lonely urban landscapes."
    }
};

function playClassicalTrack(trackKey) {
    const track = classicalTracks[trackKey];
    if (!track) return;

    const titleElem = document.getElementById('track-title');
    const descElem = document.getElementById('track-desc');
    const boxElem = document.getElementById('track-display');

    boxElem.style.opacity = '0.3';
    
    setTimeout(() => {
        titleElem.textContent = track.title;
        descElem.textContent = track.desc;
        boxElem.style.opacity = '1';
    }, 200);
}

// Little People Transmissions
const littlePeopleMessages = [
    "“We are the Little People. We have no weight, we cast no shadows, and we can slip through any keyhole.”",
    "“The air chrysalis is being spun. Do not look too closely at the sky, or they will notice you watching.”",
    "“Aomame feels a cold finger tracing the back of her neck. But when she turns around, there is only empty highway.”",
    "“We do not mean harm, but we require a receiver. Someone to hold the boundaries in place.”",
    "“The second moon grows larger. The geometry of the world is shifting by precisely two degrees.”"
];

let lpIndex = 0;
function triggerLittlePeople() {
    const textElem = document.getElementById('lp-text');
    const boxElem = document.getElementById('little-people-display');

    boxElem.style.opacity = '0.2';
    boxElem.style.transform = 'scale(0.99)';

    setTimeout(() => {
        lpIndex = (lpIndex + 1) % littlePeopleMessages.length;
        textElem.textContent = littlePeopleMessages[lpIndex];
        boxElem.style.opacity = '1';
        boxElem.style.transform = 'scale(1)';
    }, 250);
}

// Active Marginalia Loader
let currentNoteKey = 'soul';
function loadNote(noteKey) {
    currentNoteKey = noteKey;
    const note = marginaliaNotes[noteKey];
    if (!note) return;

    const noteElem = document.getElementById('note-text');
    const buttons = document.querySelectorAll('.marginalia-btn');

    buttons.forEach(btn => {
        if(btn.getAttribute('onclick').includes(noteKey)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    noteElem.style.opacity = '0';
    setTimeout(() => {
        noteElem.textContent = isAlternateReality ? note["1q84"] : note["1984"];
        noteElem.style.opacity = '1';
    }, 200);
}
