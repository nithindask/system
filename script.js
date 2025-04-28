// Workout data for all days
const workoutData = {
    "Sunday": {
        title: "REST DAY",
        description: "The perfect day to relax and recover. Your body needs rest to grow stronger.",
        exercises: []
    },
    "Monday": {
        title: "FULL BODY WORKOUT",
        exercises: [
            "45s Plank",
            "10 Push-ups",
            "15 Lunges",
            "15 Sit-ups",
            "20 Jumping Jacks"
        ]
    },
    "Tuesday": {
        title: "CORE FOCUS",
        exercises: [
            "20 Squats",
            "15 Jumping Jacks",
            "30s Plank",
            "20 Crunches",
            "10 Push-ups"
        ]
    },
    "Wednesday": {
        title: "LOWER BODY DAY",
        exercises: [
            "15 Russian Twists",
            "20s Wall Sit",
            "15 Sit-ups",
            "5 Jumping Jacks",
            "5 Lunges"
        ]
    },
    "Thursday": {
        title: "UPPER BODY DAY",
        exercises: [
            "45s Plank",
            "10 Push-ups",
            "15 Lunges",
            "15 Sit-ups",
            "20 Jumping Jacks"
        ]
    },
    "Friday": {
        title: "FULL BODY BLAST",
        exercises: [
            "20 Squats",
            "15 Jumping Jacks",
            "30s Plank",
            "20 Crunches",
            "10 Push-ups"
        ]
    },
    "Saturday": {
        title: "ACTIVE RECOVERY",
        exercises: [
            "15 Russian Twists",
            "20s Wall Sit",
            "15 Sit-ups",
            "5 Jumping Jacks",
            "5 Lunges"
        ]
    }
};

function initializeDay(dayName) {
    const dayData = workoutData[dayName];
    const questContainer = document.querySelector('.quest-container');
    
    questContainer.innerHTML = `
        <div class="quest-header">
            <h2 class="quest-title">${dayData.title}</h2>
        </div>
        <div class="quest-list" id="${dayName}">
            ${dayData.exercises.length > 0 ? 
                dayData.exercises.map((exercise, index) => `
                    <div class="quest-item">
                        <span class="quest-checkbox"></span>
                        <span class="quest-content">${exercise}</span>
                    </div>
                `).join('') : 
                `<p class="quest-text">${dayData.description}</p>`
            }
        </div>
    `;
    
    // Set up click handlers for exercises
    if (dayData.exercises.length > 0) {
        const questItems = document.querySelectorAll('.quest-item');
        questItems.forEach((item, index) => {
            const key = `quest-${dayName}-${index}`;
            if (localStorage.getItem(key) === 'true') {
                item.classList.add('completed');
            }
            
            item.addEventListener('click', () => {
                item.classList.toggle('completed');
                localStorage.setItem(key, item.classList.contains('completed'));
            });
        });
    }
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('time').textContent = timeString;
}

function showContent() {
    document.getElementById("login-screen").style.display = "none";
    document.querySelector(".system-container").style.display = "flex";
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    const todayName = dayNames[now.getDay()];

    document.getElementById("day").textContent = todayName.toUpperCase();
    initializeDay(todayName);
    
    setInterval(updateTime, 1000);
    updateTime();
}

// Authentication
const PASSWORD = "health@666";
const input = document.getElementById("password-input");

function authenticate() {
    if (input.value === PASSWORD) {
        localStorage.setItem("authenticated", "true");
        showContent();
    } else {
        alert("ACCESS DENIED\nIncorrect password!");
        input.value = "";
        input.focus();
    }
}

if (localStorage.getItem("authenticated") === "true") {
    showContent();
} else {
    document.getElementById("password-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") authenticate();
    });
}

// Reset button
document.getElementById("reset-button").addEventListener("click", () => {
    if (confirm("WARNING: This will reset all your progress.\nAre you sure?")) {
        localStorage.clear();
        location.reload();
    }
});
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function showContent() {
    document.getElementById("login-screen").style.display = "none";
    document.querySelector(".system-container").style.display = "flex";
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    const todayName = dayNames[now.getDay()];

    document.getElementById("day").textContent = todayName.toUpperCase();
    initializeDay(todayName);
    
    setInterval(updateTime, 1000);
    updateTime();
    
    // Enter fullscreen immediately after login
    setTimeout(toggleFullscreen, 300);
}

// Add this event listener at the bottom of the file (before the authentication check):
document.addEventListener('click', function() {
    toggleFullscreen();
});

// Update the authenticate function to include fullscreen:
function authenticate() {
    if (input.value === PASSWORD) {
        localStorage.setItem("authenticated", "true");
        showContent();
        setTimeout(toggleFullscreen, 300); // Extra safety in case the first one fails
    } else {
        alert("ACCESS DENIED\nIncorrect password!");
        input.value = "";
        input.focus();
    }
}
