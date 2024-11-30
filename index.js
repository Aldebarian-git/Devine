let nb_mystère = Math.floor(Math.random() * 100);
let playerName = "";
let meilleurJoueur = "Patrick";
let meilleurScore = 15;
let answer = "";
let answerValue = 0;
let nb_tentative = 0;
let step = 0;

const button = document.getElementById("play");
const buttonPropal = document.getElementById("propal");
const bulleContainer = document.querySelector(".bulle");
const bulle = document.getElementById("content");
const namePrompt = document.getElementById("prompt");
const answerPlayer = document.getElementById("answer");
const switchEffect = new Audio("./Assets/switch.mp3");
const music = new Audio("./Assets/music.mp3");
const volumeOff = document.getElementById("volumeOff");
const volumeUp = document.getElementById("volumeUp");
const muteClick = new Audio("./Assets/muteclick.mp3");
const bestPlayer = document.getElementById("bestPlayer");
const bestScore = document.getElementById("bestScore");
const scoreDisplay = document.querySelector(".scoreDisplay");

music.loop = true;
music.volume = 0.1;

const ButtonClick = () => {
  if (step === 0) {
    button.textContent = "Let's Go !";
    bulle.textContent = "Super ! Commençons à jouer alors !";
    step++;
    music.play().catch((error) => {
      console.error("La lecture automatique a été bloquée : ", error);
    });
  } else if (step === 1) {
    button.textContent = "Valider";
    bulle.textContent = "Pour commencer, quel est ton prénom?";
    namePrompt.style.display = "block";
    namePrompt.focus();
    namePrompt.addEventListener("input", () => {
      playerName = namePrompt.value;
    });
    step++;
  } else if (step === 2) {
    namePrompt.style.display = "none";
    button.textContent = "Il était temps";
    bulle.textContent =
      "Très bien " + playerName + ", Nous allons pouvoir commencer";
    step++;
  } else if (step === 3) {
    bulle.textContent =
      "Je vais penser très fort à un chiffre/nombre entre 0 et 100, et tu vas devoir le deviner. Tu es pret?";
    button.textContent = "Carrement !";
    step++;
  } else if (step === 4) {
    console.log(nb_mystère);
    answerPlayer.value = "";
    answerPlayer.style.display = "block";
    answerPlayer.focus();
    bulle.textContent =
      "Hum..... C'est bon j'ai trouvé ! Alors, selon toi à quel nombre je pense?";
    button.textContent = "Proposer";
    step++;
  } else if (step === 5) {
    answerValue = answerPlayer.value;
    if (parseInt(answerValue) > nb_mystère) {
      bulle.textContent = "C'est moins !";
      nb_tentative++;
      answerPlayer.value = "";
      answerPlayer.focus();
    }
    if (parseInt(answerValue) < nb_mystère) {
      bulle.textContent = "C'est plus !";
      nb_tentative++;
      answerPlayer.value = "";
      answerPlayer.focus();
    }
    if (parseInt(answerValue) != nb_mystère) {
      if (bulleContainer) {
        bulleContainer.classList.add("shake");
        // Retirer la classe après 500 ms (durée de l'animation sur le CSS)
        setTimeout(() => {
          bulleContainer.classList.remove("shake");
        }, 500);
      }
    }
    if (parseInt(answerValue) === nb_mystère) {
      nb_tentative++;
      answerPlayer.style.display = "none";
      bulle.textContent =
        "Super ! Tu as trouvé le nombre mystère : " +
        nb_mystère +
        " en seulement " +
        nb_tentative +
        " tentative(s)";
      button.textContent = "Je suis le Goat !";
      step++;
      if (parseInt(bestScore.textContent) > nb_tentative) {
        bestPlayer.textContent = playerName;
        bestScore.textContent = nb_tentative;
        scoreDisplay.style.display = "block";
      }
    }
  } else if (step === 6) {
    bulle.textContent = "Tu as envie de rejouer ?";
    button.textContent = "Oh oui !";
    nb_mystère = Math.floor(Math.random() * 100); // Génére un nouveau nombre mystère
    nb_tentative = 0; // Réinitialise le nombre de tentatives
    step = 4; //Retour à l'étape 4
  }
};

// Ajout de l'événement "click" sur le bouton
button.addEventListener("click", () => {
  ButtonClick();
  switchEffect.play();
});

// Ajout de la gestion de la touche "Enter"
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ButtonClick();
    switchEffect.play();
  }
});

volumeUp.addEventListener("click", () => {
  volumeUp.style.display = "none";
  volumeOff.style.display = "block";
  music.volume = 0;
  muteClick.play();
});

volumeOff.addEventListener("click", () => {
  volumeUp.style.display = "block";
  volumeOff.style.display = "none";
  music.volume = 0.1;
  muteClick.play();
});
