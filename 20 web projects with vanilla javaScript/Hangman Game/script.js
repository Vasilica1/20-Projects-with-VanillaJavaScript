const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];


const correctLetters = [];
const worngLetters = [];

//show the hidden word
function displayWord() {
  wordEl.innerHTML =  `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter: ''}
        </span>
      `
      )
      .join('')
    }
  `;
  const innnerWord = wordEl.innerText.replace(/\n/g, '');

  if(innnerWord === selectedWord) {
    finalMessage.innerText = 'Congratulation! you won!';
    popup.style.display = 'flex';
  }
}

//update the wrong letters

function updateWrongLettersEl() {
  //display wrong letters
  wrongLettersEl.innerHTML = `
    ${worngLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${worngLetters.map(letter => `<span>${letter}</span>`)}
  `;

  //display parts
  figureParts.forEach((part, index) => {
    const errors = worngLetters.length;

    if(index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }

    //cheack if lost
    if(worngLetters.length === figureParts.length) {
      finalMessage.innerText = 'Unfortunately you lost..';
      popup.style.display = 'flex';
    }
  });
}

// show notification 

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000)
}

// key down letter press

window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if(!worngLetters.includes(letter)) {
        worngLetters.push(letter);
        updateWrongLettersEl()
      } else {
        showNotification();
      }
    }
  }
})

// restart game and play again 
playAgainBtn.addEventListener('click', () => {
  //empty arrays
  correctLetters.splice(0);
  worngLetters.splice(0);

  selectedWord =  words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();

  popup.style.display = 'none';
})

displayWord();



