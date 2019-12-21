const { readMove } = require('./persistence')


function fillBoard(file, id) {

    let board = [["a", "a", "a"], ["a", "a", "a"], ["a", "a", "a"]]
    const fileById = file.filter(res => {
        return res.id === id
    })

    for (let i = 0; i < fileById.length; i++) {
        board[fileById[i].position.x][fileById[i].position.y] = fileById[i].player
    }

    return board
}

function checkWinner(board) {
    let winner = "a"
    if ((board[0][2] === board[0][1] && board[0][2] === board[0][0]) ||
        (board[0][2] === board[1][2] && board[0][2] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[0][2] === board[2][0]) && board[0][2] !== "a") {
        winner = board[0][2]
    } else if ((board[1][1] === board[1][2] && board[1][1] === board[1][0]) ||
        (board[1][1] === board[0][1] && board[1][1] === board[2][1]) ||
        (board[1][1] === board[2][2] && board[1][1] === board[0][0]) && board[1][1] !== "a") {
        winner = board[1][1]
    } else if ((board[2][0] === board[1][0] && board[2][0] === board[0][0]) ||
        (board[2][0] === board[2][2] && board[2][0] === board[2][1]) && board[2][0] !== "a") {
        winner = board[2][0]
    }

    return winner
}

function checkFinish(board) {
    let complete = true
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === "a") complete = false
        }
    }
    return complete
}

module.exports = {
    finish(file, id) {
        const board = fillBoard(file, id)
        const winner = checkWinner(board)
        if (winner !== "a") {
            return {
                msg: "Partida finalizada",
                winner
            }
        } else if (checkFinish(board)) {
            return {
                status: "Partida finalizada",
                winner: "draw"
            }
        }
        return false
    }
}  
