import createTagElement from './creatElement.js'
import { main, burgerNav, logo, checkbox, btn, rating, numberCards } from './constants.js'
import { cards, classMainCard } from './cardsInformation.js'
import { startGame, checkingTheCorrect, removeGameAudio } from './game.js'
import { activeClassBurgerLink } from './burgerMenu.js'

let isGameMode = false
let isCategoryPage = false
let roomOfCategoryForGame

function openMainPage() {
    cleanPage()
    buttonDisplay()
    activeClassBurgerLink('main-link')
    isCategoryPage = false

    for (let i = 0; i < numberCards; i++) {
        const card = createTagElement('a', `main-card ${classMainCard[i]}`, createTagElement('img', 'image', '', '', ['src', `assets/img/main/${i + 1}.jpg`]), main)

        card.innerHTML += cards[0][i]
    }
    gameMode()
}

function cleanPage() {
    main.innerHTML = ''
    removeGameAudio()
}

function createCategoryPage(categoryName) {
    isCategoryPage = true
    const roomOfCategory = classMainCard.indexOf(categoryName) + 1
    if (!roomOfCategory) return
    roomOfCategoryForGame = roomOfCategory
    cleanPage()
    buttonDisplay()
    activeClassBurgerLink(`${classMainCard[roomOfCategory-1]}`)

    for (let i = 0; i < numberCards; i++) {
        const card = createTagElement('div', 'card', [
            createTagElement('div', 'front', createTagElement('div', 'card-header', '', ''), '', ['style', `background-image: url("assets/${cards[roomOfCategory][i].image}");`]),
            createTagElement('div', 'back', createTagElement('div', 'card-header', '', ''), '', ['style', `background-image: url("assets/${cards[roomOfCategory][i].image}");`]),
            createTagElement('div', 'rotate', '', ''),
            createTagElement('audio', 'audio', '', '', ['src', `assets/${cards[roomOfCategory][i].audioSrc}`])

        ], main)
        const cardHeader = card.querySelector('.card-header')
        const cardHeaderBack = card.querySelector('.back').firstChild
        cardHeader.innerHTML = cards[roomOfCategory][i].word
        cardHeaderBack.innerHTML = cards[roomOfCategory][i].translation
    }

    gameMode()

    const card = document.querySelectorAll('.card')

    card.forEach((element) => {
        element.addEventListener('mouseleave', () => {
            addOrRemoveClass(element, 'translate', false)
        })
    })
}

function openPage(event) {
    let clickedElement = event.classList[1]
    const images = document.querySelectorAll('img')
    let isImage = false
    images.forEach((image) => {
        if (image === event) {
            isImage = true
        }
    })
    if (isImage) {
        clickedElement = event.parentNode.classList[1]
    }

    if (clickedElement === 'main-link') {
        openMainPage()
    } else {
        createCategoryPage(clickedElement)
    }
}

function gameMode() {
    const cards = document.querySelectorAll('.main-card')
    const cardsCategory = document.querySelectorAll('.card')

    if (isGameMode) {
        gameModeClass(true)
    } else {
        gameModeClass(false)
    }

    function gameModeClass(boolean) {
        cards.forEach(element => {
            addOrRemoveClass(element, 'game-color-card', boolean)
        })
        cardsCategory.forEach(element => {
            addOrRemoveClass(element, 'card-cover', boolean)
            const cardHeader = element.querySelector('.card-header')
            const cardRotate = element.querySelector('.rotate ')
            addOrRemoveClass(cardHeader, 'none', boolean)
            addOrRemoveClass(cardRotate, 'none', boolean)
        })
        addOrRemoveClass(burgerNav, 'game-color', boolean)
        if (isCategoryPage) {
            addOrRemoveClass(btn, 'none', !boolean)
            addOrRemoveClass(rating, 'none', !boolean)
            rating.innerHTML = ''
        }
        changesActiveStateBtn()
    }
}

function addOrRemoveClass(element, className, boolean) {
    if (boolean) {
        element.classList.add(className)
    } else {
        element.classList.remove(className)
    }
}

function audioPlay(audio) {
    if (!isGameMode) {
        audio.play()
    }
}

function displayRepeatBtn() {
    if (btn.classList[1] !== 'repeat') {
        addOrRemoveClass(btn, 'repeat', true)
        startGame()
    }
}

function changesActiveStateBtn() {
    if (isGameMode && isCategoryPage) {
        btn.addEventListener('click', displayRepeatBtn)
    } else {
        btn.removeEventListener('click', displayRepeatBtn)
        addOrRemoveClass(btn, 'repeat', false)
    }
}

function buttonDisplay() {
    if (btn.classList[1] !== 'none') {
        addOrRemoveClass(btn, 'none', true)
        btn.removeEventListener('click', displayRepeatBtn)
        addOrRemoveClass(btn, 'repeat', false)
    }
    if (rating.classList[1] !== 'none') {
        addOrRemoveClass(rating, 'none', true)
        rating.innerHTML = ''
    }
}

openMainPage()

main.addEventListener('click', ({ target }) => {
    openPage(target)
    const clickedElementClass = target.classList[0]
    if (clickedElementClass === 'rotate') {
        const targetCard = target.parentElement
        addOrRemoveClass(targetCard, 'translate', true)
    }
    if (!isGameMode) {
        if (clickedElementClass === 'front' || clickedElementClass === 'card-header') {
            const audio = target.closest('.card').querySelector('.audio')
            audioPlay(audio)
        }
    }
    if (clickedElementClass === 'front' && isGameMode) {
        checkingTheCorrect(target)
    }
})

burgerNav.addEventListener('click', ({ target }) => {
    openPage(target)
})
logo.addEventListener('click', () => {
    openMainPage()
})
checkbox.addEventListener('click', () => {
    isGameMode = !isGameMode
    gameMode()
})

export { cleanPage, openMainPage, roomOfCategoryForGame }