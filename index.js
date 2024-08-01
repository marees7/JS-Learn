roundsSelect = document.querySelector('#roundsSelect')
roundSelectContainer = document.querySelector('#roundSelectContainer')
errorMessage = document.querySelector('#errorMessage')
popup = document.querySelector('#popup')
closeButton = document.querySelector('#closeButton')

playButton = document.querySelector('#playButton')
nextRoundButton = document.querySelector('#nextRoundButton')
initButton = document.querySelector('#initButton')

gameControls = document.querySelectorAll('.gameControls')
userControls = document.querySelectorAll('.userControls')
computerControls = document.querySelectorAll('.computerControls')

roundID = document.querySelector('#roundID')
roundSpan = roundID.querySelector('span')

countDown = document.querySelector('#countDown')

userScore = document.querySelector('#userScore')
userFirework = document.querySelector('#userFirework')

computerScore = document.querySelector('#computerScore')
computerFirework = document.querySelector('#computerFirework')

isGameStarted = false
numberOfRounds = undefined
currentRound = undefined

LONG_DELAY = 1300
DELAY = 1000
SHORT_DELAY = 300

init();

function init(params) {
    isGameStarted = false
    userScore.innerText = "0"
    computerScore.innerText = "0"

    show([roundSelectContainer, playButton])
    hide([countDown, roundID, nextRoundButton, initButton])
    errorMessage.innerText = ''
    roundsSelect.value = "5"
}

function startGame() {
    if (roundsSelect.value === '') {
        errorMessage.innerText = 'Please select no of rounds above'
        setTimeout(() => {
            errorMessage.innerText = '' 
        }, LONG_DELAY);
        return
    }
    numberOfRounds = +roundsSelect.value
    isGameStarted = true

    hide([roundSelectContainer, playButton])
    show([countDown, roundID])

    currentRound = 1
    countDown.innerText = "4"
    addClasses([countDown], ['animate-[bounce_1s_ease-in-out_infinite]'])
    triggerCountDown()
}

function triggerCountDown() {
    if (+countDown.innerText > 1) {
        countDown.innerText = +countDown.innerText - 1
        setTimeout(() => {
            triggerCountDown()
        }, DELAY);
    } else {
        countDown.innerText = 'Go!!!'
        removeClasses([countDown], ['animate-[bounce_1s_ease-in-out_infinite]'])

        enable(gameControls)
    }
}

function select(userInput) {
    let computerInput = Math.floor(Math.random() * 3)+ 1

    disable(gameControls, SHORT_DELAY)
    if (userInput === computerInput) {
        countDown.innerText = 'Match Draw !!!'
    } else if (
        (userInput == 1 && computerInput === 3) ||
        (userInput === 2 && computerInput === 1) || 
        (userInput === 3 && computerInput === 2)
    ){
        updateScore(userScore)
        show([userFirework])
        hide([userFirework], DELAY)
    } else {
        updateScore(computerScore)
        show([computerFirework])
        hide([computerFirework], DELAY)
    }

}

function updateScore(element) {
    countDown.innerText = ""
    element.innerText = +userScore.innerText+1
}

function enable(elements, delay) {
    setTimeout(() => {
        elements.forEach(element => {
            element.disabled = false
        }); 
    }, delay?delay:0);
}

function disable(elements) {
    setTimeout(() => {
        elements.forEach(element => {
            element.disabled = true
        });
    }, delay?delay:0);
}

function openPopup() {
    removeClasses([popup], ['hidden'])
}

function closePopup() {
    addClasses([popup], ['hidden'])
}

function addClasses(elements, classes) {
    elements.forEach(element => {
        classes.forEach(className => {
            element.classList.add(className)
        });
    });
}

function removeClasses(elements, classes) {
    elements.forEach(element => {
        classes.forEach(className => {
            element.classList.remove(className)
        });
    });
}

function show(elements) {
    elements.forEach(element => {
        element.classList.remove('hidden')
    });
}

function hide(elements, delay) {
    setTimeout(() => {
        elements.forEach(element => {
            element.classList.add('hidden')
        }); 
    }, delay?delay:0);
}

function displayError(message) {
    errorMessage.innerText = message
    setTimeout(() => {
        errorMessage.innerText = '' 
    }, LONG_DELAY);
}