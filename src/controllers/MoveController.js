const { saveMove, readMove } = require('../services/persistence')
const { yourTurn, validGame, filledPosition, validPosition, initialTurn } = require('../services/verifications')
const { finish } = require('../services/game')

module.exports = {
    async store(req, res){
        
        const valid = validGame(req.params.id, req.body.id)
        let file = []
        let isTurn = true
        let position = true

        try{
            file = JSON.parse(readMove())
            isTurn = yourTurn(file, req.body)
            position = filledPosition(file, req.body)
        }catch(e){
            if (valid) isTurn = initialTurn(req.params.id, req.body)
        }

        
        if(valid){
            if(isTurn){
                if(position && validPosition(req.body)){
                    const moves = file.concat([req.body])
            
                    await saveMove(JSON.stringify(moves))
                    const finalMsg = finish(moves, req.params.id)

                    if(!finalMsg){
                        res.status(200).json({
                            msg: "Posição preenchida."
                        })              
                    }else {
                        res.status(200).json(finalMsg)
                    }
                    
                }else res.status(400).json({
                    msg: "Posição já preenchida ou inválida"
                })
            }else{
                return res.status(400).json({
                    msg: "Não é turno do jogador"
                })
            }
        }else{
            return res.status(400).json({
                msg: "Partida não encotrada"
            })
        }
    }
}