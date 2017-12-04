var form = document.getElementById('form');
var resetBtn = document.getElementById('reset');
var displayNumber = document.getElementById('displayNumber');
var response = document.getElementById('response');
var lastGuess = 0;                    
var randomNumber = 0;
var textInput = document.getElementById('guess');
var clearBtn = document.getElementById('clear');
var submitBtn = document.getElementById('submit');

form.addEventListener('submit', addGuess);
form.addEventListener('reset', clearGuess);
resetBtn.addEventListener('click', resetGame);

window.onload = generateRandom();

textInput.addEventListener('focus', function(e) {
  clearBtn.removeAttribute('disabled', true);
})

submitBtn.addEventListener('click', function(e) {
  resetBtn.removeAttribute('disabled', true);
})
  
function removeClickability() {
  document.getElementById('clear').remove('disabled');
}

function generateRandom() {
  //console.log('random')
  randomNumber = Math.floor((Math.random() * 100 + 1));
  return randomNumber;
}

function addGuess(e) {
  // console.log(1);                                                       
  e.preventDefault();                                                  
  var userGuess = document.getElementById('guess').value;                 
  displayNumber.innerText = userGuess;
  lastGuess = parseInt(userGuess);
  document.getElementById('guess').value = '';
  compareNumbers();
}

function compareNumbers() {
  if(lastGuess < randomNumber && lastGuess >= 1) {
    response.innerText = ('That Is Too Low!');
  } else if (lastGuess > randomNumber && lastGuess < 100) {
    response.innerText = ('That Is Too High!');
  } else if (lastGuess === randomNumber){
    response.innerText = ('BOOM!');
  } else if (lastGuess > 100){
    response.innerText = ('Please Choose A Number between 1 and 100');
  } else if (lastGuess < 1){
    response.innerText = ('Please Choose A Number between 1 and 100');
  } else {
    response.innerText = ('Error. Please Enter a Number');
  }
} 

function resetGame (e) {
  lastGuess = 0;
  generateRandom();
  displayNumber.innerText = '';
  response.innerText = '';
}

function clearGuess(e) {
  document.getElementById('guess').value = '';
}




