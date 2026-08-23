let isAlternateReality = false;
let highestZ = 100;

function openBook() {
    const bookCover = document.getElementById('book-intro');
    bookCover.classList.add('opened');
}

function bringToFront(win) {
    highestZ++;
    win.style.zIndex = highestZ;
}

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

// Recipe Book Flip Logic with Glowing Highlights
const recipeData = {
    spaghetti: {
        title: "Aomame's Midnight Spaghetti",
        ascii: "🍝",
        "1984": "Boil a generous amount of water. Drop the spaghetti in only when roaring. Simple, precise, and grounded in reality.",
        "1q84": "The water takes longer to boil. You keep glancing out at the second green moon while waiting for the exact minute."
    },
    whiskey: {
        title: "Cutty Sark on the Rocks",
        ascii: "🥃",
        "1984": "A single crystal-clear ice cube clinking against a heavy lowball glass in a standard dimly lit jazz bar.",
        "1q84": "Poured slowly in the shadows. The ice doesn't melt normally; the drink tastes sharper, carrying an eerie silence."
    },
    sandwich: {
        title: "Tengo's Toasted Sandwich",
        ascii: "🥪",
        "1984": "Two slices of white bread, cheddar, and butter toasted until golden while staring at a blank notebook.",
        "1q84": "Toasted while a silent, mysterious manuscript lies open on the desk, acting as an anchor to your memories."
    }
};

function openRecipeBook(dishKey) {
    const dish = recipeData[dishKey];
    if(!dish) return;

    document.getElementById('recipe-select-view').classList.add('hidden');
    document.getElementById('recipe-book-view').classList.remove('hidden');

    document.getElementById('recipe-book-art').textContent = dish.ascii;
    document.getElementById('recipe-book-title').textContent = dish.title;
    
    const rawText = isAlternateReality ? dish["1q84"] : dish["1984"];
    const formattedText = isAlternateReality 
        ? rawText.replace("second green moon", "<span class='altered-keyword'>second green moon</span>").replace("silence", "<span class='altered-keyword'>silence</span>")
        : rawText;
    
    document.getElementById('recipe-book-desc').innerHTML = formattedText;
}

function closeRecipeBook() {
    document.getElementById('recipe-book-view').classList.add('hidden');
    document.getElementById('recipe-select-view').classList.remove('hidden');
}

