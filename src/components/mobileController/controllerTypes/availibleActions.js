import game from "../../../gameLogic/game.js";

export const
    moveLeft = 'moveLeft', moveRight = 'moveRight',
    moveDown = 'moveDown', turnLeft = 'turnLeft',
    turnRight = 'turnRight', fallDown = 'fallDown',
    setBuffer = 'setBuffer'

export const control = (action) => {

    const WebApp = window.Telegram?.WebApp
    if (WebApp) {
        WebApp.showAlert(`hi, ${WebApp.WebAppUser.username}.`);
    } else


        window.navigator.vibrate(15)
    if (action === moveLeft) {
        game.moveLeft()
    }
    if (action === moveRight) {
        game.moveRight()
    }
    if (action === turnLeft) {
        game.turnLeft()
    }
    if (action === turnRight) {
        game.turnRight()
    }
    if (action === moveDown) {
        game.moveDown()
    }
    if (action === fallDown) {
        game.fallDown()
    }
    if (action === setBuffer) {
        game.toBuffer()
    }
}
