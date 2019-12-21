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
        }catch(e){
            
        }

        return gameById.length !== 0 && idParams === idBody
    },

    filledPosition(file, move){
        const fileById = filterMoveByID(file, move.id)
        const {x, y} = fileById[fileById.length-1].position

        return !(x === move.position.x && y === move.position.y)
    }





    
}