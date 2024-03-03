const coloresBoton = ["yellow", "green", "red", "blue"];
let gamePattern = [];

let userClickedPattern = [];

let nivel = 1;


// Start/Reset Game
const restartButton = document.querySelector("#restartButton");

restartButton.addEventListener("click", function () {
  resetGame();
  document.querySelector("h2").innerHTML = "Nivel " + nivel;
  document.querySelector("h1").innerHTML = "👾 SIMON GAME 👾";
  nextSequence();
});
  

// Almacena secuencia random del Juego
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var colorRandom = coloresBoton[randomNumber];
  gamePattern.push(colorRandom);
  console.log(gamePattern);

  userClickedPattern = [];

  document.querySelector("h2").innerHTML = "Nivel " + nivel++;

  var colorActivado = document.querySelector("#" + colorRandom);
  colorActivado.classList.add("pressedGame");

  setTimeout(function () {
    colorActivado.classList.remove("pressedGame");
  }, 100);

  var audio = new Audio("sounds/" + colorRandom + ".mp3");
  audio.play();
}

// Almacenar secuencia clicada por el usuario en userClickedPatern

var botones = document.querySelectorAll(".btn");

for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function () {
    var botonClicado = this.id;
    userClickedPattern.push(botonClicado);
    console.log(userClickedPattern);

    buttonAnimation(botonClicado);

    comprobarRespuesta(userClickedPattern.length - 1);
  });
}

function comprobarRespuesta(nivelActual) {
  //Comprobar que el patron del Juego es el mismo que la última secuencia elegida por el usuario
  if (gamePattern[nivelActual] === userClickedPattern[nivelActual]) {
    console.log("correcto");

    //Si es correcto el patrón comprobamos que la longitud es la misma para saber que ya han terminado y lanzar la secuencia de Juego otra vez con un delay
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    document.body.classList.add("game-over");
    document.querySelector("h1").innerHTML = "👾 GAME OVER 👾";
    document.querySelector("h2").style.display = "none";
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 500);
    resetGame();
    document.querySelector("#restartButton").style.visibility = "visible";
  }
}

// Activa animacion y sonido segun color

function buttonAnimation(currentColor) {
  var activeButton = document.querySelector("#" + currentColor);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);

  // Activa sonido segun color
  var audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
}



// Reset Game

function resetGame() {
  nivel = 1;
  userClickedPattern = [];
  gamePattern = [];
  document.querySelector("#restartButton").style.visibility = "hidden";
  document.querySelector("h2").style.display = "flex";
}
