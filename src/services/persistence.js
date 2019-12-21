const fs = require('fs')
const fileGames = './db/games.json'
const fileMoves = './db/moves.json'

module.exports = {
    saveGame(game){
        fs.writeFile(fileGames, game, function(err){
            if(err){
                return console.log(err)
            }
        })
    },

    readGame(){
        const file = fs.readFileSync(fileGames)
        return file
    },
    
    saveMove(move){
        fs.writeFile(fileMoves, move, function(err){
            if(err){
                return console.log(err)
            }
        })
    },
    
    readMove(){
        const file = fs.readFileSync(fileMoves)
        return file
    }
    
}