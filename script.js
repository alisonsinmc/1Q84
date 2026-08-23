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

// Recipe Book Flip with Custom Drawings
const recipeData = {
    spaghetti: {
        title: "Midnight Spaghetti",
        image: "spaghetti.png",
        "1984": "Water boils in roaring silence. Precise, grounded reality.",
        "1q84": "The water takes longer. You glance out at the <span class='altered-keyword'>second green moon</span>."
    },
    whiskey: {
        title: "Cutty Sark",
        image: "whiskey.png",
        "1984": "A single crystal cube clinking in a dimly lit jazz bar.",
        "1q84": "Poured in shadows. The ice refuses to melt in this <span class='altered-keyword'>silence</span>."
    },
    sandwich: {
        title: "Toasted Sandwich",
        image: "sandwich.png",
        "1984": "Warm cheese and butter eaten on a peaceful afternoon.",
        "1q84": "Toasted while a mysterious manuscript lies open."
    }
};

function openRecipeBook(dishKey) {
    const dish = recipeData[dishKey];
    if(!dish) return;

    document.getElementById('recipe-select-view').classList.add('hidden');
    document.getElementById('recipe-book-view').classList.remove('hidden');

    document.getElementById('recipe-book-img').src = dish.image;
    document.getElementById('recipe-book-title').textContent = dish.title;
    document.getElementById('recipe-book-desc').innerHTML = isAlternateReality ? dish["1q84"] : dish["1984"];
}

function closeRecipeBook() {
    document.getElementById('recipe-book-view').classList.add('hidden');
    document.getElementById('recipe-select-view').classList.remove('hidden');
}

const worldQuotes = {
    "1984": "“In this world, sincerity can sometimes save people.”",
    "1Q84": "“You went to a world apart and you're living a different kind of life there.”"
};

// Streamlined Bullet-Point Dossiers
const characters = {
    aomame: {
        name: "Aomame",
        "1984": "• Role: Fitness Instructor / Assassin<br>• Status: Navigating ordinary Tokyo streets.",
        "1q84": "• Role: <span class='altered-keyword'>Assassin</span><br>• Status: Trapped under the <span class='altered-keyword'>dual moons</span>."
    },
    tengo: {
        name: "Tengo Kawana",
        "1984": "• Role: Math Teacher / Writer<br>• Status: Grading papers by day.",
        "1q84": "• Role: Ghostwriter<br>• Status: Rewriting the <span class='altered-keyword'>Air Chrysalis</span>."
    }
};

let currentCharKey = 'aomame';
function loadCharacter(charKey) {
    currentCharKey = charKey;
    const char = characters[charKey];
    document.getElementById('char-name').textContent = char.name;
    document.getElementById('char-desc').innerHTML = isAlternateReality ? char["1q84"] : char["1984"];
    
    const imgElem = document.getElementById('char-image');
    if (charKey === 'aomame') {
        imgElem.src = 'aomame.png';
    } else if (charKey === 'tengo') {
        imgElem.src = 'tengo.png';
    }
}

// Tap-to-Reveal Marginalia Quotes
const marginaliaNotes = {
    soul: {
        "1984": "\"I don't have a thing except my soul.\" — Tengo",
        "1q84": "\"I don't have a thing except my soul.\" — The only compass left."
    },
    fear: {
        "1984": "\"Living as myself scares me more than dying.\"",
        "1q84": "The quiet terror of altered memories."
    },
    confusion: {
        "1984": "The predictable haze of urban Tokyo.",
        "1q84": "Where logic breaks down completely."
    }
};

let currentNoteKey = 'soul';
function loadNote(noteKey) {
    currentNoteKey = noteKey;
    const note = marginaliaNotes[noteKey];
    document.getElementById('note-text').textContent = isAlternateReality ? note["1q84"] : note["1984"];
}

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

    const statusTags = document.querySelectorAll('.world-status-tag');
    statusTags.forEach(tag => {
        tag.textContent = isAlternateReality ? "Active Reality: 1Q84" : "Active Reality: 1984";
    });

    setTimeout(() => {
        if (isAlternateReality) {
            body.classList.remove('world-1984');
            body.classList.add('world-1q84');
            indicator.textContent = "Mode: 1Q84 (Two Moons)";
            shiftBtn.textContent = "Return to 1984";
            quoteElem.textContent = worldQuotes["1Q84"];
            
            imgElem.src = 'park-moons.png';
            artButtons.forEach((b, idx) => {
                if(idx === 1) b.classList.add('active');
                else b.classList.remove('active');
            });

            moonIcon.textContent = "🌕🟢";
            widgetStatus.innerHTML = "<strong>Sky:</strong> Dual <span class='altered-keyword'>moons</span>.";
            widgetHumidity.innerHTML = "<strong>Density:</strong> Unstable (1.4x)";
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
            widgetStatus.innerHTML = "<strong>Sky:</strong> Ordinary dusk.";
            widgetHumidity.innerHTML = "<strong>Density:</strong> Normal (1.0x)";
        }
        quoteElem.style.opacity = '1';
        loadCharacter(currentCharKey);
        loadNote(currentNoteKey);
    }, 300);
}

const classicalTracks = {
    sinfonietta: { title: "Leoš Janáček — Sinfonietta", desc: "The majestic brass fanfare opening the novel." },
    goldberg: { title: "Bach — Goldberg Variations", desc: "Meditative keyboard variations for lonely nights." }
};

function playClassicalTrack(trackKey) {
    const track = classicalTracks[trackKey];
    document.getElementById('track-title').textContent = track.title;
    document.getElementById('track-desc').textContent = track.desc;
}

