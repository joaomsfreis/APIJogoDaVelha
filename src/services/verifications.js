const { readGame } = require('./persistence')

function filterMoveByID(file, id){
    return file.filter(res => {
        return res.id === id 
    })
}

module.exports = {
    yourTurn(file, move){
        const fileById = filterMoveByID(file, move.id)

        return fileById[fileById.length-1].player !== move.player
    },

    validGame(idParams, idBody){
        
        let gameById = []
        
        try{
            gameById = JSON.parse(readGame()).filter(res => {
                return res.id === idParams
            })
        }catch(e){}

        return gameById.length !== 0 && idParams === idBody
    },

    filledPosition(file, move){
        const fileById = filterMoveByID(file, move.id)
        const filterByPosition = fileById.filter(res => {
            return (res.position.x === move.position.x && res.position.y === move.position.y)
        })

        return filterByPosition.length === 0
    },

    validPosition(move){
        const {x, y} = move.position
        return (x <= 2 && x >= 0 && y <= 2 && x >= 0)
    },

    initialTurn(idParams, move){
        let gameById = []
        
        try{
            gameById = JSON.parse(readGame()).filter(res => {
                return res.id === idParams
            })
        }catch(e){}

        return gameById[0].firstPlayer === move.player && idParams === move.id
    }





    
}