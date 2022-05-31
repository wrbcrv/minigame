const arrayElements = document.querySelectorAll('.grid-item')
const msgContainer = document.querySelector('.msg-container')
const restartButton = document.querySelector('#button')
const helpButton = document.querySelector('.help-button')
const helpContainer = document.querySelector('.help-container')
const closeHelpBttn = document.querySelector('#close')
let showScore = document.querySelector('#score')
let showAttemps = document.querySelector('#attemps')
let showBoxScore = document.querySelector('#msg-score')
let score
let attemps

function startGame() {
    setTimeout(() => {
        arrayElements.forEach((elements, i) => {
            setTimeout(() => {
                elements.classList.add('reveal')
            }, 240 * i)
        })
    }, 3000);

    getRandomNumber = Math.floor(Math.random() * arrayElements.length)
    attemps = 2
    score = 0

    for (let pos = 0; pos < arrayElements.length; pos++) {
        arrayElements[pos].addEventListener('click', () => {
            showAttemps.innerHTML = `Tentativas: ${attemps}`

            if (pos === getRandomNumber) {
                score += 500
                showScore.innerHTML = `Score: ${score}`

                for (let i = 0; i < arrayElements.length; i++) {
                    arrayElements[i].disabled = true
                }

                arrayElements[pos].className = arrayElements[pos].className.replace(' green', '')
                arrayElements[pos].className += ' green'

                winGameSound()
                winGame()
            } else {
                attemps--
                arrayElements[pos].disabled = true

                if (attemps < 0) {
                    for (let j = 0; j < arrayElements.length; j++) {
                        arrayElements[j].disabled = true
                    }

                    msgContainer.classList.add('show')
                    restartButton.addEventListener('click', () => {
                        msgContainer.classList.remove('show')
                        restartGame()
                    })
                }

                if (score == 0) 
                    showBoxScore.innerHTML = `${score}`
                else
                    showBoxScore.innerHTML = `-${score}`

                arrayElements[pos].className = arrayElements[pos].className.replace(' red', '')
                arrayElements[pos].className += ' red'
		        looseGameSound()
            }
        })
    }
}

function winGame() {
    getRandomNumber = Math.floor(Math.random() * arrayElements.length)

    setTimeout(() => {
        for (let i = 0; i < arrayElements.length; i++) {
            arrayElements[i].classList.remove('green')
            arrayElements[i].classList.remove('red')
            arrayElements[i].disabled = false
            attemps = 0
            attemps += 2
            resetStatus()
        }
    }, 3000);
}

function restartGame() {
    getRandomNumber = Math.floor(Math.random() * arrayElements.length)
    
    for (let i = 0; i < arrayElements.length; i++) {
        arrayElements[i].classList.remove('green')
        arrayElements[i].classList.remove('red')
        arrayElements[i].disabled = false
        attemps = 0
        attemps += 2
        score = 0
        resetStatus()
    }
}

function showHelp() {
    helpContainer.classList.add('show')

    window.onclick = (event) => {
        if (event.target == helpContainer)
            helpContainer.classList.remove('show')
    }

    closeHelpBttn.onclick = () => {
        helpContainer.classList.remove('show')
    }
}

function winGameSound() {
    let winSound = new Audio('audio/winGame.wav')
    winSound.play()
}

function looseGameSound() {
    let looseSound = new Audio('audio/looseGame.wav')
    looseSound.play()
}

function resetStatus() {
    showScore.innerHTML = `Score: ${score}`
    showAttemps.innerHTML = `Tentativas: ${attemps + 1}`
}