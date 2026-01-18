var slider = document.getElementById("wpmInput");
var textSubmit = document.getElementById("textSubmit");
var output = document.getElementById("sliderValue");
var rsvpText = document.getElementById("rsvpText");
var pauseButton = document.getElementById("pauseSubmit");
var leftButton = document.getElementById("goLeft");
var rightButton = document.getElementById("goRight")

let usersText;
let paused = false;
let indexValue;
let usersWordList;
let stopped = false;

indexValue = 0;

function defineWPM(){
    WPM = slider.value;
    TIME_BETWEEN_WORDS = (60 / WPM) * 1000;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function printWords(){
    rsvpText.textContent = usersWordList[indexValue];
    await sleep(500);

    for (indexValue; indexValue < usersWordList.length; indexValue++){
        if(paused == true){
            indexValue -= 1;
            return 1;
        }
        if (stopped == true){
            rsvpText.textContent = "Stopped";
            stopped = false;
            return 1;
        }

        defineWPM();

        await sleep(TIME_BETWEEN_WORDS);
        rsvpText.textContent = usersWordList[indexValue];
    }
    await sleep(1000);
    rsvpText.textContent = "Done!";
    stopped = true;
    textSubmit.textContent = "Start";
    indexValue = 0;
}

function convertToArray(usersText){
    placeholder = "";
    usersWordList = [];

    for (i = 0; i < usersText.length; i++){
        if(usersText[i] == ' '){
            usersWordList.push(placeholder);
            placeholder = "";
        } 
        else
        {
            placeholder += usersText[i];

            if (!usersText[i + 1]){
                usersWordList.push(placeholder);
            }
        }
    }

    return usersWordList;
}

textSubmit.onclick = function(){
    if (textSubmit.textContent == "Start"){
        stopped = false;
        textSubmit.textContent = "Stop";
        pauseButton.textContent = "Pause";
    }
    else{
        stopped = true;
        textSubmit.textContent = "Start";
        rsvpText.textContent = "Stopped";
        paused = false;
        indexValue = -1;
        return 0;
    }

    paused = false;
    defineWPM();

    usersText = document.getElementById("textInput").value;
    convertToArray(usersText);

    printWords();
}

output.innerHTML = slider.value;
slider.oninput = function(){
    output.innerHTML = this.value;
}

pauseButton.onclick = function(){
    if (paused == false){
        paused = true;
        pauseButton.textContent = "Resume";
    } 
    else{
        paused = false;
        pauseButton.textContent = "Pause";
        defineWPM();

        usersText = document.getElementById("textInput").value;
        convertToArray(usersText);

        printWords();
    }
}

leftButton.onclick = function(){
    indexValue -= 1;
    rsvpText.textContent = usersWordList[indexValue]
}

rightButton.onclick = function(){
    indexValue += 1;
    rsvpText.textContent = usersWordList[indexValue]
}

