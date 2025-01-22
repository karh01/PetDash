"use strict";

//there are warnings in the console for timeout, i can not figure out how to fix this
// Jquery style for gender
 $(function () {
    $("#gender-group input").checkboxradio();
    $("#gender-group").controlgroup();
  });

// Handle Dashboard Form Submission
document.getElementById("edit-btn").addEventListener("click", () => {
 document.getElementById("pet-form").style.display = "block";
});

document.getElementById("pet-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const petInfo = {
    name: document.getElementById("pet-name").value,
    age: document.getElementById("pet-age").value,
    gender: document.querySelector('input[name="pet-gender"]:checked')?.value || "Not Specified",
    medical: document.getElementById("pet-medical").value,
    birthday: document.getElementById("pet-birthday").value,
  };

  localStorage.setItem("petInfo", JSON.stringify(petInfo));
  updateDashboard();
  document.getElementById("pet-form").style.display = "none";
});

// Update Dashboard Content
function updateDashboard() {
  const petInfo = JSON.parse(localStorage.getItem("petInfo"));
  if (petInfo) {
    document.getElementById("dashboard-content").innerHTML = `
      <div class="card">
        <h3>Name</h3>
        <p>${petInfo.name}</p>
      </div>
      <div class="card">
        <h3>Age</h3>
        <p>${petInfo.age}</p>
      </div>
      <div class="card">
        <h3>Gender</h3>
        <p>${petInfo.gender}</p>
      </div>
      <div class="card">
        <h3>Medical Conditions</h3>
        <p>${petInfo.medical}</p>
      </div>
      <div class="card">
        <h3>Birthday</h3>
        <p>${petInfo.birthday}</p>
      </div>
    `;
  }
}



//Calender
const calendarContainer = document.getElementById('calendar');
const monthName = document.getElementById('month-name');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
const localStorageKey = 'calendarTasks';

// Load tasks from local storage or initialize as an empty object
let tasks = JSON.parse(localStorage.getItem(localStorage)) || {};

function saveTasks() {
  localStorage.setItem(localStorage, JSON.stringify(tasks));
}

function renderCalendar(date) {
  calendarContainer.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();

  // Format key for the current month
  const monthKey = `${year}-${month}`;
  if (!tasks[monthKey]) tasks[monthKey] = {}; // Initialize if not exists

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthName.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Render blank days
 for (let i = 0; i < firstDay; i++) {
   const blankDay = document.createElement('div');
   blankDay.classList.add('day');
   calendarContainer.appendChild(blankDay);
  }

  // Render the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    const dayKey = `${i}`;
    const taskContent = tasks[monthKey][dayKey] || '';

    day.innerHTML = `
      <span>${i}</span>
      <div class="task-display">${taskContent}</div>
      <textarea></textarea>
    `;

    const taskDisplay = day.querySelector('.task-display');
    const textarea = day.querySelector('textarea');

    // Enable editing on click
   	day.addEventListener('click', () => {
      if (!day.classList.contains('editing')) {
        day.classList.add('editing');
        textarea.value = taskDisplay.textContent || '';
        textarea.style.display = 'block';
        textarea.focus();
      }
    });

    // Save changes when leaving the textarea
    textarea.addEventListener('blur', () => {
      day.classList.remove('editing');
      const newTask = textarea.value.trim();
      taskDisplay.textContent = newTask; // displays the task
      textarea.style.display = 'none'; // Hide the textarea

      // Save the task to local storage
      if (!tasks[monthKey]) tasks[monthKey] = {};
      if (newTask) {
        tasks[monthKey][dayKey] = newTask;
      } else {
        delete tasks[monthKey][dayKey]; // remove empty tasks
      }
      saveTasks();
    });

    calendarContainer.appendChild(day);
  }
}

prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Initialize
renderCalendar(currentDate);



// Fetch Dog Facts API
async function fetchDogFacts(limit = 20) {
  const factsList = document.getElementById("facts-list");
  try {
    const response = await fetch(`https://dogapi.dog/api/v2/facts?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch dog facts.");
    }
    const data = await response.json();
    const facts = data.data;
    // Append each fact as a list item
    facts.forEach((fact) => {
      const listItem = document.createElement("li");
      listItem.textContent = fact.attributes.body;
      factsList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    const errorMsg = document.createElement("li");
    errorMsg.textContent = "Failed to load dog facts. Please try again.";
    errorMsg.style.color = "red";
    factsList.appendChild(errorMsg);
  }
}

//"Load More Facts" Button
document.getElementById("fetch-facts-btn").addEventListener("click", () => {
  fetchDogFacts(5); // Load 5 more 
});

// Initial Fetch of Dog Facts
document.addEventListener("DOMContentLoaded", () => {
  fetchDogFacts(3);
});


//carousel using JqueryUI
$( function() {
    function left( element, using ) {
      element.position({
        my: "right middle",
        at: "left+25 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    }
    function right( element, using ) {
      element.position({
        my: "left middle",
        at: "right-25 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    }
    function center( element, using ) {
      element.position({
        my: "center middle",
        at: "center middle",
        of: "#container",
        using: using
      });
    }
 
    left( $( "img" ).eq( 0 ) );
    center( $( "img" ).eq( 1 ) );
    right( $( "img" ).eq( 2 ) );
 
    function animate( to ) {
      $( this ).stop( true, false ).animate( to );
    }
    function next( event ) {
      event.preventDefault();
      center( $( "img" ).eq( 2 ), animate );
      left( $( "img" ).eq( 1 ), animate );
      right( $( "img" ).eq( 0 ).appendTo( "#container" ) );
    }
    function previous( event ) {
      event.preventDefault();
      center( $( "img" ).eq( 0 ), animate );
      right( $( "img" ).eq( 1 ), animate );
      left( $( "img" ).eq( 2 ).prependTo( "#container" ) );
    }
    $( "#previous" ).on( "click", previous );
    $( "#next" ).on( "click", next );
 
    $( "img" ).on( "click", function( event ) {
      $( "img" ).index( this ) === 0 ? previous( event ) : next( event );
    });
 
    $( window ).on( "resize", function() {
      left( $( "img" ).eq( 0 ), animate );
      center( $( "img" ).eq( 1 ), animate );
      right( $( "img" ).eq( 2 ), animate );
    });
  } );

//Quiz
document.addEventListener('DOMContentLoaded', () => {
  const correctAnswers = {
      q1: 'Greyhound',
      q2: '42',
      q3: 'Labrador Retriever',
  };

  document.getElementById('submit-quiz-btn').addEventListener('click', () => {
      let score = 0;
      let totalQuestions = Object.keys(correctAnswers).length;

      // Loop through each question and check the selected answers
      Object.keys(correctAnswers).forEach(questionId => {
          const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
          const correctAnswer = correctAnswers[questionId];

          // Check if the selected answer is correct
          if (selectedOption && selectedOption.value === correctAnswer) {
              score++;
              selectedOption.parentElement.style.color = 'green';
          } else if (selectedOption) {
              selectedOption.parentElement.style.color = 'red';
          }
      });

      // Display the results
      const resultsDiv = document.getElementById('quiz-results');
      resultsDiv.style.display = 'block';
      document.getElementById('score').textContent = `You scored ${score} out of ${totalQuestions}!`;

      // jqueryUI pluggin
      $('#quiz-results').effect('bounce', { times: 3 }, 1000);
  });
});