const littlePeopleMessages = [
    "“We have no weight and cast no shadows.”",
    "“The air chrysalis is being spun.”",
    "“Only empty highway remains.”"
];
let lpIndex = 0;
function triggerLittlePeople() {
    lpIndex = (lpIndex + 1) % littlePeopleMessages.length;
    document.getElementById('lp-text').textContent = littlePeopleMessages[lpIndex];
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
    
    // Initialize Webcam for Photobooth
    initWebcam();
});

// Initialize Webcam Stream
function initWebcam() {
    const videoElem = document.getElementById('booth-webcam');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoElem.srcObject = stream;
            })
            .catch(err => {
                console.log("Webcam access denied or unavailable:", err);
            });
    }
}

// Chrysalis Spin
let spinSpeed = 6;
function pulseChrysalis() {
    const emoji = document.getElementById('chrysalis-emoji');
    const caption = document.getElementById('chrysalis-status');
    spinSpeed = Math.max(0.5, spinSpeed - 1);
    emoji.style.animationDuration = spinSpeed + 's';
    caption.textContent = `Frequency: ${(6/spinSpeed).toFixed(1)}x`;
}

// Cipher
function checkCipher(e) {
    const inputVal = e.target.value.toLowerCase().trim();
    const feedback = document.getElementById('cipher-feedback');
    if (inputVal === "the river is moving") {
        feedback.textContent = "SUCCESS: Accepted by Little People.";
        feedback.style.color = "var(--accent-color-ui)";
    } else {
        feedback.textContent = "Hint: Atbash Cipher (A=Z)";
        feedback.style.color = "";
    }
}

// Little People Radar Scan with Image Reveal
function scanRadar() {
    const blip = document.getElementById('radar-blip');
    const status = document.getElementById('radar-status');
    const imgContainer = document.getElementById('lp-image-container');
    const radarScreen = document.getElementById('radar-screen-elem');
    
    status.textContent = "Scanning frequencies across the expressway...";
    blip.classList.remove('detected');
    imgContainer.classList.add('hidden');
    radarScreen.style.display = "block";
    
    setTimeout(() => {
        if (isAlternateReality) {
            blip.classList.add('detected');
            status.textContent = "WARNING: Weightless entities materializing...";
            
            setTimeout(() => {
                radarScreen.style.display = "none";
                imgContainer.classList.remove('hidden');
                status.textContent = "ENTITY CAPTURED: 'They have no weight and cast no shadows.'";
            }, 1000);

        } else {
            blip.classList.remove('detected');
            status.textContent = "Status: Quiet. Normal air density.";
        }
    }, 1200);
}

// 3-Strip Live Webcam Photobooth Logic with 5-Sec Intervals & Selected Background
function startPhotobooth() {
    const timerDisplay = document.getElementById('booth-timer');
    const startBtn = document.getElementById('start-booth-btn');
    const shareBtn = document.getElementById('share-ig-btn');
    const videoElem = document.getElementById('booth-webcam');
    const bgSelect = document.getElementById('booth-bg-select');
    const stripElem = document.getElementById('photobooth-strip');
    
    // Set strip background based on user selection
    const selectedBg = bgSelect.value;
    stripElem.style.backgroundImage = `url('${selectedBg}')`;
    
    startBtn.classList.add('hidden');
    shareBtn.classList.add('hidden');
    
    function captureFrameToCanvas(frameNum) {
        const frameElem = document.getElementById(`frame-${frameNum}`);
        frameElem.innerHTML = ''; // Clear text
        
        // Create snapshot canvas from live video
        const canvas = document.createElement('canvas');
        canvas.width = videoElem.videoWidth || 320;
        canvas.height = videoElem.videoHeight || 240;
        const ctx = canvas.getContext('2d');
        
        // Flip horizontally to match mirror preview
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/png');
        frameElem.style.backgroundImage = `url(${dataUrl})`;
    }
    
    function runCountdown(frameNum, callback) {
        let timeLeft = 5;
        timerDisplay.textContent = `Pose for Frame ${frameNum}: ${timeLeft}s`;
        
        let interval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerDisplay.textContent = `Pose for Frame ${frameNum}: ${timeLeft}s`;
            } else {
                clearInterval(interval);
                captureFrameToCanvas(frameNum);
                if (callback) callback();
            }
        }, 1000);
    }
    
    runCountdown(1, () => {
        setTimeout(() => {
            runCountdown(2, () => {
                setTimeout(() => {
                    runCountdown(3, () => {
                        timerDisplay.textContent = "Strip Complete!";
                        startBtn.textContent = "Retake Photos";
                        startBtn.classList.remove('hidden');
                        shareBtn.classList.remove('hidden');
                    });
                }, 1000);
            });
        }, 1000);
    });
}

// Instagram Stories Share Simulation / Web Share API
function shareToIGStory() {
    if (navigator.share) {
        navigator.share({
            title: '1Q84 Photobooth Strip',
            text: 'Stepped into the dual-moon reality via @c7lison website 🌙✨',
            url: window.location.href,
        }).catch(() => {});
    } else {
        alert("Photobooth strip saved! Open Instagram and share your screenshot to your Story tag @c7lison 🤍");
    }
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
        status.textContent = "Connected... 'Receiver is listening.'";
    } else {
        status.textContent = "Busy signal.";
    }
    phoneBuffer = "";
    setTimeout(() => { document.getElementById('phone-screen').textContent = "---"; }, 2000);
}

// Cat
const catPhrases = [
    "Meow... Watching the second moon.",
    "Purr... The air feels thick.",
    "Aomame walked by earlier.",
    "Tengo is typing upstairs."
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
