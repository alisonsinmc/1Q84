let isAlternateReality = false;
let highestZ = 100;

// Bring clicked window to front
function bringToFront(win) {
    highestZ++;
    win.style.zIndex = highestZ;
}

// Window Management Engine
function openWindow(winId) {
    const win = document.getElementById(winId);
    win.classList.remove('minimized');
    bringToFront(win);
}

function closeWindow(winId) {
    document.getElementById(winId).classList.add('minimized');
}

function minimizeWindow(winId) {
    document.getElementById(winId).classList.add('minimized');
}

// Draggable Window Logic
let activeWindow = null;
let offsetX = 0, offsetY = 0;

function startDrag(e, headerElem) {
    activeWindow = headerElem.parentElement;
    bringToFront(activeWindow);
    offsetX = e.clientX - activeWindow.offsetLeft;
    offsetY = e.clientY - activeWindow.offsetTop;
    
    document.addEventListener('mousemove', dragWindow);
    document.addEventListener('mouseup', stopDrag);
}

function dragWindow(e) {
    if (!activeWindow) return;
    activeWindow.style.left = (e.clientX - offsetX) + 'px';
    activeWindow.style.top = (e.clientY - offsetY) + 'px';
}

function stopDrag() {
    activeWindow = null;
    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDrag);
}

// Artwork Switcher
function switchArt(artType, btnElem) {
    const imgElem = document.getElementById('active-artwork');
    const buttons = document.querySelectorAll('.art-switcher .char-btn');

    buttons.forEach(b => b.classList.remove('active'));
    if(btnElem) btnElem.classList.add('active');

    if (artType === 'tokyo') {
        imgElem.src = 'tokyo-moons.png';
    } else if (artType === 'park') {
        imgElem.src = 'park-moons.png';
    }
}

// Databases for World States
const worldQuotes = {
    "1984": "“In this world, sincerity can sometimes save people, but it can also destroy them.”",
    "1Q84": "“I think you lost all interest in this world. You were disappointed and discouraged, and lost interest in everything. So you abandoned your physical body. You went to a world apart and you're living a different kind of life there. In a world inside you.”"
};

const recipes = {
    spaghetti: {
        title: "Midnight Spaghetti",
        "1984": "Boil a generous amount of water. Drop the spaghetti in only when roaring. Simple, precise, and grounded.",
        "1q84": "The water takes longer to boil. You keep glancing out at the second green moon while waiting."
    },
    whiskey: {
        title: "Cutty Sark on the Rocks",
        "1984": "A single ice cube clinking against a heavy lowball glass in a standard dimly lit jazz bar.",
        "1q84": "Poured slowly in the shadows. The ice doesn't melt normally; the drink tastes sharper and surreal."
    },
    sandwich: {
        title: "Toasted Cheese Sandwich",
        "1984": "White bread, cheddar, and butter eaten on a peaceful afternoon.",
        "1q84": "Toasted while a silent, mysterious manuscript lies open on the desk."
    }
};

const characters = {
    aomame: {
        name: "Aomame",
        "1984": "A fitness instructor leading a disciplined, ordinary life on the surface of Tokyo.",
        "1q84": "An assassin who stepped off an emergency staircase into a realm with two moons and the Little People."
    },
    tengo: {
        name: "Tengo Kawana",
        "1984": "A math teacher grading papers by day, dreaming of writing a real novel.",
        "1q84": "A ghostwriter pulled into a metaphysical conspiracy surrounding the Air Chrysalis manuscript."
    }
};

const marginaliaNotes = {
    soul: {
        "1984": "\"I don't have a thing except my soul.\" — Tengo",
        "1q84": "\"I don't have a thing except my soul.\" — The only compass left to navigate 1Q84."
    },
    fear: {
        "1984": "\"Living as myself scares me more than dying.\"",
        "1q84": "The quiet terror of realizing your memories of the past are being rewritten."
    },
    confusion: {
        "1984": "The mundane, predictable haze of everyday urban life in Tokyo.",
        "1q84": "The state of being blissfully confused where logic breaks down."
    }
};

