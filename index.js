let noOfTimer = 0;
var audio = new Audio('assets/timeup.mp3');

function submitForm(event) {
  event.preventDefault();
  var form = event.target;

  var hours = form.querySelector("#hours").value;
  var minutes = form.querySelector("#minutes").value;
  var sec = form.querySelector("#sec").value;

  let card = document.createElement("div");
  // setInterval for every second and update the hourse minutes and sec values
  //ClearInterval after totalTime is over
  let cardId = `card${noOfTimer}`;
  card.innerHTML = `
    <div class="card_timer" id="${cardId}">
    <span>Time Left:</span>

    <span>${hours}</span>
    <span>${minutes}</span>
    <span>${sec}</span>

    <button class="primary_button" onclick="deleteCard(this)">Delete</button>
  </div>
    `;
  noOfTimer++;
  const totalTime = hours * 3600 + minutes * 60 + parseInt(sec);
  console.log("values", hours, minutes, sec);
  createTimer(cardId, totalTime);
  active_timer.appendChild(card);
}

function createTimer(cardId, totalTime) {
  // let currentTime = totalTime;
  let interval = setInterval(checkIfTimeOver, 1000);

  function checkIfTimeOver() {
    let hours = Math.trunc(totalTime / 3600);
    let min = Math.trunc((totalTime % 3600) / 60);
    let sec = Math.trunc((totalTime % 3600) % 60);
    let card = document.getElementById(cardId);
    if (totalTime == 0) {
      clearInterval(interval);
      card.innerHTML = ` <h2>Time is Up!</h2>
      
      <button class="stop" onclick="deleteCard(this)">Stop</button>
      
      `;

     card.className="card_timeup"
     audio.play();
    } else {
      card.innerHTML = ` <span>Time Left:</span>

      <div class="d-flex">
     <div class="time_value">${hours}</div><b>:</b>
     <div class="time_value">${min}</div><b>:</b>
     <div class="time_value">${sec}</div>
     </div>
 
     <button class="primary_button" onclick="deleteCard(this, ${interval})">Delete</button>`;

      totalTime--;
    }
  }
}

const add_timer = document.getElementById("set_timer");

function deleteCard(event, interval) {
  const card = event.parentElement.parentElement;
  if (interval) {
    clearInterval(interval);
  }
 audio.pause();
  card.remove();
}
