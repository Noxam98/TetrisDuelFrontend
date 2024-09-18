import {initGameArray} from "./initField.js";
import tetramino from "./tetramino.js";
import _ from 'lodash'
// import {buffer} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements.js";


class Game {
    gameData = undefined
    gameField = undefined
    tetramino = tetramino
    currentPosition = undefined
    timeLastUpdateField = undefined

    constructor() {
        this.initGame()
    }

    initGame(){
        this.gameField = initGameArray()

        this.gameData = {
            linesToOpponent: 0,
            score: 0,
            tickInterval: 1000,
            gameOver: false,
            itsCombo: false,
            addingToScore: 1,
            buffer: {
                tetra: [[0,0,0],[0,0,0],[0,0,0]],
                posNullAvailable: true
            },

        }

        this.currentPosition = {x: 0, y: 4}

    }

    toBuffer(){
        this.fieldDidUpdated()
        if(!this.gameData.buffer.tetra.flat().some(i => i !== 0)){
            this.gameData.buffer.tetra = _.cloneDeep(this.tetramino.currentTetramino)
            this.nextTetramino()
            this.gameData.buffer.posNullAvailable = false

        }
        else {
            if (this.gameData.buffer.posNullAvailable)
                this.currentPosition = {x: 0, y: 4}
            const temp = _.cloneDeep(tetramino.currentTetramino)
            this.tetramino.setCurrentTetramino(this.gameData.buffer.tetra)
            this.gameData.buffer.tetra = temp
            this.gameData.buffer.posNullAvailable = false

        }
    }

    getGameFieldWithTetramino() {
        const gamefieldCopy = _.cloneDeep(this.gameField)


        let shadowPosition = _.cloneDeep(this.currentPosition)
        while (this.checkDownCollision(shadowPosition)) {
            shadowPosition.x++

        }




        for (let lineNumber = 0; lineNumber < tetramino.currentTetramino.length; lineNumber++)  //adding tetramino
            for (let squareNumber = 0; squareNumber < tetramino.currentTetramino[lineNumber].length; squareNumber++)
                if (tetramino.currentTetramino[squareNumber][lineNumber])
                    gamefieldCopy[shadowPosition.x + squareNumber][shadowPosition.y + lineNumber] = tetramino.currentTetramino[squareNumber][lineNumber] ? 4 : 0

        for (let lineNumber = 0; lineNumber < tetramino.currentTetramino.length; lineNumber++)  //adding tetramino
            for (let squareNumber = 0; squareNumber < tetramino.currentTetramino[lineNumber].length; squareNumber++)
                if (tetramino.currentTetramino[squareNumber][lineNumber])
                    gamefieldCopy[this.currentPosition.x + squareNumber][this.currentPosition.y + lineNumber] = tetramino.currentTetramino[squareNumber][lineNumber]



        return gamefieldCopy

    }


    fieldDidUpdated(){
        this.timeLastUpdateField = new Date().getTime()
        // console.log(this.timeLastUpdateField)
    }

    moveDown() {


        this.fieldDidUpdated()

        if (this.checkDownCollision()) {
            this.currentPosition.x += 1

        } else {

            this.freezeGameField(this.getGameFieldWithTetramino())
            this.destroyAllLines()
            this.nextTetramino()
            this.gameData.buffer.posNullAvailable = true

        }
    }

    fallDown(){
        this.fieldDidUpdated()


        while (this.checkDownCollision()){
            this.moveDown()
        }
        this.moveDown()

    }

    nextTetramino() {
        this.currentPosition = {x: 0, y: 4}
        this.tetramino.tetraminoRenew()
        if(this.checkCollisionNow()){
            // this.initGame()
            this.fieldDidUpdated()
            this.gameData.gameOver = true
        }
        this.tetramino = tetramino
    }

    moveLeft() {

        if (this.checkMoveCollision(-1)) {
            this.currentPosition.y -= 1
            this.fieldDidUpdated()
        }
    }

    moveRight() {

        if (this.checkMoveCollision(1)) {
            this.currentPosition.y += 1
            this.fieldDidUpdated()
        }
    }

