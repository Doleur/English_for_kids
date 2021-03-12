import createTagElement from './creatElement.js'
import { main, soundEffects } from './constants.js'
import { cleanPage, openMainPage } from './app.js'
import { numberError } from './game.js'

export default function openEndGameWindow() {
    cleanPage()
    const endGame = createTagElement('div', 'endGame', '', main)
    const endGameHeader = createTagElement('h2', 'gameHeader', '', endGame)
    const endGamePicture = createTagElement('div', 'endGamePicture', '', endGame)
    if (!numberError) {
        endGameHeader.innerHTML = 'Win!'
        soundEffects.src = 'assets/audio/success.mp3'
        soundEffects.play()
        createTagElement('img', '', '', endGamePicture, ['src', 'assets/img/success.jpg'])
    } else {
        endGameHeader.innerHTML = `${numberError} errors`
        soundEffects.src = 'assets/audio/failure.mp3'
        soundEffects.play()
        createTagElement('img', '', '', endGamePicture, ['src', 'assets/img/failure.jpg'])
    }
    setTimeout(openMainPage, 5000)
}