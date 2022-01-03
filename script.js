'use strict'

//Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const buttonNew = document.querySelector('.btn--new')
const buttonRoll = document.querySelector('.btn--roll')
const buttonHold = document.querySelector('.btn--hold')

let playing, currentScore, scores, activePlayer

const init = () => {
  playing = true
  currentScore = 0
  scores = [0, 0]
  activePlayer = 0

  diceEl.classList.remove('hidden')

  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')

  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')

  score0El.textContent = 0
  score1El.textContent = 0

  current0El.textContent = 0
  current0El.textContent = 0
}

init()

const switchPlayer = () => {
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')

  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
}

//js will convert this 0 from Number to String automatically
score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add('hidden')

//Rolling dice functionality
buttonRoll.addEventListener('click', () => {
  if (playing) {
    //1. Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1

    //2. display the dice with the random value
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`

    //Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      //Switch to next player
      switchPlayer()
    }
  }
})

buttonHold.addEventListener('click', () => {
  if (playing) {
    //1 Add current score to active player's score.
    scores[activePlayer] += currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer]

    //2 Check if player's score reached above or equal to 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false
      diceEl.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
    } else {
      //Switch the player
      switchPlayer()
    }
  }
})

buttonNew.addEventListener('click', init)
