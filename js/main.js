const winnerCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let computerBox = false;
let board;
let turn = "X";
let win = null;

let boxes = Array.from(document.querySelectorAll("#board button"));
let turnElement = document.getElementsByClassName("turns");
let resultBox = document.getElementById("winner-result");
let winner = document.getElementById("winner");
let leaderBoard = document.getElementById("leaderboard");
let leaderBtn = document.getElementById("leaderboard_btn");
let tableBody = document.getElementById("tbody");
let lastMatch = document.getElementById("lastmatch");
function begin() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  win = null;
  resultBox.style.display = "none";
  boxes.forEach((box) => box.removeAttribute("disabled"));
  turnElement[0].classList.add("turn");
  turnElement[1].classList.remove("turn");
  render();
}

const toogleTurn = (i) => {
  let index;
  if (typeof i == "number") {
    index = i;
  } else {
    index = boxes.findIndex(function (square) {
      return square === event.target;
    });
  }
  board[index] = turn;
  boxes[index].setAttribute("disabled", true);

  if (typeof i !== "number") {
    setTimeout(() => {
      computerBox ? computer() : "";
    }, 100);
  }
  getWinner();
  setTurn();
  render();
};

const render = () => {
  board.forEach((e, i) => {
    boxes[i].innerText = e;
  });
};

const getWinner = () => {
  winnerCombo.forEach((combo) => {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      win = board[combo[0]] === "X" ? "one" : "two";
      resultBox.style.display = "flex";
      winner.innerText = `player "${win}" won`;
      updateLocal(win);
      localStorage.setItem("lastMatch", JSON.stringify(win));

      return;
    }
  });
  if (!board.includes("") && win == null) {
    win = "t";
    resultBox.style.display = "flex";
    winner.innerText = `The match was a Tie`;
    return;
  }
  console.log(board);
  return;
};

const setTurn = () => {
  if (turn === "X") {
    turn = "O";
    turnElement[1].classList.add("turn");
    turnElement[0].classList.remove("turn");
  } else {
    turn = "X";
    turnElement[0].classList.add("turn");
    turnElement[1].classList.remove("turn");
  }
};

const computer = () => {
  if (win) return;
  const random_number = Math.floor(Math.random() * 10) + 1;
  if (board[random_number] === "")
    return board.includes("") ? toogleTurn(random_number) : "";
  computer();
};

const choose = (robot) => {
  if (robot == "robot") {
    computerBox = true;
  }
  document.getElementById("choose").style.display = "none";
};
const closeLeader = () => {
  leaderBoard.style.display = "none";
};
const showLeader = () => {
  leaderBoard.style.display = "flex";
  let score = JSON.parse(localStorage.getItem("leaderboard"));
  let max = [];
  max.push(score[0]);
  score[1].wins > max[0].wins ? max.unshift(score[1]) : max.push(score[1]);
  let finalHtml = "";
  max.forEach((e) => {
    finalHtml += `  <tr>
            <td>${max.indexOf(e) + 1}</td>
            <td>Player ${e.player}</td>
            <td>${e.wins}</td>
          </tr>
    `;
  });
  tableBody.innerHTML = finalHtml;
};

const updateLocal = (player) => {
  let data = JSON.parse(localStorage.getItem("leaderboard"));
  data.forEach((e) => {
    if (e.player === player) {
      e.wins++;
    }
  });
  localStorage.setItem("leaderboard", JSON.stringify(data));
};

begin();
document.getElementById("board").addEventListener("click", toogleTurn);
document
  .getElementById("close_leaderboard")
  .addEventListener("click", closeLeader);
document
  .getElementById("leaderboard_btn")
  .addEventListener("click", showLeader);

let emptyLeaderboard = [
  {
    player: "one",
    wins: 0,
  },
  {
    player: "two",
    wins: 10,
  },
];
if (localStorage.getItem("leaderboard") === null) {
  localStorage.setItem("leaderboard", JSON.stringify(emptyLeaderboard));
}

if (localStorage.getItem("lastMatch") === null) {
  localStorage.setItem("lastMatch", JSON.stringify("none"));
}

let lastMatchWinner = JSON.parse(localStorage.getItem("lastMatch"));
lastMatchWinner === "none" ? (lastMatch.style.display = "none") : "";
document.getElementById("last-match-winner").innerText = lastMatchWinner;
