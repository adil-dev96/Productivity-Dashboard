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

let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let interval = document.getElementById("interval");

let timeLeft = 1500;
let meantime;

const updateTimer = () => {
  const minute = Math.floor(timeLeft / 60);
  const second = timeLeft % 60;

  timer.innerHTML =
 ` ${minute.toString().padStart(2,"0")}:${second.toString().padStart(2,"0")}` 
};

