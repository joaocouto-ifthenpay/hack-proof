var audioObj = new Audio("../audio/playing.mp3");
// Definir os totais de vida inicial
var playerLife = 5;
var hackerLife = 5;

// Mensagem quando o jogo acaba
var hackerWinnerMessage = "Fim do jogo! Foste hackeado!";
var playerWinnerMessage = "Parabéns! Derrotaste o hacker!";


var playerStartLife = parseInt(playerLife);
var hackerStartLife = parseInt(hackerLife);

var roundFinished = false;
var cardSelected = false;

updateScores();

document.querySelector(".game-board").classList.add("before-game");

var allCardElements = document.querySelectorAll(".card");

// Adiciona o click handler a todos os elementos de cartas do jogador
for (var i = 0; i < allCardElements.length; i++) {
  var card = allCardElements[i];
  if (card.classList.contains("player-card")) {
    card.addEventListener("click", function (e) {
      cardClicked(this);
    });
  }
}


// Quando uma carta é clicada
function cardClicked(cardEl) {

  if (cardSelected) { return; }
  cardSelected = true;

  cardEl.classList.add("played-card");

  document.querySelector(".game-board").classList.add("card-selected");

  // Espera 500ms para revelar o poder do hacker
  setTimeout(function () {
    revealHackerPower();
  }, 500)

  // Espera 750ms para revelar o poder do jogador
  setTimeout(function () {
    revealPlayerPower();
  }, 800)

  // Espera 1250ms para comparar as pontuações das cartas
  setTimeout(function () {
    compareCards();
  }, 1400);
}

// Mostra o nível de poder na carta do jogador
function revealPlayerPower() {
  var playerCard = document.querySelector(".played-card");
  playerCard.classList.add("reveal-power");
}

// Mostra o nível de poder na carta do hacker
function revealHackerPower() {
  var hackerCard = document.querySelector(".hacker-card");
  hackerCard.classList.add("reveal-power");
}

function compareCards() {
  var playerCard = document.querySelector(".played-card");
  var playerPowerEl = playerCard.querySelector(".power");

  var hackerCard = document.querySelector(".hacker-card");
  var hackerPowerEl = hackerCard.querySelector(".power");

  var playerPower = parseInt(playerPowerEl.innerHTML);
  var hackerPower = parseInt(hackerPowerEl.innerHTML);

  var powerDifference = playerPower - hackerPower;

  if (powerDifference < 0) {
    // Jogador perde
    playerLife = playerLife + powerDifference;
    hackerCard.classList.add("better-card");
    playerCard.classList.add("worse-card");
    document.querySelector(".player-stats .thumbnail").classList.add("ouch");
  } else if (powerDifference > 0) {
    // Jogador ganha
    hackerLife = hackerLife - powerDifference;
    playerCard.classList.add("better-card");
    hackerCard.classList.add("worse-card");
    document.querySelector(".hacker-stats .thumbnail").classList.add("ouch");
  } else {
    playerCard.classList.add("tie-card");
    hackerCard.classList.add("tie-card");
  }

  updateScores();

  if (playerLife <= 0) {
    gameOver("Hacker", hackerLife);
  } else if (hackerLife <= 0) {
    gameOver("Player", playerLife)
  }

  roundFinished = true;

  document.querySelector("button.next-turn").removeAttribute("disabled");
}

// Mostra a mensagem de vencedor

function gameOver(winner, score) {
  audioObj.pause();
  document.querySelector(".game-board").classList.add("game-over");
  document.querySelector(".winner-section").style.display = "flex";
  document.querySelector(".winner-section").classList.remove("player-color");
  document.querySelector(".winner-section").classList.remove("hacker-color");

  if (winner == "Hacker") {
    let evilAudio = new Audio("../audio/evil-laugh.mp3");
    evilAudio.play();
    document.querySelector(".winner-message").innerHTML = hackerWinnerMessage;
    document.querySelector(".winner-section").classList.add("hacker-color");
    score = -score;

    updateFinalScore(score);
  } else {
    let ohNoAudio = new Audio("../audio/Oh-no-sound-effect.mp3");
    ohNoAudio.play();
    document.querySelector(".winner-message").innerHTML = playerWinnerMessage;
    document.querySelector(".winner-section").classList.add("player-color");
  }
  document.querySelector(".next-turn").innerHTML = none;
  updateFinalScore(score);
}


