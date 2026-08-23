// 3-Strip Photobooth Logic with 5-Second Intervals
function startPhotobooth() {
    const timerDisplay = document.getElementById('booth-timer');
    const startBtn = document.getElementById('start-booth-btn');
    const shareBtn = document.getElementById('share-ig-btn');
    
    startBtn.classList.add('hidden');
    shareBtn.classList.add('hidden');
    
    // Determine active background image based on current reality
    const activeBg = isAlternateReality ? 'url(park-moons.png)' : 'url(tokyo-moons.png)';
    
    let currentStep = 1;
    
    function runCountdown(frameNum, callback) {
        let timeLeft = 5;
        timerDisplay.textContent = `Pose for Frame ${frameNum}: ${timeLeft}s`;
        
        let interval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerDisplay.textContent = `Pose for Frame ${frameNum}: ${timeLeft}s`;
            } else {
                clearInterval(interval);
                // Snap picture
                const frameElem = document.getElementById(`frame-${frameNum}`);
                frameElem.style.backgroundImage = activeBg;
                frameElem.innerHTML = ''; // Remove placeholder text
                
                if (callback) callback();
            }
        }, 1000);
    }
    
    // Frame 1
    runCountdown(1, () => {
        // Pause 1 sec, then Frame 2
        setTimeout(() => {
            runCountdown(2, () => {
                // Pause 1 sec, then Frame 3
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
