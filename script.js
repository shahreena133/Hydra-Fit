//  Dark / Light Mode 

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Light Mode ☀️";
    } else {
        themeToggle.textContent = "Dark Mode 🌙";
    }
});


// Hydration Tracker

const waterGoal = 2500;

let waterAmount = Number(localStorage.getItem("waterAmount")) || 0;

const waterAmountDisplay = document.getElementById("water-amount");
const waterPercentageDisplay = document.getElementById("water-percentage");
const waterProgress = document.getElementById("water-progress");
const goalAchieved = document.getElementById("goal-achieved");

const addCupButton = document.getElementById("add-cup");
const addBottleButton = document.getElementById("add-bottle");
const resetWaterButton = document.getElementById("reset-water");

function updateWater() {
    const percentage = Math.min((waterAmount / waterGoal) * 100, 100);

    waterAmountDisplay.textContent = waterAmount;
    waterPercentageDisplay.textContent = Math.round(percentage) + "%";

    waterProgress.style.width = percentage + "%";
    waterProgress.setAttribute("aria-valuenow", Math.round(percentage));

    if (waterAmount >= waterGoal) {
        goalAchieved.hidden = false;
        waterProgress.style.backgroundColor = "#22c55e";
    } else {
        goalAchieved.hidden = true;
        waterProgress.style.backgroundColor = "";
    }

    localStorage.setItem("waterAmount", waterAmount);
}

addCupButton.addEventListener("click", function () {
    waterAmount += 250;
    updateWater();
});

addBottleButton.addEventListener("click", function () {
    waterAmount += 500;
    updateWater();
});

resetWaterButton.addEventListener("click", function () {
    waterAmount = 0;
    updateWater();
});


// Habit Tracker 

const habitInput = document.getElementById("habit-input");
const addHabitButton = document.getElementById("add-habit");
const habitList = document.getElementById("habit-list");
const habitWarning = document.getElementById("habit-warning");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach(function (habit, index) {

        const habitRow = document.createElement("div");
        habitRow.className = "habit-row";

        const habitText = document.createElement("span");
        habitText.textContent =
            "🔥 " + habit.name + " — Streak: " + habit.streak;

        const logButton = document.createElement("button");
        logButton.textContent = "Log Today";
        logButton.type = "button";

        logButton.addEventListener("click", function () {
            habits[index].streak += 1;

            saveHabits();
            renderHabits();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            habits.splice(index, 1);
            habitWarning.hidden = true;
            addHabitButton.disabled = false;

            saveHabits();
            renderHabits();
        });
    
        habitRow.appendChild(habitText);
        habitRow.appendChild(logButton);
        habitRow.appendChild(deleteButton);

        habitList.appendChild(habitRow);
    });
}

addHabitButton.addEventListener("click", function () {

    const habitName = habitInput.value.trim();

    if (habitName === "") {
        return;
    }

    if (habits.length >= 4) {
        habitWarning.hidden = false;
        addHabitButton.disabled = true
        return;
    }

    habits.push({
        name: habitName,
        streak: 0
    });

    saveHabits();

    habitInput.value = "";

    renderHabits();
});

renderHabits();


//  Active Calories 

const activitySelect = document.getElementById("activity-select");
const durationInput = document.getElementById("duration-input");
const calculateCaloriesButton =
    document.getElementById("calculate-calories");
const calorieAmount = document.getElementById("calorie-amount");
const resetCaloriesButton = document.getElementById("reset-calories")

let calorieTotal =
    Number(localStorage.getItem("calorieTotal")) || 0;

function updateCalories() {
    calorieAmount.textContent = calorieTotal;
    localStorage.setItem("calorieTotal", calorieTotal);
}

calculateCaloriesButton.addEventListener("click", function () {

    const duration = Number(durationInput.value);

    if (duration <= 0 || isNaN(duration)) {
        return;
    }

    const selectedOption =
        activitySelect.options[activitySelect.selectedIndex];

    const rate = Number(selectedOption.dataset.rate);

    const caloriesBurned = duration * rate;

    calorieTotal += caloriesBurned;

    updateCalories();
  durationInput.value = "";
});

resetCaloriesButton.addEventListener("click" , function (){
calorieTotal = 0;
updateCalories();

});

updateCalories();


// Load Saved Hydration

updateWater();