import game from "../game.js";
const keydownListener = (e)=>{
    console.log(e.code)
    if (e.code === 'ArrowLeft')
        game.moveLeft()
    if (e.code === 'ArrowRight')
        game.moveRight()
    if (e.code === 'ArrowDown')
        game.moveDown()
    if (e.code === 'KeyX')
        game.turnRight()
    if (e.code === 'KeyZ')
        game.turnLeft()
    if (e.code === 'KeyA')
        game.addLines()
    if (e.code === 'KeyQ')
        game.gameData.tickInterval-=100
    if (e.code === 'Space')
        game.fallDown()
    if (e.code === 'ShiftLeft' | e.code === 'ShiftRight')
        game.toBuffer()
}

export default keydownListener