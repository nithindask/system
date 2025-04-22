function goFullscreen() {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) docEl.requestFullscreen();
    else if (docEl.mozRequestFullScreen) docEl.mozRequestFullScreen();
    else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
    else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
}

function showContent() {
    document.getElementById("login-screen").style.display = "none";
    document.querySelector(".system-container").style.display = "flex";
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    const todayName = dayNames[now.getDay()];

    document.getElementById("day").textContent = todayName.toUpperCase();

    document.querySelectorAll(".day-paragraph").forEach(div => {
        div.style.display = "none";
    });
    document.getElementById(todayName).style.display = "block";

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById("time").textContent = timeString;
    }
    setInterval(updateTime, 1000);
    updateTime();

    document.addEventListener("click", goFullscreen);
    document.addEventListener("touchstart", goFullscreen);

    if (todayName === "Tuesday") {
        const currentDate = now.toDateString();
        const storedDate = localStorage.getItem("storedDate");
        if (storedDate !== currentDate) {
            localStorage.clear();
            localStorage.setItem("storedDate", currentDate);
            localStorage.setItem("authenticated", "true");
        }

        const tasks = document.getElementById("Tuesday").querySelectorAll(".quest-item");
        tasks.forEach((task, index) => {
            const isCompleted = localStorage.getItem(`task-${index}`) === "true";
            if (isCompleted) {
                task.classList.add("completed");
            }
            
            task.addEventListener("click", () => {
                task.classList.toggle("completed");
                localStorage.setItem(`task-${index}`, task.classList.contains("completed"));
            });
        });
    }

    // Show Reset Button
    document.getElementById("reset-button").style.display = "block";

    // Switch to fullscreen right after login
    goFullscreen();
}

const password = "health@666";
const input = document.getElementById("password-input");

function authenticate() {
    if (input.value === password) {
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

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", () => {
    if (confirm("WARNING: This will reset all system data.\nAre you sure?")) {
        localStorage.clear();
        location.reload();
    }
});

// Add some system-like sound effects (optional)
document.addEventListener("click", () => {
    const clickSound = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU..."); // Short beep sound
    clickSound.volume = 0.2;
    clickSound.play().catch(e => {});
});
