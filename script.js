const msgEL = document.getElementById('msg');

const randomNum = getRandomNumber();

//create a randon number for the game
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;

}

console.log("Number: " + randomNum)

//initialze a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

//create a variable to work with the speech recogniton object 
let recognition = new window.SpeechRecognition();

//start game 
recognition.start();

//listen for the result event
recognition.addEventListener('result', onSpeak);

//create onSpeak function
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(msg)


    writeMessage(msg);
    checkNumber(msg);
}

//display msg to the screen
function writeMessage(msg) {
    msgEL.innerHTML = `
        <div> You Said: </div>
        <span class="box"> ${msg} </span>
       `;
}

//check the message against the number
function checkNumber(msg){
    const num = +msg;
    //Check if a valid number
    if(Number.isNaN(num)){
        msgEL.innerHTML += '<div> That is not a valid number </div>';
        return;
        // += will append '' to the msgEL 
    }
    //check if number is in range 
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div> Your number must be between 1-100 </div>';
        return;
    }
    //check number against randomly generated number
    if (num === randomNum){
    document.body.innerHTML = `
    <h2>Congrats! You guessed the number <br><br> 
    It was ${num} </h2>
    <button class="play-again" id="play-again"> Play again </button> 
    `;
} else if (num > randomNum){
    msgEL.innerHTML += '<div> GO LOWER </div>';
} else {
    msgEL.innerHTML += '<div> GO HIGHER </div>';
}

}
//allow user to continue and guess again
recognition.addEventListener('end', ()=> recognition.start());







