import { roomOfCategoryForGame } from './app.js'
import { numberCards, audioGame, btn, soundEffects, rating } from './constants.js'
import { cards } from './cardsInformation.js'
import openEndGameWindow from './endGameWindow.js'
import createTagElement from './creatElement.js'

let numberError
let counter
let arrayAudio = []

function startGame() {
    arrayAudio = []
    for (let i = 0; i < numberCards; i++) {
        arrayAudio.push(cards[roomOfCategoryForGame][i].word)
    }
    arrayAudio.sort(() => Math.random() - 0.5)

    counter = 0
    numberError = 0

    playAudioGame(arrayAudio[counter])
}

function checkingTheCorrect(element) {
    if (!arrayAudio.length) return
    const selectedElement = element.childNodes[0].innerHTML
    const isInactive = element.classList.length
    if (isInactive === 1) {
        if (selectedElement === arrayAudio[counter]) {
            counter++
            if (counter === 8) {
                checkingSelection(true, element)
                rating.innerHTML = ''
                openEndGameWindow()
                removeGameAudio()
            } else {
                checkingSelection(true, element)
                setTimeout(() => playAudioGame(arrayAudio[counter]), 1000)
            }
        } else {
            checkingSelection(false, element)
        }
    }
}

function removeGameAudio() {
    arrayAudio = []
}

btn.addEventListener('click', () => playAudioGame(arrayAudio[counter]))

function playAudioGame(name) {
    addAudioSrc(audioGame, name)
    audioGame.play()
}

function addAudioSrc(tag, src) {
    tag.src = `assets/audio/${src}.mp3`
}

function checkingSelection(isCorrectElement, element) {
    if (isCorrectElement) {
        createTagElement('div', 'trueStar', '', rating)
        element.classList.add('inactive')
        addAudioSrc(soundEffects, 'correct')
    } else {
        createTagElement('div', 'star-error', '', rating)
        numberError++
        addAudioSrc(soundEffects, 'error')
    }
    soundEffects.play()
}

export { startGame, numberError, checkingTheCorrect, removeGameAudio }