    checkCollisionNow(newTetramino = this.tetramino.currentTetramino, newCoordinates = this.currentPosition){
        for (let lineNumber = 0; lineNumber < newTetramino.length; lineNumber++)
            for (let squareNumber = 0; squareNumber < newTetramino[lineNumber].length; squareNumber++)
                if (
                    newTetramino[lineNumber][squareNumber]&&
                    newCoordinates.y + squareNumber < 0
                    ||
                    newTetramino[lineNumber][squareNumber]&&
                    newCoordinates.y + squareNumber >= 10
                    ||
                    newTetramino[lineNumber][squareNumber]&&
                    this.gameField[newCoordinates.x + lineNumber][newCoordinates.y + squareNumber]
                )
                    return true
        return false
    }

    turnRight(){
        // this.fieldDidUpdated()


        const turnedTetramino = tetramino.turnRight()
        if (this.checkCollisionNow(turnedTetramino))
            return

        this.fieldDidUpdated()
        tetramino.turnRight(true)
    }

    turnLeft(){


        const turnedTetramino = tetramino.turnRight()
        if (this.checkCollisionNow(turnedTetramino))
            return
        this.fieldDidUpdated()
        tetramino.turnLeft(true)
    }

    checkMoveCollision(newCoordinates) {
        for (let lineNumber = 0; lineNumber < tetramino.currentTetramino.length; lineNumber++)
            for (let squareNumber = 0; squareNumber < tetramino.currentTetramino[lineNumber].length; squareNumber++)
                if (
                    tetramino.currentTetramino[lineNumber][squareNumber]&&
                    this.currentPosition.y + squareNumber + newCoordinates < 0
                    ||
                    tetramino.currentTetramino[lineNumber][squareNumber]&&
                    this.currentPosition.y + squareNumber + newCoordinates >= 10
                    ||
                    tetramino.currentTetramino[lineNumber][squareNumber]
                    &&
                    this.gameField[this.currentPosition.x + lineNumber][this.currentPosition.y + squareNumber + newCoordinates]
                )
                    return false


        return true
    }

    checkDownCollision(position = this.currentPosition) {
        let colisionDetected = false
        let lastLineNumber = 0
        for (let lineNumber = 0; lineNumber < tetramino.currentTetramino.length; lineNumber++)
            for (let squareNumber = 0; squareNumber < tetramino.currentTetramino[lineNumber].length; squareNumber++)
                if (tetramino.currentTetramino[lineNumber][squareNumber])
                    lastLineNumber = lineNumber
        if (position.x + lastLineNumber >= 20)
            colisionDetected = true

        if (!colisionDetected)
        for (let lineNumber = 0; lineNumber < tetramino.currentTetramino.length; lineNumber++)
            for (let squareNumber = 0; squareNumber < tetramino.currentTetramino[lineNumber].length; squareNumber++)
                if (
                    tetramino.currentTetramino[lineNumber][squareNumber] &&
                    this.gameField[position.x + lineNumber + 1][position.y + squareNumber]
                )
                    colisionDetected = true



        return !colisionDetected
    }

    destroyAllLines(){
        let someLineDestroyed = false
        this.getGameFieldWithTetramino().map((line, numberLine) => {
            if(line.every(item => item)){
                this.fieldDidUpdated()
                this.gameField.splice(numberLine, 1)
                this.gameField.unshift([0,0,0,0,0,0,0,0,0,0])
                if (this.gameData.itsCombo){
                    this.gameData.score += this.gameData.addingToScore
                    this.gameData.addingToScore+=1
                    this.gameData.linesToOpponent+=1
                    if (this.gameData.tickInterval > 10){
                        this.gameData.tickInterval -= 10
                    }
                }else {
                    this.gameData.itsCombo = true
                }
                someLineDestroyed = true
            }
        })
        if (!someLineDestroyed) {
            this.gameData.addingToScore = 1
            this.gameData.itsCombo = false
        }
    }

    addLines(count = 2){
        this.fieldDidUpdated()
        for (let i = 0; i < count; i++){
            const randomLine = [2,2,2,2,2,2,2,2,2,2]
            randomLine[Math.floor(Math.random()*10)] = 0
            game.gameField.push(randomLine)
            game.gameField.shift()
        }
        console.log(this.gameField)
    }




    freezeGameField(gameField) {

        const freezeField = gameField.map(row => row.map(square => square ? 2 : 0))
        this.gameField = freezeField
    }
}

const game = new Game()
export default game