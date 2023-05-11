window.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');
    const playBtn = document.querySelector('.play-btn');
    const selectedBlocks = [];
    let attempts = 3;
    let gameWon = false;
    let score = 0;
    let gameInProgress = false;
    let canPlay = true;

    function showMessage(message) {
        const messageDiv = document.querySelector('.message');
        messageDiv.style.display = 'block';
        messageDiv.offsetTop;
        messageDiv.style.top = '0';
        messageDiv.textContent = message;
        messageDiv.classList.add('message-show');
        canPlay = false;

        setTimeout(function () {
            messageDiv.style.top = '-50px';
            setTimeout(function () {
                messageDiv.style.display = 'none';
                messageDiv.classList.remove('message-show');
                canPlay = true;
            }, 500);
        }, 3000);
    }

    function updateScore() {
        const scoreElement = document.querySelector('.score');
        scoreElement.textContent = `${score}`;
    }

    function startGame() {
        selectedBlocks.length = 0;
        attempts = 3;
        gameWon = false;

        blocks.forEach(block => {
            block.classList.remove('green', 'red', 'clicked');
            block.addEventListener('click', blockClickHandler);
        });

        selectBlocks();

        playBtn.textContent = 'Jogar';
        playBtn.classList.remove('play-again-btn');
    }

    function selectBlocks() {
        while (selectedBlocks.length < 3) {
            const index = Math.floor(Math.random() * 9);
            if (!selectedBlocks.includes(index)) {
                selectedBlocks.push(index);
            }
        }
    }

    function blockClickHandler() {
        if (gameWon || this.classList.contains('clicked')) return;
        this.classList.add('clicked');
        const index = Array.from(blocks).indexOf(this);
        if (selectedBlocks.includes(index)) {
            this.classList.add('green');
            winGameSound();

            selectedBlocks.splice(selectedBlocks.indexOf(index), 1);
            if (selectedBlocks.length === 0) {
                gameWon = true;
                score += 500;
                updateScore();

                blocks.forEach(block => {
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
                selectedBlocks.forEach(index => {
                    blocks[index].classList.add('green');
                    blocks[index].classList.remove('red');
                });

                blocks.forEach(block => {
                    block.removeEventListener('click', blockClickHandler);
                });

                showMessage('Você perdeu!');

                playBtn.textContent = 'Tentar novamente';
                playBtn.classList.add('play-again-btn');
                gameInProgress = false;
            }
        }
    }

    playBtn.addEventListener('click', function () {
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