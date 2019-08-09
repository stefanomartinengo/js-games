/*
TODO:
    * Style win/lose display
    * Add indicator for current game/waiting for word
    * Make app mobile responsive
    * Alternate START/RESET BTN
    * Add Hangman "platform?"
    * Remove input-guess/fix bug
*/
let attempts = 6;
let fault = 0;
let parts = ["face", "torso", "leftarm", "rightarm", "leftleg", "rightleg"]
var word = '';
let guessed = [];

let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
alphabet.forEach( alph => {
    let node_el = document.getElementById('alphabet');
    let newEl = document.createElement('p');
    newEl.setAttribute("letter", alph);
    newEl.setAttribute("onClick", "guessLetter(event)");
    newEl.classList.add('letter_single');
    node_el.parentNode.insertBefore(newEl, node_el).innerHTML = alph;
    node_el.appendChild(newEl)
});

var clearWord =  function() {
    // Need to re-add word_display div element
    document.getElementById('word').value = "";
    word = "";
    let setWrdBtn = document.getElementById('set_word');
    setWrdBtn.setAttribute("onClick", "setWord()");
    document.getElementById('word_display').remove();
    setWrdBtn.innerHTML = "START";
    setWrdBtn.classList.add('g-btn');
    setWrdBtn.classList.remove('reset-btn')
}
function setWord() {
    let setWordBtn = document.getElementById('set_word');
    setWordBtn.classList.add('reset-btn');
    setWordBtn.setAttribute("onClick", "clearWord()");
    setWordBtn.innerHTML = "RESET";
    let setWord = document.getElementById('word').value;
    word = setWord;
    document.getElementById('word').setAttribute("type", "password")
    word.split('').forEach( e => {
        var div_node = document.createElement("div");
        var child_node = document.createElement("p");
        var textnode = document.createTextNode(e.toUpperCase());
        div_node.classList.add("word_display_block");
        child_node.style.display = "none";
        div_node.appendChild(child_node);
        child_node.appendChild(textnode);
        document.getElementById("word_display").appendChild(div_node);
    });
};

function guessLetter(event) {
    let letter = event.target.innerHTML || document.getElementById('letter').value.toUpperCase();
    let letters = [...document.getElementById('letters').children]
    let word_display = [...document.getElementById('word_display').children];
    word_display.forEach( el => {
        if(el.children[0].innerHTML === letter) {
            el.children[0].style.display = 'inline'
        }
    });
    letters.map( e => {
        if(e.innerHTML === letter.toUpperCase()) {
            e.classList.add('single_letter_used');
            checkWin();
        }
    });
    if(guessed.includes(letter)){
        document.getElementById('letter').value = "";
        return alert('letter already guessed. Pick a different letter dumbass');
    }
    if(word.toUpperCase().includes(letter)) {
        guessed.push(letter);
        document.getElementById('letter').value = "";
    } else {
        guessed.push(letter);
        document.getElementById('letter').value = "";
        --attempts;
        var man = document.getElementById(parts[fault]);
        if(man) {
            man.style.visibility = "visible";
        }
        checkWin();
        ++fault;
    }
};

function checkWin() {
    let winlose = document.getElementById('win_lose');
    if(attempts === 0) {
        winlose.classList.remove('hidden');
        winlose.classList.add('win_lose');
        winlose.innerHTML="You lost dumbass";
        winlose.style.color="red";
        document.getElementById('guess_letter').setAttribute("disabled", "true")
    } else {
        let word_display = [...document.getElementById('word_display').children];
        let win = word.length;
        let counter = 0;
        word_display.map(node => {
            if(node.children[0].style.display !== 'none') {
                ++counter;
                if(counter === win) {
                    winlose.classList.remove('hidden');
                    winlose.classList.add('win_lose');
                    winlose.style.color = "green";
                    winlose.innerHTML="You win you smart ass";
                }
            }
        } )
    }
}
