//Global variables:

const card = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const counter= document.querySelector('.moves');
//const stars= document.querySelectorAll('.fa-star');
const timer= document.querySelector('.timer');
const refresh= document.querySelector('.fa-repeat')

const modal= document.getElementById('simple-modal');
const closeBtn= document.getElementsByClassName('closeBtn')[0];

let cards = [...card];
let moves= 0;
let hasOpenedCard= false;
let lockBoard= false;
let firstCard, secondCard;
let cardsMatch = false;
let second= 0; minute= 0;
let interval;
/*let openCards= [] ;*/

// start of functions need to make the game work:
document.body.onload= startGame();

// Shuffle function from http://stackoverflow.com/a/2450976//
function shuffle(array) {
    var currentIndex = card.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
     return array;
} 
function startGame(){
    cards= shuffle(cards);
    for (var i=0;  i < cards.length; i++){
        deck.innerHTML = '';
     [].forEach.call(cards, function(item){
        deck.appendChild(item);
    });
    cards[i].classList.remove('open', 'match')
    }
    //rest moves:
    moves= 0 ;
    counter.innerHTML= moves;
    //rest timer:
    second= 0;
    minute= 0;
    let timer= document.querySelector('.timer');
    timer.innerHTML= "Timer: 0  mins 0  secs";
    clearInterval(interval);  // made 'open' and 'match' lables inactive ***
}

//event listener for a click action on a card.
cards.forEach(card => card.addEventListener('click', openCard));
    //every time a .card is clicked- console will log "was clicked" therefor "this"= .card.


//openning cards: adds an open tag to the class name in HTML doc but only if a click event occurs on a card item. 
function openCard(){
    if (lockBoard) return;
    if (this === firstCard)return;

    this.classList.add('open');
/*sinse the moves counter is dependant on a card being opended the movesCounter 
function will be actovated by the openCard function.*/
    movesCounter();

//have two cards been opened?
    if (!hasOpenedCard){
        firstCard = this;
        hasOpenedCard = true;
    }else{
        hasOpenedCard = false;
        secondCard = this;
//if so run the doTheyMatch function to see if they are a match or not.
        doTheyMatch();
    }
}  

function doTheyMatch(){
//if the first card's icon is identical to the second card's icon, run the removeOpenLable function.
    if (firstCard.dataset.icon === secondCard.dataset.icon){
        removeOpenLable();
  //else run the restCards function.
    }else{
    resetCards();
    }
}

function removeOpenLable(){
    firstCard.removeEventListener('click', openCard);
        secondCard.removeEventListener('click', openCard);
        console.log('its a match');
        cardsMatched();
}
/*when cards are a match the 'open' tag on HTML is removed nad replaced with a 'match' tag. 
^ the event listen for those two cards are then removed so those cards become inactive*/
function cardsMatched(){
    firstCard.classList.add('match');
    secondCard.classList.add('match');
}
/* these cards where not a match and therefore need to be fliped back and reset. 
A time out function is used to automaticaly flip them back after 1000ms(1 second) of being open.  */ 
function resetCards(){
    lockBoard = true;

    setTimeout(()=>{
        firstCard.classList.remove('open');
        secondCard.classList.remove('open'); 
        
        lockBoard= false;
    }, 1200);
}
//locks board so that no more than two un-matched cards can be open at any given time.  
function restBoard(){
    [hasOpenedCard, lockedBoard] = [false, false];
    [firstCard, secondCard]= [null, null];
}

//moves counter: if a card is open then add 1 to the moves counter using innerHTML for dynamic text. 
function movesCounter(){
    moves++;
    counter.innerHTML= moves;
    if(moves==1){
        second=0;
        minute=0;
        startTimer();
        //starRating();
    }
    /*if (moves <= 5) {
         stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
      } else if (moves > 6 && moves < 15) {
          stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
      } else if (moves > 16) {
          stars.innerHTML = "<li><i class='fa fa-star'></i></li>";
    }*/
}
//star Rating:
//once 25 cards have been opend(an opportunity to view all cards in deck) one star is made invisible.
//function starRating(){
    //if(moves > 5 && moves < 10){
       // stars[0].style.visibility= 'collapse';
    //}
    //once more than 31 cards have been opended only one star is visible.
    //else if (moves > 11){
    //    stars[1].style.visibility= 'collapse';
    //}
//}
//timer
function startTimer(){
    interval= setInterval(function(){
        timer.innerHTML= "Timer: "+ minute + " mins "+ second + " secs ";
        second++;
        if (second== 60){
            minute++;
            second=0;
         }
    },1200);
}
/*function stopTimer() {
    clearInterval(startTimer);
  }*/
/* refresh button: adding an event listener so that if the refresh icon is pressed the 
startGame function is cl=alled and the cards are shufffled, timer and moves counter are reset.*/
refresh.addEventListener('click', function(){
    startGame();
})
//Well done modal:

/*function showModal(){
    modal.style.display='inherit';
}
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function closeModal(){
    modal.style.display='none';
}
function outsideClick(){
    if (event.target == modal){
        modal.style.display='none';
    }
}
}*/