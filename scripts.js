const cards = document.querySelectorAll('.memory-card');
var modal = document.getElementById('myModal');
var replayButton = document.getElementsByClassName("replay")[0];
var stars = document.getElementsByClassName("fa-star");

let cardLength = cards.length;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCount = 0;

function openModal() {
    modal.style.display = "block";
}

function replay() {
    window.location.reload();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    setMoveCount();
    this.classList.add('flip');
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    //second click
    secondCard = this;

    //do cards match?
    checkForMatch();
}

function setMoveCount() {
    moveCount++;
    var countElement = document.getElementsByClassName("moveCount");
    for (i = 0; i < countElement.length; i++) {
        countElement[i].innerHTML = moveCount;
    }
}

function setStars() {
    if (moveCount <= 18) stars[2].classList.add("checked");
    if (moveCount <= 24) stars[1].classList.add("checked");
    stars[0].classList.add("checked");
}

function getImages() {
    let src = "img/"
    console.log(src.length)
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardLength = cardLength - 2;
    resetBoard();
    if (cardLength == 0) {
        setStars();
        setTimeout(openModal, 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
replayButton.addEventListener('click', replay);