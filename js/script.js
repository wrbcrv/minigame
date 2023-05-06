window.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');
    const playBtn = document.querySelector('.play-btn');
    const selectedBlocks = [];
    let attempts = 3;
    let gameWon = false;

    function startGame() {
        selectedBlocks.length = 0;
        attempts = 3;
        gameWon = false;

        blocks.forEach(block => {
            block.classList.remove('green', 'red', 'clicked');
            block.addEventListener('click', blockClickHandler);
        });

        selectBlocks();
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

                blocks.forEach(block => {
                    if (!block.classList.contains('clicked')) {
                        block.classList.add('red');
                    }
                    block.removeEventListener('click', blockClickHandler);
                });

                showMessage('Você venceu!');
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
            }
        }
    }

    function showMessage(message) {
        const statusContainer = document.querySelector('.status-container');
        statusContainer.textContent = message;

        setTimeout(() => {
            statusContainer.textContent = '-';

            setTimeout(() => {
                messageContainer.remove();
            }, 500);
        }, 2000);
    }

    playBtn.addEventListener('click', startGame);
});

function winGameSound() {
    let winSound = new Audio('audio/winGame.wav')
    winSound.play()
}

function looseGameSound() {
    let looseSound = new Audio('audio/looseGame.wav')
    looseSound.play()
}