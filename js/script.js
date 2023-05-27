window.addEventListener('DOMContentLoaded', () => {
    const BLOCKS = document.querySelectorAll('.block');
    const PLAY_BTN = document.querySelector('.play-btn');
    const SELECTED_BLOCKS = [];
    let attempts = 3;
    let gameWon = false;
    let score = 0;
    let gameInProgress = false;
    let canPlay = true;

    function showMessage(message) {
        const MESSAGE_DIV = document.querySelector('.message');
        MESSAGE_DIV.style.display = 'block';
        MESSAGE_DIV.offsetTop;
        MESSAGE_DIV.style.top = '0';
        MESSAGE_DIV.textContent = message;
        MESSAGE_DIV.classList.add('message-show');
        canPlay = false;

        setTimeout(function () {
            MESSAGE_DIV.style.top = '-50px';
            setTimeout(function () {
                MESSAGE_DIV.style.display = 'none';
                MESSAGE_DIV.classList.remove('message-show');
                canPlay = true;
            }, 500);
        }, 3000);
    }

    function updateScore() {
        const SCORE_ELEMENT = document.querySelector('.score');
        SCORE_ELEMENT.textContent = `${score}`;
    }

    function startGame() {
        SELECTED_BLOCKS.length = 0;
        attempts = 3;
        gameWon = false;

        BLOCKS.forEach(block => {
            block.classList.remove('green', 'red', 'clicked');
            block.addEventListener('click', blockClickHandler);
        });

        selectBlocks();

        PLAY_BTN.textContent = 'Jogar';
        PLAY_BTN.classList.remove('play-again-btn');
    }

    function selectBlocks() {
        while (SELECTED_BLOCKS.length < 3) {
            const INDEX = Math.floor(Math.random() * 9);
            if (!SELECTED_BLOCKS.includes(INDEX)) {
                SELECTED_BLOCKS.push(INDEX);
            }
        }
    }

    function blockClickHandler() {
        if (gameWon || this.classList.contains('clicked')) return;
        this.classList.add('clicked');
        const INDEX = Array.from(BLOCKS).indexOf(this);
        if (SELECTED_BLOCKS.includes(INDEX)) {
            this.classList.add('green');
            winGameSound();

            SELECTED_BLOCKS.splice(SELECTED_BLOCKS.indexOf(INDEX), 1);
            if (SELECTED_BLOCKS.length === 0) {
                gameWon = true;
                score += 500;
                updateScore();

                BLOCKS.forEach(block => {
                    if (!block.classList.contains('clicked')) {
                        block.classList.add('red');
                    }
                    block.removeEventListener('click', blockClickHandler);
                });

                showMessage('Você venceu!');
                gameInProgress = false;
            }
        } else {
            this.classList.add('red');
            looseGameSound();

            attempts--;
            if (attempts === 0) {
                SELECTED_BLOCKS.forEach(index => {
                    BLOCKS[index].classList.add('green');
                    BLOCKS[index].classList.remove('red');
                });

                BLOCKS.forEach(block => {
                    block.removeEventListener('click', blockClickHandler);
                });

                showMessage('Você perdeu!');

                PLAY_BTN.textContent = 'Tentar novamente';
                PLAY_BTN.classList.add('play-again-btn');
                gameInProgress = false;
            }
        }
    }

    PLAY_BTN.addEventListener('click', function () {
        if (!canPlay)
            return;

        if (gameInProgress)
            return;

        gameInProgress = true;

        if (this.classList.contains('play-again-btn')) {
            startGame();
        } else {
            startGame();
            this.textContent = 'Jogar';
        }
    });
});

function winGameSound() {
    let winSound = new Audio('audio/winGame.wav')
    winSound.play()
}

function looseGameSound() {
    let looseSound = new Audio('audio/looseGame.wav')
    looseSound.play()
}