// Inicia o jogo
function startGame() {
  audioObj.loop = true;
  audioObj.addEventListener("canplaythrough", event => {
    /* o áudio está agora reproduzível; reproduza-o se as permissões permitirem */
    myAudioElement.play();
  });
  audioObj.play();
  document.querySelector(".game-board").classList.remove("before-game");
  document.querySelector(".game-board").classList.add("during-game");
  playTurn();
}


// Reinicia o jogo do zero
function restartGame() {
  document.querySelector(".game-board").classList.remove("game-over");
  document.querySelector(".game-board").classList.remove("during-game");
  document.querySelector(".game-board").classList.add("before-game");

  document.querySelector(".winner-section").style.display = "none";
  document.querySelector(".hacker-card").style.display = "none";

  var cards = allCardElements;

  document.querySelector("button").removeAttribute("disabled");

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  playerLife = playerStartLife;
  hackerLife = hackerStartLife;

  roundFinished = true;
  cardSelected = false;

  updateScores();
}

// Atualiza a barra de vida exibida e os totais de vida
function updateScores() {

  // Atualiza totais de vida para cada jogador
  document.querySelector(".player-stats .life-total").innerHTML = playerLife;
  document.querySelector(".hacker-stats .life-total").innerHTML = hackerLife;

  // Atualiza a barra de vida do jogador
  var playerPercent = playerLife / playerStartLife * 100;
  if (playerPercent < 0) {
    playerPercent = 0;
  }
  document.querySelector(".player-stats .life-left").style.height = playerPercent + "%";

  // Atualiza a barra de vida do hacker
  var hackerPercent = hackerLife / hackerStartLife * 100
  if (hackerPercent < 0) {
    hackerPercent = 0;
  }
  document.querySelector(".hacker-stats .life-left").style.height = hackerPercent + "%";
}


// Embaralha um array
function shuffleArray(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}


function playTurn() {

  roundFinished =

    true;
  cardSelected = false;

  document.querySelector(".game-board").classList.remove("card-selected");

  // Remove a classe "ouch" das miniaturas do jogador e do hacker
  document.querySelector(".hacker-stats .thumbnail").classList.remove("ouch");
  document.querySelector(".player-stats .thumbnail").classList.remove("ouch");

  // Oculta o botão "next turn", será mostrado novamente quando a ronda terminar
  document.querySelector(".next-turn").setAttribute("disabled", "true");

  for (var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];
    card.classList.remove("showCard");
  }

  setTimeout(function () {
    revealCards();
  }, 500);
}

function revealCards() {

  var j = 0;
  var cardIndexes = shuffleArray([0, 1, 2]);

  // Obter cartas de cenário
  console.log("scenarios.length == " + scenarios.length);

  var randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
  var scenario = scenarios[randomScenarioIndex];
  console.log(scenario.hackerCard.description);

  scenarios.splice(randomScenarioIndex, 1);

  console.log("scenarios.length after splice == " + scenarios.length);

  var hackerCard = scenario.hackerCard;
  var hackerCardEl = document.querySelector(".hacker-area .card");

  // Conteúdo das cartas do jogador
  var playerCards = scenario.playerCards;

  for (var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];

    card.classList.remove("worse-card");
    card.classList.remove("better-card");
    card.classList.remove("played-card");
    card.classList.remove("tie-card");
    card.classList.remove("prepared");
    card.classList.remove("reveal-power");

    // Exibe os detalhes da carta do jogador
    if (card.classList.contains("player-card")) {
      card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
      card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
      j++;
    }

    // Revela cada carta uma por uma com um atraso de 100ms
    setTimeout(function (card, j) {
      return function () {
        card.classList.remove("prepared");
        card.style.display = "block";
        card.classList.add("showCard");
      }
    }(card, i), parseInt(i + 1) * 200);
  }

  // Exibe a carta do hacker
  hackerCardEl.querySelector(".text").innerHTML = hackerCard.description;
  hackerCardEl.querySelector(".power").innerHTML = hackerCard.power;
}


function updateFinalScore(score) {

  // Obter uma referência para a base de dados
  const database = firebase.database();

  let user = firebase.auth().currentUser;
  let uid = user.uid;
  let path = 'score/' + uid;

  var data = {
    user: uid,
    name: user.displayName,
    score: score,
  };

  database.ref(path).set(data)
    .then(() => {
      // Dados salvos com sucesso!
      console.log('SIM');
    })
    .catch((error) => {
      // Falha ao gravar os dados...
      console.log('NAO');
    });

}