var form = document.getElementById('form');
var resetBtn = document.getElementById('reset');
var displayNumber = document.getElementById('displayNumber');
var response = document.getElementById('response');
var lastGuess = 0;                    
var randomNumber = 0;
var textInput = document.getElementById('guess');
var clearBtn = document.getElementById('clear');
var submitBtn = document.getElementById('submit');
var minInput = document.querySelector('#minInput');
var maxInput = document.querySelector('#maxInput');
var rangeBtn = document.querySelector('#rangeSubmit');
var displayMin = document.querySelector('#displayMin');
var displayMax = document.querySelector('#displayMax');
var minNumber = 0;
var maxNumber = 100;
var minmaxBtn = document.querySelector('#minmaxBtn');
var upperForm = document.querySelector('#upperForm');
var guessP = document.querySelector('#guessp');

form.addEventListener('submit', addGuess);
form.addEventListener('reset', clearGuess);
resetBtn.addEventListener('click', resetGame);
rangeBtn.addEventListener('click', setRange);

window.onload = generateRandom();

maxInput.addEventListener('blur', function(e) {
  rangeBtn.removeAttribute('disabled', true);
})

minInput.addEventListener('blur', function(e) {
  rangeBtn.removeAttribute('disabled', true);
})

textInput.addEventListener('focus', function(e) {
  clearBtn.removeAttribute('disabled', true);
  submitBtn.removeAttribute('disabled', true);
})

submitBtn.addEventListener('click', function(e) {
  resetBtn.removeAttribute('disabled', true);
})

minmaxBtn.addEventListener('click', function(e) {
  upperForm.style.visibility = 'visible';
  minmaxBtn.setAttribute('disabled', true);
})
  
function setRange(e) {
  e.preventDefault();
  var userMinValue = document.querySelector('#minInput').value;
  displayMin.innerText = userMinValue;
  minNumber = parseInt(userMinValue);
  var userMaxValue = document.querySelector('#maxInput').value;
  displayMax.innerText = userMaxValue;
  maxNumber = parseInt(userMaxValue);
  generateRandom();
  if (minNumber > maxNumber) {
    rejection();
    guessP.innerHTML = "<p id='guessp'><img src='https://ct.fra.bz/il/fz/se/i51/5/3/30/f_f5c1ab77c2.png' alt='Y U No Man' height='32' width='38'> Y u no do it right?!</p>";
    resetBtn.removeAttribute('disabled');
  } else if (minNumber < maxNumber) {
    submitBtn.removeAttribute('disabled');
    guessP.innerHTML = "<p id='guessp'>Guess a number between <span id='displayMin'>" + minNumber + "</span>   and <span id='displayMax'>" + maxNumber + "</span></p>";
    submitBtn.removeAttribute('disabled');
    textInput.removeAttribute('disabled');
  } else if (userMinValue || userMaxValue === '') {
    guessP.innerText = 'lol. now you are not doing anything. do more';
  }
}

function rejection() {
  resetBtn.removeAttribute('disabled');
  rangeBtn.setAttribute('disabled', true);
  clearBtn.setAttribute('disabled', true);
  submitBtn.setAttribute('disabled', true);
  textInput.setAttribute('disabled', true);
}

function generateRandom() {
  randomNumber = Math.floor((Math.random() * (maxNumber - minNumber) + minNumber));
  return randomNumber;
}

function addGuess(e) {                                                      
  e.preventDefault();                                                  
  var userGuess = document.getElementById('guess').value;                 
  displayNumber.innerText = userGuess;
  lastGuess = parseInt(userGuess);
  document.getElementById('guess').value = '';
  compareNumbers();
  submitBtn.setAttribute('disabled', true);
}

function compareNumbers() {
  if (lastGuess < randomNumber && lastGuess >= minNumber) {
    response.innerText = ('That Is Too Low!');
  } else if (lastGuess > randomNumber && lastGuess <= maxNumber) {
    response.innerText = ('That Is Too High!');
  } else if (lastGuess === randomNumber){
    response.innerText = ('BOOM!');
    youWin();
    upperForm.style.visibility = 'hidden';
    minmaxBtn.removeAttribute('disabled');
  } else if (lastGuess > maxNumber){
    response.innerText = ('Please Choose A Number between ' + minNumber +' and ' + maxNumber);
  } else if (lastGuess < minNumber){
    response.innerText = ('Please Choose A Number between ' + minNumber +' and ' + maxNumber);
  } else {
    response.innerText = ('wat. lol. thats not a number');
  }
} 

function youWin() {
  maxNumber+=10;
  minNumber-=10;
  displayMax.innerText = maxNumber;
  displayMin.innerText = minNumber;
  minInput.value = '';
  maxInput.value = '';
  generateRandom();
  guessP.innerHTML = "<p id='guessp'>Guess a number between <span id='displayMin'>" + minNumber + "</span>   and <span id='displayMax'>" + maxNumber + "</span></p>";
  clearBtn.setAttribute('disabled', true);
}

function resetGame (e) {
  window.location.reload(true);
}

function clearGuess(e) {
  document.getElementById('guess').value = '';
  clearBtn.setAttribute('disabled', true);
}




