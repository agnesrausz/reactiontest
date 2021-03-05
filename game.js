initGame();
let scoreBoard = [];
let roundsResult = {};

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    initLeftClick();
    initCrossHair();
    setTimeout(() => {
        animationGameTitleIn();
    }, 150);
}

function initLeftClick() {
    let cells = document.querySelectorAll(".col");
    for (let cell of cells) {
        cell.addEventListener("click", leftClick);
    }
    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", clickOnStart);
    let againButton = document.querySelector(".again-button");
    againButton.addEventListener("click", clickOnAgain);
    let scoreButton = document.querySelector(".score-button");
    scoreButton.addEventListener("click", clickOnScoreBoard);
    let backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", clickOnBack);
}

function animationGameTitleIn() {
    let title = document.querySelector(".title");
    title.classList.add("animate__fadeInDownBig");
}

function leftClick(event) {
    let clickTime = Date.now(),
        cell = event.currentTarget;
    if (cell.classList.contains("target")) {
        let roundCurrent = "Round" + event.currentTarget.dataset.round.toString(),
            showTime = sessionStorage.getItem("showTime");
        // localStorage.setItem(roundCurrent, clickTime - showTime);
        roundsResult [roundCurrent] = clickTime - showTime;
        cell.classList.add("hit-bg");
        setTimeout(() => {
            cell.classList.remove("hit-bg");
        }, 150);
    } else {
        cell.classList.add("miss-bg");
        setTimeout(() => {
            cell.classList.remove("miss-bg");
        }, 150);
    }
}

function clickOnStart() {
    animationStartButtonMoveOut();
    animationScoreButtonMoveOut();
    startGame();
}

function clickOnAgain() {
    animationAgainButtonMoveOut();
    animationResultsMoveOut();
    setTimeout(() => {
        animationGameMoveIn();
        animationStartButtonMoveIn();
        animationScoreButtonMoveIn();
    }, 1000);
}

function clickOnScoreBoard() {
    animationStartButtonMoveOut();
    animationScoreButtonMoveOut();
    animationGameMoveOut();
    setScoreBoard();
    animationScoreBoardMoveIn();
    animationBackButtonMoveIn();
}

function clickOnBack() {
    animationScoreBoardMoveOut();
    animationBackButtonMoveOut()
    animationScoreButtonMoveIn()
    animationGameMoveIn();
    animationStartButtonMoveIn();
}

function gameOver() {
    animationGameMoveOut();
    setTimeout(() => {
        animationResultsMoveIn();
        animationAgainButtonMoveIn();
    }, 1000)
    setResults();
}

function animationScoreBoardMoveIn() {
    let container3 = document.querySelector(".container3"),
        container = document.querySelector(".container");
    container3.style.display = "block";
    container.style.display = "none";
    container3.classList.remove("animate__fadeOutRightBig");
    container3.classList.add("animate__fadeInRightBig");
}

function animationScoreBoardMoveOut() {
    let container3 = document.querySelector(".container3");
    container3.classList.remove("animate__fadeInRightBig");
    container3.classList.add("animate__fadeOutRightBig");
}

function setScoreBoard() {
    let container3 = document.querySelector(".container3");
    // first clear scoreboard
    while (container3.firstChild) {
        container3.removeChild(container3.lastChild);
    }
    for (let score of scoreBoard) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = "<div>" + `${score[0]}` + " " + `${score[1]}` + " points</div>";
        container3.insertAdjacentElement(
            'beforeend',
            tempDiv);
    }
}
function animationBackButtonMoveIn() {
    let backButton = document.querySelector(".back-button"),
        startButton = document.querySelector(".start-button");
    startButton.style.display = "none";
    backButton.style.display = "inline-block";
    backButton.classList.remove("animate__fadeOutDownBig");
    backButton.classList.add("animate__fadeInUpBig");
}

function animationBackButtonMoveOut() {
    let backButton = document.querySelector(".back-button");
    backButton.classList.remove("animate__fadeInUpBig");
    backButton.classList.add("animate__fadeOutDownBig");
}
function animationScoreButtonMoveOut() {
    let scoreButton = document.querySelector(".score-button");
    scoreButton.classList.remove("animate__fadeInDownBig");
    scoreButton.classList.add("animate__fadeOutUpBig");
}

function animationScoreButtonMoveIn() {
    let scoreButton = document.querySelector(".score-button");
    scoreButton.classList.remove("animate__fadeOutUpBig");
    scoreButton.classList.add("animate__fadeInDownBig");
}

function animationAgainButtonMoveIn() {
    let againButton = document.querySelector(".again-button"),
        startButton = document.querySelector(".start-button");
    startButton.style.display = "none";
    againButton.style.display = "inline-block";
    againButton.classList.remove("animate__fadeOutDownBig");
    againButton.classList.add("animate__fadeInUpBig");
}

function animationAgainButtonMoveOut() {
    let againButton = document.querySelector(".again-button");
    againButton.classList.remove("animate__fadeInUpBig");
    againButton.classList.add("animate__fadeOutDownBig");
}

