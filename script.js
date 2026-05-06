const input = document.getElementById("input");
const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");

const hint = document.getElementById("hint");
const attemptsText = document.getElementById("attempts");
const result = document.getElementById("result");
const correctNumberEl = document.getElementById("correctNumber");
const leaderboard = document.getElementById("leaderboard");

const card = document.getElementById("card");

const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

let randomNumber;
let attempts;
const maxAttempts = 10;

function startGame(){
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    hint.textContent = "";
    result.textContent = "";
    input.value = "";
    card.classList.remove("flip");
    attemptsText.textContent = `Attempts Left: ${maxAttempts}`;
}

submitBtn.addEventListener("click", () => {
    let userValue = Number(input.value);
    if(!userValue) return;

    attempts++;

    if(userValue === randomNumber){
        result.textContent = "🎉 You Win!";
        correctNumberEl.textContent = randomNumber;
        card.classList.add("flip");
        winSound.play();
        saveScore(attempts);
    }
    else if(attempts >= maxAttempts){
        result.textContent = "😢 You Lose!";
        correctNumberEl.textContent = randomNumber;
        card.classList.add("flip");
        loseSound.play();
    }
    else{
        if(userValue < randomNumber){
            hint.textContent = "Think Higher ⬆️";
        } else {
            hint.textContent = "Think Lower ⬇️";
        }
    }

    attemptsText.textContent = `Attempts Left: ${maxAttempts - attempts}`;
    input.value = "";
});

restartBtn.addEventListener("click", startGame);

function saveScore(score){
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(score);
    scores.sort((a,b)=>a-b);
    scores = scores.slice(0,5);
    localStorage.setItem("scores", JSON.stringify(scores));
    showLeaderboard();
}

function showLeaderboard(){
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    leaderboard.innerHTML = "";
    scores.forEach((s,i)=>{
        let li = document.createElement("li");
        li.textContent = `#${i+1} - ${s} attempts`;
        leaderboard.appendChild(li);
    });
}

startGame();
showLeaderboard();