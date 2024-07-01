const input = document.getElementById("input");
const nameBtn = document.getElementById("nameBtn");
const display = document.getElementById('timer');



document.getElementById("nameBtn").addEventListener("click", () => {
    const input = document.getElementById("input");
    const messageDiv = document.getElementById("message");
    const messageSpan = document.getElementById("message1");
    const messageSpan2 = document.getElementById("message2");
    messageDiv.textContent = `Thank you for playing ${input.value}.`;
    messageSpan.textContent = `Let's start playing the Rock Paper Scissors game`;
   
    setTimeout(() => {
        messageDiv.textContent = "";
    }, 5000);
    setTimeout(() => {
        messageSpan.textContent = "";
    }, 5000);

    setTimeout(() => {
        messageSpan2.textContent = `${input.value} Playing`;
    }, 5000);
    input.addEventListener("input", () => {
        messageSpan2.textContent = "";
    });

});

let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lost: 0,
    tie: 0
};
updateScoreElement();

const playGame = (yourMove) => {
    const computerMove = pickComputerMove();

    let result = '';

    if (yourMove === 'ROCK') {
        if (computerMove === 'ROCK') {
            result = 'Tie.';
        }   else if (computerMove === 'PAPER') {
            result = 'You Lost.';
        }   else if (computerMove === 'SCISSORS') {
            result = 'You Win.';
        } 
    } else if (yourMove === 'PAPER') {
        if (computerMove === 'ROCK') {
            result = 'You Win.';
        }   else if (computerMove === 'PAPER') {
            result = 'Tie.';
        }   else if (computerMove === 'SCISSORS') {
            result = 'You Lost.';
        }
    } else if (yourMove === 'SCISSORS') {
        if (computerMove === 'ROCK') {
            result = 'You Lost.';
        }   else if (computerMove === 'PAPER') {
            result = 'You Win.';
        }   else if (computerMove === 'SCISSORS') {
            result = 'Tie.';
        }
    }

    if(result === 'You Win.') {
        score.win += 1;
    } else if(result === 'You Lost.'){
        score.lost += 1;
    } else if (result === 'Tie.') {
        score.tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You Choose ${yourMove} And  Computer Choose ${computerMove} !`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `&nbsp WIN: ${score.win} &nbsp&nbsp LOST: ${score.lost} &nbsp &nbsp TIE: ${score.tie}`;
}

const resetScore = () => {
    score.win = 0;
    score.lost = 0;
    score.tie = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

const pickComputerMove = () => {
    const randomNum =  Math.random();

    let computerMove = '';

    if (randomNum >= 0 && randomNum < 1 /3) {
        computerMove = 'ROCK';
    }   else if (randomNum >= 1/3 && randomNum < 2 /3) {
        computerMove = 'PAPER';
    }   else if (randomNum >= 2/3 && randomNum < 3 /3) {
        computerMove = 'SCISSORS';
    }
    return computerMove;
} 

let countdownTime = 30; 

// To start the timer
const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        
        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "Time's up!";
            const result = document.querySelector('.js-result').textContent.toLowerCase();
            if (result.includes("win")) {
                playVoiceMessage(`Congratulations! You win ${input.value}`);
            } else if (result.includes("lost")) {
                playVoiceMessage(`Sorry, you lost ${input.value}`);
            } else if (result.includes("tie")) {
                playVoiceMessage(`It's a tie ${input.value}`);
            } else {
                playVoiceMessage(`Game over,`);
            }
        }
    }, 1000);
}

// To stop the timer.
const stopTimer = () => {
    clearInterval(timerInterval);
}

// To play voice message.
const playVoiceMessage = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
}

startBtn.addEventListener("click", () => {
    startTimer(countdownTime, display);
});

stopBtn.addEventListener("click", () => {
    stopTimer();
});


