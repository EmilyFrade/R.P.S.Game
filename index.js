document.querySelector('.rock')
    .addEventListener('click', () => {
        gameRound('✊');
    });

document.querySelector('.paper')
    .addEventListener('click', () => {
        gameRound('✋');
    });

document.querySelector('.scissors')
    .addEventListener('click', () => {
        gameRound('✌️');
    });

document.querySelector('.resetScore')
    .addEventListener('click', () => {
        resetScore();
    });

document.querySelector('.autoPlay')
    .addEventListener('click', () => {
        autoPlay();
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        gameRound('✊');
    } else if (event.key === 'p') {
        gameRound('✋');
    } else if (event.key === 's') {
        gameRound('✌️');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        resetScore();
    }
})

let youPicked = '';

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

document.querySelector('.score').innerHTML = `Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`;

function gameRound(youPicked) {
    let ComputerPicked = Math.ceil(Math.random() * 3);
    let result = '';

    if (ComputerPicked === 1) {
        ComputerPicked = '✊';

        if (youPicked === '✌️') {
            result = 'You lose.';
        } 
        else if (youPicked === '✋') {
            result = 'You win.';
        } 
        else {
            result = 'Tie!';
        }
    } 

    else if (ComputerPicked === 2) {
        ComputerPicked = '✋';

        if (youPicked === '✌️') {
            result = 'You win.';
        } 
        else if (youPicked === '✊') {
            result = 'You lose.';
        } 
        else {
            result = 'Tie!';
        }
    } 

    else {
        ComputerPicked = '✌️';

        if (youPicked === '✋') {
            result = 'You lose.';
        } 
        else if (youPicked === '✊') {
            result = 'You win.';
        } 
        else {
            result = 'Tie!';
        }
    }

    if (result === 'You win.') {
        ++score.wins 
    } 
    else if (result === 'You lose.') {
        ++score.losses 
    }
    else if (result === 'Tie!') {
        ++score.ties 
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.score').innerHTML = `<p>${result}</p>
    <p>You ${youPicked} x ${ComputerPicked} Computer</p>
    <p>Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}</p>`
}

function resetScore() {
    document.querySelector(".confirmation")
        .innerHTML = "Are you sure you want to reset the score? <button class='yes'>Yes</button> <button class='no'>No</button>";
    
    document.querySelector('.yes')
        .addEventListener('click', () => {
            document.querySelector('.score').innerHTML = `Wins: 0 - Losses: 0 - Ties: 0`;
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            document.querySelector(".confirmation").innerHTML = "";
        });

    document.querySelector('.no')
        .addEventListener('click', () => {
            document.querySelector(".confirmation").innerHTML = "";
        });
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    document.querySelector(".autoPlay").innerHTML = "Stop Playing";

    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            youPicked = Math.ceil(Math.random() * 3);
            
            if (youPicked === 1) {
                youPicked = '✊';
            } else if (youPicked === 2) {
                youPicked = '✋';
            } else { 
                youPicked = '✌️';
            }

            gameRound(youPicked);
        }, 1000);

        isAutoPlaying = true;
        
    } else {
        document.querySelector(".autoPlay").innerHTML = "Auto Play";
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}