const worldQuotes = {
    "1984": "“In this world, sincerity can sometimes save people, but it can also destroy them.”",
    "1Q84": "“I think you lost all interest in this world. You were disappointed and discouraged, and lost interest in everything. So you abandoned your physical body. You went to a world apart and you're living a different kind of life there. In a world inside you.”"
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

// Toast Notification
function showShiftToast() {
    let toast = document.getElementById('shift-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'shift-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = isAlternateReality ? "⚡ Shifted to 1Q84: Two moons govern this realm." : "⚡ Returned to 1984: The ordinary world.";
    toast.classList.add('show-toast');
    setTimeout(() => { toast.classList.remove('show-toast'); }, 2500);
}

function toggleWorld() {
    isAlternateReality = !isAlternateReality;
    const body = document.body;
    const indicator = document.getElementById('world-indicator');
    const quoteElem = document.getElementById('quote-box');
    const shiftBtn = document.getElementById('shift-btn');
    const imgElem = document.getElementById('active-artwork');
    const artButtons = document.querySelectorAll('.art-switcher .char-btn');
    
    const moonIcon = document.getElementById('widget-moon-icon');
    const widgetStatus = document.getElementById('widget-status');
    const widgetHumidity = document.getElementById('widget-humidity');

    quoteElem.style.opacity = '0';
    showShiftToast();

    // Update active reality status tags across open window headers
    const statusTags = document.querySelectorAll('.world-status-tag');
    statusTags.forEach(tag => {
        tag.textContent = isAlternateReality ? "Active Reality: 1Q84" : "Active Reality: 1984";
    });

    setTimeout(() => {
        if (isAlternateReality) {
            body.classList.remove('world-1984');
            body.classList.add('world-1q84');
            indicator.textContent = "Mode: 1Q84 (Two Moons / Eerie Glow)";
            shiftBtn.textContent = "Return to 1984";
            quoteElem.textContent = worldQuotes["1Q84"];
            
            imgElem.src = 'park-moons.png';
            artButtons.forEach((b, idx) => {
                if(idx === 1) b.classList.add('active');
                else b.classList.remove('active');
            });

            moonIcon.textContent = "🌕🟢";
            widgetStatus.innerHTML = "<strong>Sky Condition:</strong> Dual <span class='altered-keyword'>moons</span> detected.";
            widgetHumidity.innerHTML = "<strong>Air Density:</strong> Heavy / Unstable (1.4x)";
        } else {
            body.classList.remove('world-1q84');
            body.classList.add('world-1984');
            indicator.textContent = "Mode: 1984 (Tokyo Dusk)";
            shiftBtn.textContent = "Step Through the Exit";
            quoteElem.textContent = worldQuotes["1984"];
            
            imgElem.src = 'tokyo-moons.png';
            artButtons.forEach((b, idx) => {
                if(idx === 0) b.classList.add('active');
                else b.classList.remove('active');
            });

            moonIcon.textContent = "🌕";
            widgetStatus.innerHTML = "<strong>Sky Condition:</strong> Ordinary dusk over Tokyo.";
            widgetHumidity.innerHTML = "<strong>Air Density:</strong> Normal (1.0x)";
        }
        quoteElem.style.opacity = '1';
        loadCharacter(currentCharKey);
        loadNote(currentNoteKey);
    }, 300);
}

let currentCharKey = 'aomame';
function loadCharacter(charKey) {
    currentCharKey = charKey;
    const char = characters[charKey];
    document.getElementById('char-name').textContent = char.name;
    document.getElementById('char-desc').textContent = isAlternateReality ? char["1q84"] : char["1984"];
}

const classicalTracks = {
    sinfonietta: { title: "Leoš Janáček — Sinfonietta", desc: "The majestic brass fanfare that opens the novel, signaling the shift into 1Q84." },
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

// Note Editor Save
function saveNotePad() {
    const textVal = document.getElementById('user-notepad').value;
    localStorage.setItem('1q84_scratchpad', textVal);
    const statusElem = document.getElementById('save-status');
    statusElem.style.opacity = '1';
    setTimeout(() => { statusElem.style.opacity = '0'; }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedNote = localStorage.getItem('1q84_scratchpad');
    if(savedNote) { document.getElementById('user-notepad').value = savedNote; }
});

// Chrysalis Spin
let spinSpeed = 6;
function pulseChrysalis() {
    const emoji = document.getElementById('chrysalis-emoji');
    const caption = document.getElementById('chrysalis-status');
    spinSpeed = Math.max(0.5, spinSpeed - 1);
    emoji.style.animationDuration = spinSpeed + 's';
    caption.textContent = `Spinning frequency heightened (${(6/spinSpeed).toFixed(1)}x)!`;
}

// Cipher
function checkCipher(e) {
    const inputVal = e.target.value.toLowerCase().trim();
    const feedback = document.getElementById('cipher-feedback');
    if (inputVal === "the river is moving") {
        feedback.textContent = "SUCCESS: Transmission accepted by the Little People.";
        feedback.style.color = "var(--accent-color-ui)";
    } else {
        feedback.textContent = "Hint: Atbash Cipher (A becomes Z)";
        feedback.style.color = "";
    }
}

// Glitch & CRT
function triggerGlitch() {
    const desktop = document.querySelector('.desktop');
    desktop.classList.add('glitch-active');
    setTimeout(() => { desktop.classList.remove('glitch-active'); }, 600);
}

function toggleScanlines() {
    document.body.classList.toggle('scanlines');
}

// Phone
let phoneBuffer = "";
function pressPhone(num) {
    if(phoneBuffer.length < 6) {
        phoneBuffer += num;
        document.getElementById('phone-screen').textContent = phoneBuffer;
    }
}

function callPhone() {
    const status = document.getElementById('phone-status');
    if(phoneBuffer === "1984" || phoneBuffer === "198499") {
        status.textContent = "Connected... 'The receiver is listening from the other side.'";
    } else {
        status.textContent = "Busy signal. The connection cannot be completed.";
    }
    phoneBuffer = "";
    setTimeout(() => { document.getElementById('phone-screen').textContent = "---"; }, 2000);
}

// Cat
const catPhrases = [
    "Meow... Is the second moon looking at you too?",
    "Purr... The air feels thicker tonight.",
    "Aomame walked by this alley earlier.",
    "Tengo is still typing upstairs. Listen closely.",
    "Cats don't believe in absolute realities.",
    "Zzz... Just waiting for the world to shift back."
];

let catIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    const catElem = document.getElementById('desktop-cat');
    const bubbleElem = document.getElementById('cat-bubble');

    if (catElem) {
        catElem.addEventListener('click', () => {
            catIndex = (catIndex + 1) % catPhrases.length;
            bubbleElem.textContent = catPhrases[catIndex];
            bubbleElem.style.opacity = '1';
            
            catElem.style.transform = 'scale(1.15)';
            setTimeout(() => { catElem.style.transform = 'scale(1)'; }, 200);
        });
    }
});
