
var playerMove = "X";
var lastMove;
var winnerX = 0;
var winnerO = 0;
var rowCountX = 0;
var rowCountO = 0;
var positionObject = {};
X_sound = new Audio('media/captain-america-sound-effect.mp3');
O_sound = new Audio('media/Iron-man-Sound-effect.mp3');
initSound = new Audio('media/the-Avengers.mp3');


var scoreboard = document.querySelectorAll("scoreboard");

window.onload = function () {
  alert("Hi! Let's play some Civil War - Tic Tac Toe. Captain America goes first. Good luck!");
  initSound.play();
  createObject();
  positionClicked();
  clearbutton();
};

function positionClicked () {
  for (var i=1; i<10; i++) {
     document.getElementById("pos"+i).addEventListener("click", playerChoice);
    }
}

function createObject () { 
  for(i=1; i<10; i++){
     positionObject["pos"+i] = "";
  }
}

function playerChoice (event) {
    var position = this.getAttribute("id");
    positionObject[position] = playerMove;
    this.removeEventListener("click", playerChoice);
    changeBackground(event.target);
    if(!checkWinner()) {
      switchPlayer();
    }
    else {
      winsThreeRow();
    }
}

function changeBackground (event) {
  var playerTurn = document.getElementById("player");
  if (playerMove === "X"){
    event.setAttribute("style", "background-image: url(media/captain-america.png");
    X_sound.play();
    playerTurn.textContent = "It's Iron Man's turn";
  }
  else {
    event.setAttribute("style", "background-image: url(media/iron-man.jpg");
    O_sound.play();
    playerTurn.innerHTML = "It's Captain America's turn";
  }
}

function switchPlayer () {
  if (playerMove === "X"){
    playerMove = "O";
  }
  else {
    playerMove = "X";
  }
}

function checkWinner () {
    if (checkPossibilities()) {
        if (playerMove === "X") {
          alert("Captain America wins!");
          winnerX ++;
        }
        else {
          alert("Iron Man wins!"); 
          winnerO ++;
        }
        clearSquares();
        currentMove = playerMove;
        return true;
    }
    else {
      return false;
    }

}

function winsThreeRow () {
  if (rowCountX < 3 && rowCountO < 3) {
    if (winnerX === 1 && winnerO === 0 || winnerX === 0 && winnerO === 1) {
      if(currentMove === "X") {
        rowCountX ++;
        lastMove = "X";
      }
      else {
        rowCountO ++;
        lastMove = "O"; 
      }
    }
    else {
      if (currentMove === lastMove) {  
        if (currentMove === "X") {
          rowCountX ++;
          lastMove = "X";
        }
        else if (currentMove === "O") {
          console.log(rowCountX);
          console.log(rowCountO);
          rowCountO ++;
          lastMove = "O";
        }
      }
      else {
        lastMove = currentMove;
      }
    }
  }
  else {
    if (playerMove === "X") {
      alert("Captain America wins 3 in a row!!!");
    }
    else {
      alert("Iron Man wins 3 in a row!!!");
    }
    rowCountX = 1;
    rowCountO = 1;
    winnerX = 0;
    winnerO = 0; 
    clearSquares();
  }

  // if (winnerX >= 2 || winnerO >= 2 ) {
  //   if ((winnerX - 2) > winnerO) {
  //     alert("Captain America wins 3 in a row!!!");
  //     winnerX = 0;
  //     winnerO = 0; 
  //     clearSquares();
  //   }
  //   else if ((winnerO - 3) > winnerX) {
  //     alert("Iron Man wins 3 in a row!!!");
  //     winnerX = 0;
  //     winnerO = 0; 
  //     clearSquares();
  //   }
  // }
}

function checkPossibilities () {
  return (checkValues("pos1", "pos2", "pos3") || checkValues("pos4", "pos5", "pos6") ||
    checkValues("pos7", "pos8", "pos9") || checkValues("pos1", "pos4", "pos7") ||
    checkValues("pos2", "pos5", "pos8") || checkValues("pos3", "pos6", "pos9") ||
    checkValues("pos1", "pos5", "pos9") || checkValues("pos3", "pos5", "pos7") );
}

function checkValues (a,b,c) {
  return (positionObject[a] === playerMove && positionObject[b] === playerMove && positionObject[c] === playerMove);
}

function clearbutton () {
  var button = document.getElementById("resetButton");
  button.addEventListener('click', clearSquares);
}


function clearSquares () {
  var playerTurn = document.getElementById("player");
  var scoreboard = document.getElementById("scoreboard");
  
  playerMove = "X";
  playerTurn.textContent = "It's Captain America's turn"; 
  scoreboard.textContent = winnerX + " - " + winnerO;
  clearBoard();
  initSound.play();
  createObject();
  positionClicked();
}

function clearBoard () {
  for (i=1; i<10; i++) {
    document.getElementById("pos"+i).setAttribute("style", "background-image: url(media/civil-war.jpg");
  }
}