//Variables
let firstGuess = ''
let secondGuess = ''
let previousTarget = null
let count = 0
let delay = 2000

//Individual Cards
const cardsArray = [
    {name: 'triangle',
    img: 'images/polygons/triangle.png'}, 
    {name: 'triangle', 
    img: 'images/polygons/triangleAns.png'},
    {name: 'quadrilateral',
    img: 'images/polygons/quadrilateral.png'},
    {name: 'quadrilateral',
    img: 'images/polygons/quadrilateralAns.png'}
]

cardsArray.sort( () => 0.5 - Math.random() )

const game = document.getElementById('game')

const grid = document.createElement('section')
grid.setAttribute('class', 'grid')

game.appendChild(grid)

cardsArray.forEach(item => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = item.name

    const front = document.createElement('div')
    front.classList.add('front')

    const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${item.img})`

    grid.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
})

const resetGuesses = () => {
    firstGuess = ''
    secondGuess = ''
    count = 0
    previousTarget = null

    var selected = document.querySelectorAll('.selected')
    selected.forEach(card => {
        card.classList.remove('selected')
    })
}

grid.addEventListener('click', function(event){
    let clicked = event.target

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) {
        return
    }

    if (count < 2) {
        count++
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add('selected')
        } else {
            secondGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add('selected')
        }
        if (firstGuess !== '' && secondGuess !== '') {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay)
                setTimeout(resetGuesses, delay)
            } else {
                setTimeout(resetGuesses, delay)
            }
        }
        previousTarget = clicked;
    }
})

const match = () => {
    var selected = document.querySelectorAll('.selected')
    selected.forEach(card => {
        card.classList.add('match')
    })
}