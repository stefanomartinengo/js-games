const success=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

var game_finished = false;
var x_tally = 0;
var o_tally = 0;

// DOM elements
let x_tally_html = document.querySelector('[x-wins]');
let o_tally_html = document.querySelector('[y-wins]');
let winner_html = document.createElement('p');
  winner_html.classList.add('game_over');
x_tally_html.innerHTML += x_tally;
o_tally_html.innerHTML += o_tally;

var move = 'X';
var winner = null;
var boardFilled = 0 // Out of 9;
winner_html;

// Declare container DOM element;
let container = document.querySelector('.tic-tac-container');
// Declare turn DOM element
let move_html = document.createElement('p');

move_html.innerHTML = `Turn: ${move}`;
move_html.classList.add('game_turn')
container.parentNode.insertBefore(move_html, container.nextSibling);

var loopSuccess = (arrayToCheck) => {
  for(var i = 0; i < success.length; i++) {
    var set_match = 0;
  for(var j = 0; j < success[i].length; j++) {
    for(var k = 0; k < arrayToCheck.length; k++) {
      if(success[i].includes(arrayToCheck[k])) {
        ++set_match;
        j++;
        if(set_match === 3) {
          game_finished = true;
          winner = move;
          return 'winner'
        }
      }
    }
  }
  }
}
// Each cell's click event will fire this function
var ugh = (event) => {
  alert('fuck you')
  if(!game_finished) {
  let cell = event.path[0].attributes['data-grid'].value;
  let str = `[data-grid=${cell}]`;
    if(event.target.innerHTML === 'X' || event.target.innerHTML === 'O') {
      return;
    }
  ++boardFilled
  if(move === 'X') {
    event.target.innerHTML = 'X';
    let win = checkForWin(move);
    move = 'O'
    move_html.innerHTML = 'Current move:' + ' ' + move;
  } else {
    event.target.innerHTML = 'O';
    let win = checkForWin(event.target.innerHTML);
    move = 'X';
    move_html.innerHTML = 'Current move:' + ' ' + move;
  }
  // IN case of DRAW
  if(boardFilled === 9 && !winner) { // Need to check if its draw, or winner exists, dont display draw
    game_finished = true;
    let loser_html = document.createElement('p');
      loser_html.classList.add('game_over')
      loser_html.innerHTML = `Draw, try again?`;
      container.parentNode.insertBefore(loser_html, container.previousSibling);
  }
}
};
var checkForWin = (move) => {
  let set = [];
  let containerRows = Array.from(document.getElementsByClassName('tic-tac-container')[0].children);
  containerRows.forEach( row => {
    (Array.from(row.children)).forEach( row_el => {
      if(row_el.innerHTML === move) {
        set.push(Number(row_el.getAttribute('data-grid')));
      };
    });
  });
  if(set.length >= 3) {
    let validateWin = loopSuccess(set);
    if(validateWin) {
      let container = document.querySelector('.tic-tac-container');
      winner_html.innerHTML = `Player ${move} is the Winner!`;
      if(move === 'X') {
        ++x_tally
        x_tally_html.innerHTML = 'X wins: ' + x_tally;
      } else {
        ++o_tally;
        o_tally_html.innerHTML = 'O wins: ' + o_tally;
      }
      container.parentNode.insertBefore(winner_html, container.previousSibling);
    }
  }
};

var reset = () => {
  let containerRows = Array.from(document.getElementsByClassName('tic-tac-container')[0].children);
  containerRows.forEach( row => {
    (Array.from(row.children)).forEach( row_el => {
      row_el.innerHTML = ''
    });
  })
  move = 'X';
  move_html.innerHTML = 'Current move: X';
  boardFilled = 0;
  winner = null;
  game_finished = false;
  winner_html.innerHTML = '';
}
var hardReset = () => {
  if(window.confirm('Are you sure you want to clear win counts?')) {
    x_tally = 0;
    o_tally = 0;
    x_tally_html.innerHTML = 'X wins: ' + x_tally;
    o_tally_html.innerHTML = 'O wins: ' + o_tally;
    reset();
  }
}