// Toggle World Function (Syncs wallpaper art, window themes, and text content)
function toggleWorld() {
    isAlternateReality = !isAlternateReality;
    const body = document.body;
    const indicator = document.getElementById('world-indicator');
    const quoteElem = document.getElementById('quote-box');
    const shiftBtn = document.getElementById('shift-btn');
    const imgElem = document.getElementById('active-artwork');
    const artButtons = document.querySelectorAll('.art-switcher .char-btn');

    quoteElem.style.opacity = '0';

    setTimeout(() => {
        if (isAlternateReality) {
            body.classList.remove('world-1984');
            body.classList.add('world-1q84');
            indicator.textContent = "Mode: 1Q84 (Two Moons / Eerie Glow)";
            shiftBtn.textContent = "Return to 1984";
            quoteElem.textContent = worldQuotes["1Q84"];
            
            // Switch gallery image to park/coffee art
            imgElem.src = 'park-moons.png';
            artButtons.forEach((b, idx) => {
                if(idx === 1) b.classList.add('active');
                else b.classList.remove('active');
            });
        } else {
            body.classList.remove('world-1q84');
            body.classList.add('world-1984');
            indicator.textContent = "Mode: 1984 (Tokyo Dusk)";
            shiftBtn.textContent = "Step Through the Exit";
            quoteElem.textContent = worldQuotes["1984"];
            
            // Switch gallery image to rooftop art
            imgElem.src = 'tokyo-moons.png';
            artButtons.forEach((b, idx) => {
                if(idx === 0) b.classList.add('active');
                else b.classList.remove('active');
            });
        }
        quoteElem.style.opacity = '1';
        loadRecipe(currentRecipeKey);
        loadCharacter(currentCharKey);
        loadNote(currentNoteKey);
    }, 300);
}

let currentRecipeKey = 'spaghetti';
function loadRecipe(dishKey) {
    currentRecipeKey = dishKey;
    const dish = recipes[dishKey];
    document.getElementById('recipe-title').textContent = dish.title;
    document.getElementById('recipe-instructions').textContent = isAlternateReality ? dish["1q84"] : dish["1984"];
}

let currentCharKey = 'aomame';
function loadCharacter(charKey) {
    currentCharKey = charKey;
    const char = characters[charKey];
    document.getElementById('char-name').textContent = char.name;
    document.getElementById('char-desc').textContent = isAlternateReality ? char["1q84"] : char["1984"];
}

const classicalTracks = {
    sinfonietta: { title: "Janáček — Sinfonietta", desc: "The majestic brass fanfare that opens the novel, signaling the shift into 1Q84." },
    goldberg: { title: "Bach — Goldberg Variations", desc: "The looping, meditative keyboard variations grounding lonely urban nights." }
};

function playClassicalTrack(trackKey) {
    const track = classicalTracks[trackKey];
    document.getElementById('track-title').textContent = track.title;
    document.getElementById('track-desc').textContent = track.desc;
}

const littlePeopleMessages = [
    "“We are the Little People. We have no weight and cast no shadows.”",
    "“The air chrysalis is being spun. Do not look too closely at the sky.”",
    "“A cold finger traces the back of your neck. Only empty highway remains.”",
    "“We require a receiver. Someone to hold the boundaries in place.”"
];
let lpIndex = 0;
function triggerLittlePeople() {
    lpIndex = (lpIndex + 1) % littlePeopleMessages.length;
    document.getElementById('lp-text').textContent = littlePeopleMessages[lpIndex];
}

let currentNoteKey = 'soul';
function loadNote(noteKey) {
    currentNoteKey = noteKey;
    const note = marginaliaNotes[noteKey];
    document.getElementById('note-text').textContent = isAlternateReality ? note["1q84"] : note["1984"];
}
