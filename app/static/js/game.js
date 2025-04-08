document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const playerScores = {
        'X': document.querySelector('.player-score:nth-child(1) .score'),
        'O': document.querySelector('.player-score:nth-child(2) .score')
    };
    let gameOver = false;
    let scores = { 'X': 0, 'O': 0 };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(e) {
        if (gameOver) return;

        const cell = e.target.closest('.cell');
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ row, col })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateBoard(data);
                if (data.game_over && data.winner) {
                    updateScores(data.winner);
                }
            }
        });
    }

    function updateBoard(data) {
        const board = data.board;
        cells.forEach(cell => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            const value = board[row][col];
            const cellContent = cell.querySelector('.cell-content');
            
            cellContent.textContent = '';
            cell.classList.remove('x', 'o');
            
            if (value) {
                cell.classList.add(value.toLowerCase());
            }
        });

        if (data.game_over) {
            gameOver = true;
            if (data.winner) {
                status.innerHTML = `<i class="fas fa-trophy"></i> Player ${data.winner} wins!`;
                status.parentElement.classList.remove('alert-info');
                status.parentElement.classList.add('alert-success');
            } else {
                status.innerHTML = `<i class="fas fa-handshake"></i> It's a draw!`;
                status.parentElement.classList.remove('alert-info');
                status.parentElement.classList.add('alert-warning');
            }
        } else {
            status.innerHTML = `<i class="fas fa-user"></i> Player ${data.current_player}'s turn`;
            status.parentElement.classList.remove('alert-success', 'alert-warning');
            status.parentElement.classList.add('alert-info');
        }
    }

    function updateScores(winner) {
        scores[winner]++;
        playerScores[winner].textContent = scores[winner];
        playerScores[winner].classList.add('score-updated');
        setTimeout(() => {
            playerScores[winner].classList.remove('score-updated');
        }, 1000);
    }

    function resetGame() {
        fetch('/reset', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                cells.forEach(cell => {
                    const cellContent = cell.querySelector('.cell-content');
                    cellContent.textContent = '';
                    cell.classList.remove('x', 'o');
                });
                status.innerHTML = `<i class="fas fa-user"></i> Player X's turn`;
                status.parentElement.classList.remove('alert-success', 'alert-warning');
                status.parentElement.classList.add('alert-info');
                gameOver = false;
            }
        });
    }
}); 