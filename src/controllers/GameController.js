const { saveGame, readGame } = require('../services/persistence')

module.exports = {
    store(req, res){
        const id = Math.floor(Math.random() * 100000000000000) +""
        const firstPlayer = Math.floor(Math.random() * 2) ? "X" : "Y"
        
        let file = []
        try{
            file = JSON.parse(readGame())
        }catch(e){
            console.log('Arquivo vazio!')
        }
        
        const game = {
            id,
            firstPlayer
        }

        const games = file.concat([game])

        saveGame(JSON.stringify(games))
        return res.json(game)                
    }
}