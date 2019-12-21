const { saveMove, readMove } = require('../services/persistence')
const { yourTurn, validGame, filledPosition } = require('../services/verifications')

module.exports = {
    store(req, res){
        
        const valid = validGame(req.params.id, req.body.id)
        let file = []
        let isTurn = true
        let position = true

        try{
            file = JSON.parse(readMove())
            isTurn = yourTurn(file, req.body)
            position = filledPosition(file, req.body)
        }catch(e){
            console.log('Arquivo vazio!')
        }

        console.log(position)
        
        if(valid){
            if(isTurn){
                if(position){
                    const moves = file.concat([req.body])
            
                    saveMove(JSON.stringify(moves))
                    res.status(200).json({teste: "teste"})              
                }else res.json({
                    msg: "Posição já preenchida"
                })
            }else{
                return res.json({
                    msg: "Não é turno do jogador"
                })
            }
        }else{
            return res.json({
                msg: "Partida não encotrada"
            })
        }
    }
}