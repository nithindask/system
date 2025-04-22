function goFullscreen() {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) docEl.requestFullscreen();
    else if (docEl.mozRequestFullScreen) docEl.mozRequestFullScreen();
    else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
    else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
}

function showContent() {
    document.getElementById("login-screen").style.display = "none";
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    const todayName = dayNames[now.getDay()];

    document.getElementById("day").textContent = todayName;

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

        const tasks = document.getElementById("Tuesday").querySelectorAll("p");
        tasks.forEach((p, index) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = localStorage.getItem(`task-${index}`) === "true";
            checkbox.addEventListener("change", () => {
                localStorage.setItem(`task-${index}`, checkbox.checked);
            });
            p.prepend(checkbox);
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
        alert("Incorrect password! 😢");
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
    localStorage.clear();
    location.reload(); // Reload the page so the user has to enter the password again
});
