/*
    * pull icons/images for game
    * dom game-setup
    * set difficulties
    * animate card turning
        *** 1.1,1.2,1.3,1.4,2.1,2.2,2.3
*/

// -----------------------------SETUP----------------------------- //
let cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

shuffleCards = (array) => array.sort(() => Math.random() - 0.5);
let shuffledCards = shuffleCards(cards);

let rows = Array(document.getElementById('game-box').children);
let index = 0;

// loop through grid and add random numbers
rows.map( ([...el]) => {
    el.map( child => {
        let row_el = [...child.children];
        row_el.map( e => {
            let p_tag = document.createElement('p');
            p_tag.innerHTML =  shuffledCards[index];
            p_tag.style.display = "none";
            e.appendChild(p_tag);
            ++index;
        });
    });
});

// ---------------------------- GAME ----------------------------- //
let flipCt = 0;
let flipArr = [];
let matches = [];
let tries = document.getElementById("tries");

function flip(e) {
    console.log(e.target.parentNode, 'parentNode')
    e.target.classList.add('flip')
    if(flipCt < 2) {
        flipArr.push(e.target.children[0])
        e.target.children[0].style.display="inline"
        e.target.children[0].style.fontSize="2em";
        e.target.children[0].style.display="flex";
        e.target.children[0].style.justifyContent="center";
        e.target.children[0].style.marginTop="18px";
        ++flipCt;
    };
    if( flipCt === 2) {
        if(flipArr[0].innerHTML === flipArr[1].innerHTML) {
            flipCt = 0;
            matches = [...flipArr];
            flipArr[0].parentNode.removeAttribute("onclick");
            flipArr[0].parentNode.classList.add("flipped");
            flipArr[1].parentNode.classList.add("flipped");
            flipArr[1].parentNode.removeAttribute("onclick");
            flipArr = [];
        } else {
            ++tries.innerHTML;
            setTimeout( () => {
                console.log(flipArr[0])
                flipArr[0].style.display = "none";
                flipArr[1].style.display = "none";
                flipArr[0].parentNode.removeAttribute("class");
                flipArr[1].parentNode.removeAttribute("class");
                flipArr = [];
                flipCt = 0;
            }, 800);
        }
    }
}