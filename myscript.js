let score = JSON.parse(localStorage.getItem('score')) || {
    win : 0,
    tie : 0,
    lose : 0
};

let balance = Number(localStorage.getItem('balance')) || 100000 ;

const balanceElement = document.querySelector('.balance');
balanceElement.innerHTML = `Balance : ${balance}$`;


const resultElement = document.querySelector('.result-box');
const moveElement = document.querySelector('.moves-box');
const scoreElement = document.querySelector('.score-box');
const inputElement = document.querySelector('.betamount');

const onehundredElement = document.querySelector('.onebet');
const onekElement = document.querySelector('.onekbet');
const tenkElement = document.querySelector('.tenkbet');

const promoElement = document.querySelector('.promo');


function playGame(playerMove) {
    const computerMove = computerMOve();
    let result = '';
    let valueElement = Number(inputElement.value);

    if ( !valueElement ) {
      return  alert("Enter bet amount! In case you don't know , nothing is free in reality.")
    } else if ( valueElement > balance ) {
        return alert("You don't have enough balance.You are broke as fuck.")
    } else if ( playerMove === 'rock' ) {
        
        if ( computerMove === 'rock' ) {
            result = 'TIE' ;
        } else if ( computerMove === 'paper' ) {
            result = 'LOSE' ;
        } else {
            result = 'WIN' ;
        }
    }

    if ( playerMove === 'paper' ) {
        if ( computerMove === 'rock' ) {
            result = 'WIN' ;
        } else if ( computerMove === 'paper' ) {
            result = 'TIE' ;
        } else {
            result = 'LOSE' ;
        }
    }

    if ( playerMove === 'scissors' ) {
        if ( computerMove === 'rock' ) {
            result = 'LOSE' ;
        } else if ( computerMove === 'paper' ) {
            result = 'WIN' ;
        } else {
            result = 'TIE' ;
        }
    }

    if ( result === 'WIN' ) {
        score.win += 1 ;
        balance += valueElement ;
        resultElement.innerHTML = `${result}`;
    } else if ( result === 'TIE' ) {
        score.tie += 1 ;
        balance;
    } else {
        score.lose += 1 ;
        balance -= valueElement ;
        resultElement.innerHTML = `${result}`;
    }

    localStorage.setItem('score',JSON.stringify(score));
    localStorage.setItem('balance',JSON.stringify(balance));

    updateScoreElement();
    if ( result === 'WIN' ) {
        resultElement.innerHTML = `${result}`;
    } else if ( result === 'TIE' ) {
       resultElement.innerHTML = `${result} <br>ဘယ်သူနိုင်လဲဆို သူ့ဘေးကကောင်နိုင်တယ်။ မင်းကော ငါကော ကွန်ပျူတာကော ရှုံးတယ်။`
    } else {
        resultElement.innerHTML = `${result}`;
    }
    moveElement.innerHTML =  `
    YOU : <img src="rps/${playerMove}-emoji.png" class="move-icon"> VS
    <img src="rps/${computerMove}-emoji.png" class="move-icon"> : COMPUTER
    `;
    balanceElement.innerHTML =   `Balance : ${balance}$`;
}
function computerMOve() {
    const randomNumber = Math.floor((Math.random())*3);
    if ( randomNumber === 0) {
        return 'rock' ;
    } else if ( randomNumber === 1) {
        return 'paper' ;
    } else {
        return 'scissors' ;
    }
}

function updateScoreElement () {
    scoreElement.innerHTML = `WIN : ${score.win} , TIE : ${score.tie} , LOSE : ${score.lose}`
    resultElement.innerHTML = 'မင်းတို့အတူဆောက်ခဲ့တဲ့ လေထဲကအိမ်ကလေးလိုပဲ ဘာမှမရှိတော့ဘူး။'
    moveElement.innerHTML = `
    YOU : <img src="rps/null.png" class="null-icon"> VS 
    <img src="rps/null.png" class="null-icon"> : COMPUTER`;
    balanceElement.innerHTML =   `Balance : ${balance}$`;
}

function addOnBet(amount) {
    if ( amount === '100') {
        var value = parseInt(inputElement.value,10) ;
        value = isNaN(value) ? 0 : value;
        value += 100;
        inputElement.value = value ;
    } else if ( amount === '1k' ) {
        var value = parseInt(inputElement.value,10) ;
        value = isNaN(value) ? 0 : value;
        value += 1000;
        inputElement.value = value ;
        } else {
            var value = parseInt(inputElement.value,10) ;
        value = isNaN(value) ? 0 : value;
        value += 10000;
        inputElement.value = value ;
            }
}

function notaddOnBet(amount) {
    if ( amount === '100') {
        let compareNumber = 100;
        var value = parseInt(inputElement.value,10) ;
        value = isNaN(value) ? 0 : value;
    
        if ( value < inputElement.value ) {
            return alert('Bet amount is too low')
        } else {
            value -= 100;
            inputElement.value = value ;
        }
    } else if ( amount === '1k' ) {
        let compareNumber = 1000;
        var value = parseInt(inputElement.value,10) ;
        value = isNaN(value) ? 0 : value;
        
        if ( value < compareNumber) {
            return alert('Bet amount is too low')
        } else {
            value -= 1000;
            inputElement.value = value ;
        }
        
        } else if ( amount === '10k'){
           let compareNumber = 10000;
           var value = parseInt(inputElement.value,10) ;
        value = isNaN(value) ? 0 : value;
        if ( value < compareNumber ) {
            return alert('Bet amount is too low')
        } else {
            value -= 10000;
            inputElement.value = value ;
        }
            }
}

function clearBet () {
    inputElement.value = 0;
}

function increaseBalance(event) {
    if ( promoElement.value !== 'HOMIEHOME') {
        return
    } else if ( event.key === 'Enter') {
        balance += 100000;
        balanceElement.innerHTML = `Balance : ${balance}$`;
    }
}