function animationStartButtonMoveIn() {
    let startButton = document.querySelector(".start-button"),
        backButton = document.querySelector(".back-button"),
        againButton = document.querySelector(".again-button");
    againButton.style.display = "none";
    backButton.style.display = "none";
    startButton.classList.remove("animate__fadeOutDownBig");
    startButton.classList.add("animate__fadeInUpBig");
    startButton.style.display = "inline-block";
}

function animationStartButtonMoveOut() {
    let startButton = document.querySelector(".start-button");
    startButton.classList.remove("animate__fadeInUpBig");
    startButton.classList.add("animate__fadeOutDownBig");

}

function animationGameMoveOut() {
    let container = document.querySelector(".container");
    container.classList.remove("animate__fadeInLeftBig");
    container.classList.add("animate__fadeOutLeftBig");
}

function animationResultsMoveIn() {
    let container2 = document.querySelector(".container2"),
        container = document.querySelector(".container");
    container2.style.display = "block";
    container.style.display = "none";
    container2.classList.remove("animate__fadeOutRightBig");
    container2.classList.add("animate__fadeInRightBig");
}

function animationResultsMoveOut() {
    let container2 = document.querySelector(".container2");
    container2.classList.remove("animate__fadeInRightBig");
    container2.classList.add("animate__fadeOutRightBig");
}

function animationGameMoveIn() {
    let container = document.querySelector(".container"),
        container2 = document.querySelector(".container2"),
        container3 = document.querySelector(".container3");
    container2.style.display = "none";
    container3.style.display = "none";
    container.style.display = "grid";
    container.classList.remove("animate__fadeOutLeftBig");
    container.classList.add("animate__fadeInLeftBig");
}

function initCrossHair() {
    let main = document.querySelector(".main");
    main.style.cursor = "cell";
}

function setRound(round) {
    let cells = document.querySelectorAll(".col");
    for (let cell of cells) {
        cell.dataset.round = round;
    }
}

function setResults() {
    let results = allResults(),
        points = 0;
    for (const [index, result] of results.entries()) {
        let actualRow = document.querySelector(`tbody tr:nth-child(${index + 1})`),
            firstCell = actualRow.querySelector('td:nth-child(1)'),
            actualPoint = parseInt(result[2]);
        if (actualPoint !== 3) {
            actualPoint /= 1000;
            points += actualPoint;
        } else {
            points += actualPoint
        }
        firstCell.innerHTML = "<td>" + (result[0]) + "</td>";
        let secondCell = actualRow.querySelector('td:nth-child(2)');
        secondCell.innerHTML = "<td>" + (result[1]) + "</td>";
        let thirdCell = actualRow.querySelector('td:nth-child(3)');
        thirdCell.innerHTML = "<td>" + actualPoint.toString() + "</td>";
    }
    let lastRow = document.querySelector(`tbody tr:last-child`),
        firstCell = lastRow.querySelector('td:nth-child(1)'),
        lastCell = lastRow.querySelector('td:nth-child(3)');
    firstCell.innerHTML = "<td>Points</td>";
    lastCell.innerHTML = "<td>" + points.toFixed(3).toString() + "</td>";
    let playerName = prompt("Please enter your name");
    if (playerName != null) {
        let tempScore = [playerName, points.toFixed(3)];
        refreshScoreBoard(tempScore);
    }
}

function refreshScoreBoard(newScore) {
    scoreBoard.push(newScore);
    scoreBoard.sort(function(a, b) {
        return a[1] - b[1];
    })
}

function startGame() {
    let cells = document.getElementsByClassName("col"),
        round = 0;
    // localStorage.clear();
    roundsResult = {};
    sessionStorage.clear();
    const interval = setInterval(function () {
        if (round === 9) {
            clearInterval(interval);
            setTimeout(() => {
                gameOver();
            }, 1500)

        }
        setRound(round);
        const targetCell = document.querySelector(".target");
        if (targetCell !== null && targetCell.classList.contains("target")) {
            targetCell.classList.remove("target");
        }
        let randomNum = (Math.random() * cells.length) | 0;
        cells[randomNum].classList.add("target-bg", "target");
        // start timer
        let showTime = Date.now();
        sessionStorage.setItem("showTime", showTime);
        setTimeout(() => {
            cells[randomNum].classList.remove("target-bg");
        }, 250)
        round += 1;
    }, 1500)
}

function allResults() {
    let results = [],
        counter = 0;
    for (let index = 0; index < 10; index++) {
        let key = "Round" + index.toString(),
            tempArray = [];
        // if (localStorage.hasOwnProperty(key)) {
        if (key in roundsResult) {
            // tempArray.push(counter + 1, "Hit", localStorage.getItem(key))
            tempArray.push(counter + 1, "Hit", roundsResult[key])
        } else {
            tempArray.push(counter + 1, "Miss", "3")
        }
        counter += 1;
        results.push(tempArray);
    }
    return results;
}