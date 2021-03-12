import createTagElement from './creatElement.js'
import { cards, classMainCard } from './cardsInformation.js'
import { burgerMenu, burgerButton, burgerOverlay, burgerNav } from './constants.js'



function createBurgerMenu() {
    createMenuLink()
    const burgerLinks = burgerMenu.querySelectorAll('.burger-menu_link')

    burgerButton.addEventListener('click', (e) => {
        e.preventDefault()
        toggleMenu()
    })

    burgerNav.addEventListener('click', ({ target }) => {
        if (target.classList[0] === 'burger-menu_link')
            toggleMenu()
    })

    burgerOverlay.addEventListener('click', () => {
        toggleMenu()
    })
}

function createMenuLink() {
    const numberLinks = 8
    for (let i = 0; i < numberLinks; i++) {
        const link = createTagElement('a', `burger-menu_link ${classMainCard[i]}`, '', burgerNav)
        link.innerHTML += cards[0][i]
    }
}

function toggleMenu() {
    burgerMenu.classList.toggle('burger-menu_active')

    if (burgerMenu.classList.contains('burger-menu_active')) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'visible'
    }
}

function activeClassBurgerLink(category) {
    const activeBurgerLink = document.querySelector('.active')
    activeBurgerLink.classList.remove('active')
    const burgerLink = document.querySelectorAll('.burger-menu_link')

    burgerLink.forEach((element) => {
        if (element.classList[1] === category) {
            element.classList.add('active')
        }
    })
}

createBurgerMenu()

export { activeClassBurgerLink }