let bgSound = document.querySelector("#bgSound");
let clickSound = document.querySelector("#clickSound");
let spinSound = document.querySelector("#spinSound");
let spinSound2 = document.querySelector("#spinSound2");
let coinsSound = document.querySelector("#coinsSound");
let win1 = document.querySelector("#win1");
let bigWinSound = document.querySelector("#bigWinSound");
let fogosSound = document.querySelector("#fogosSound");
let levelupSound = document.querySelector("#levelupSound");
let levelupSound2 = document.querySelector("#levelupSound2");

bgSound.volume = 0;
document.querySelector(".start-button").addEventListener("click", () => {
  document.querySelector(".stage1").style.display = "none";
  document.querySelector(".stage2").style.maxHeight = "unset";
  document.querySelector(".stage2").style.maxWidth = "unset";
  document.querySelector(".stage2").style.opacity = "1";
  startVolumeIncrease();

  const video = document.querySelector("video");

  if (video) {
    video.play().catch(() => {
      // Handle the play error (if any)
      video.muted = true;
      video.play();
    });
  }
});

document.querySelector(".btnFim").addEventListener("click", () => {
  document.querySelector("#body-content").style.backgroundImage = "unset";

  const audios = document.querySelectorAll("audio");

  audios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
});

document.getElementById("redeem-button").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("main-content").style.display = "none";
  document.getElementById("new-modal").style.display = "block";
});

function startVolumeIncrease() {
  bgSound.volume = 0.3; // Inicialmente o volume é 0
  bgSound.play();

  const targetVolume = 0.6; // Volume final desejado (máximo)
  const interval = 100; // Intervalo de tempo em milissegundos (0.1 segundos)
  const step = 0.01; // Incremento de volume

  const intervalId = setInterval(() => {
    if (bgSound.volume < targetVolume) {
      bgSound.volume = Math.min(bgSound.volume + step, targetVolume);
    } else {
      clearInterval(intervalId);
    }
  }, interval);
}

// Ajuste nas posições para girar para baixo
const positions = [
  ["-41.4%", "-30%", "-81.8%"], // Para cima
  ["-7.8%", "0", "-14.8%"],    // Para cima
  ["-15%", "-7.4%", "-26.05%"], // Para cima
];

let countSpins = 0;

// Quando clicar no botão de girar
document.getElementById("spinButton").addEventListener("click", function (e) {
  if (countSpins == 0 || countSpins == 1) {
    document.querySelector("#carteira").textContent = "18.00";
  }
  if (countSpins == 2) {
    document.querySelector("#carteira").textContent = "16.00";
  }
  clickSound.play();
  spinSound.play();
  document.querySelector(".allmarquee").style.opacity = "1";
  document.querySelector(".speedlight").style.opacity = "0";
  document.querySelector("#ganhoCols1").style.opacity = "0";
  document.querySelector(".ganho").classList.remove("show");

  e.target.classList.add("rotateFaster");
  e.target.blur();
  document.querySelector("body").focus();
  let stars = document.querySelector(".stars");
  stars.classList.add("anim");

  const columns = [
    document.getElementById("col1"),
    document.getElementById("col2"),
    document.getElementById("col3"),
  ];

  columns.forEach((col, index) => {
    col.style.animation = `spin 0.7s linear infinite`; // Rodando indefinidamente
  });

  const cols = document.querySelectorAll(".col");
  cols.forEach((col, index) => {
    col.classList.add("shinecol");
  });

  // Ajustando o tempo para a finalização da rotação de cada coluna
  setTimeout(() => stopSpin(columns[0], 0), 2000); // 2 segundos para a primeira coluna
  setTimeout(() => stopSpin(columns[1], 1), 2500); // 3 segundos para a segunda coluna
  setTimeout(() => {
    stopSpin(columns[2], 2); // 4 segundos para a terceira coluna

    e.target.classList.remove("rotateFaster");
    stars.classList.remove("anim");

    cols.forEach((col, index) => {
      col.classList.remove("shinecol");
    });

    if (countSpins == 0) {
      document.querySelector(".allmarquee").style.opacity = "0";
      document.querySelector(".speedlight").style.opacity = "0.2";
      document.querySelector(".ganho").classList.add("show");
      document.querySelector("#ganhoCols1").style.opacity = "1";
      win1.play();
      document.querySelector("#total").textContent = "2.00";
      document.querySelector("#carteira").textContent = "20.00";
    }
    if (countSpins == 2) {
      e.target.style.pointerEvents = "none";
      document.querySelector("#ganhoCols2").style.opacity = "1";
      win1.play();
      setTimeout(() => {
        coinsSound.play();
        bgSound.volume = 0.3;
        document.querySelector("#ganhoCols2").style.display = "none";
        document.querySelector(".grandeGanho").style.display = "block";
        document.querySelector(".grandeGanho").style.opacity = "1";
        count(0, 100, "cont1");
      }, 1000);
    }

    countSpins++;
  }, 3000); // 4 segundos para a terceira coluna
});

// Função para parar a rotação, aplicando a posição correta para rotação para baixo
function stopSpin(column, index) {
  column.style.animation = "none"; // Remove a animação de rotação
  // Alterado para girar para baixo
  column.style.transition = "transform 0.5s ease-out"; // Adicionando transição suave
  column.style.transform = `translateY(${positions[countSpins][index]})`; // Movendo para a posição correta
}

// Função de contagem
function count(start, finish, div) {
  let count = parseInt(start);
  const interval = 70; // Intervalo para animação

  const counterElement = document.getElementById(div);

  const intervalId = setInterval(() => {
    count++;
    counterElement.textContent = count + "%";

    if (count == 1) {
      document.querySelector(".grandeGanho").classList.add("explode");
      coinsSound.play();
      levelupSound.play();
    }
    if (count == 10) {
      document.querySelector(".grandeGanho").classList.remove("explode");
    }

    if (count >= parseInt(finish)) {
      clearInterval(intervalId);
    }
    if (count == 45) {
      document.querySelector("#grandeGanhoImg").style.display = "none";
      document.querySelector("#megaGanhoImg").style.display = "block";
      document.querySelector(".grandeGanho").classList.add("explode");
      document.querySelector(".grandeGanho").style.backgroundColor =
        "rgba(0,0,0,0.9)";
      document.querySelector(".bgGanho").classList.add("mixed");
      spinSound2.play();
      levelupSound2.play();
    }
    if (count == 70) {
      document.querySelector(".grandeGanho").classList.remove("explode");
      document.querySelector(".btnFim").style.display = "block";
    }
    if (count == 100) {
      document
        .querySelector(".grandeGanho")
        .classList.add("explode", "pinkBright");
      document.querySelector("#megaGanhoImg").style.display = "none";
      document.querySelector("#superMegaGanhoImg").style.display = "block";
      counterElement.textContent = "Bônus de 100%";
      document.querySelector(".contador").classList.remove("shake");
      document.querySelector(".contador").classList.add("contadorFinal");
      fogosSound.play();
      bigWinSound.play();
      document.querySelector(".btnFim").style.opacity = "1";
    }
  }, interval);
}
