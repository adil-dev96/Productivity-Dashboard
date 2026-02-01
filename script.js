function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPageBackbtn = document.querySelectorAll(`.fullElem .back`);

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackbtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}

openFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
              <h5>${elem.task} <span class =${elem.imp}>imp</span></h5>
              <button id=${idx}>Mark as Completed</button>
            </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }

  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    renderTask();
    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let dayPlanner = document.querySelector(".day-planner");
  let hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  let wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value = ${savedData}>
          </div>`;
  });
  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      console.log("adil");

      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivationQuote() {
  let motivationQuote = document.querySelector(".motivation-2 h1");
  let motivationAuthor = document.querySelector(".motivation-3 h2");
  async function fetchQuote() {
    let response = await fetch("https://thequoteshub.com/api/");
    let data = await response.json();

    motivationQuote.innerHTML = data.text;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}

motivationQuote();

function pomodoro() {
  let start = document.querySelector(".start");
  let stop = document.querySelector(".stop");
  let reset = document.querySelector(".reset");
  let interval = document.querySelector(".interval");
  let timer = document.querySelector(".timer");

  let timeLeft = 25 * 60;
  let intervalid = null;
  let mode = "work";

  const updateTimer = () => {
    let minute = Math.floor(timeLeft / 60);
    let second = timeLeft % 60;
    timer.innerHTML = `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  };

  function switchMode() {
    clearInterval(intervalid);
    intervalid = null;
    if (mode === "work") {
      mode = "break";
      timeLeft = 5 * 60;
    } else {
      mode = "work";
      timeLeft = 25 * 60;
    }

    updateTimer();
    startTimer();
  }

  const startTimer = () => {
    if (intervalid) return;

    intervalid = setInterval(() => {
      timeLeft--;
      updateTimer();

      if (timeLeft === 0) {
        switchMode();
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalid);
    intervalid = null;
  };

  const resetTimer = () => {
    clearInterval(intervalid);
    intervalid = null;
    mode = "work";
    timeLeft = 25 * 60;
    updateTimer();
  };

  function startBreak() {
    clearInterval(intervalid);
    intervalid = null;
    mode = "break";
    timeLeft = 5 * 60;
    updateTimer();
    startTimer();
  }

  start.addEventListener("click", startTimer);
  stop.addEventListener("click", stopTimer);
  reset.addEventListener("click", resetTimer);
  interval.addEventListener("click", startBreak);

  updateTimer();
}

pomodoro();



let currentGoals = [
  {
    task: "learn backend",
    done: "true",
  },
  {
    task: "learn react",
    done: "false",
  },
  {
    task: "learn frontend",
    done: "false",
  },
];

function renderGoal() {
  let goalsContainer = document.querySelector(".goalsContainer");
  let sum = "";
  currentGoals.forEach(function (elem) {
    sum =
      sum +
      `<div class="allgoals">
                <h2>${elem.task}</h2>
                <div class="goalButton">
                  <button class="goalDone">Done</button>
                  <button class="goalDelete">Delete</button>
                </div>
              </div>`;
  });

  goalsContainer.innerHTML = sum;
}

renderGoal();

let goalForm = document.getElementById("goalForm");
let input = document.getElementById("goalInput");

goalForm.addEventListener('submit',function(e){
  e.preventDefault()
  console.log(currentGoals);
  currentGoals.push({task:input.value})
  input.value=''
  renderGoal()
})