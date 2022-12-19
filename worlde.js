//Check if it is a valid word
//Random words
//Restart the game after the user guesses the word
//Keyboard
//Fix the double letter situation
//Dark Mode



var height = 6; //number of guesses
var width = 5; //length of the word


var row = 0; //current attempt
var col = 0; //current letter for the attempt

var gameOver = false;
var word = "SQUID"

window.onload = function () {
    initialize();
}

function initialize() {

    //Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            //<span id = "0-0" class = "tiles">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tiles");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }


    //Event Listener
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        //If the key is between A to Z
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            //If the current location is less than width
            if (col < width) {
                //get id
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                //Checks if the text is blank
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }

        //If the key is backspace
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -= 1;
            }
            //get id
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
        }

        //If the key is Enter
        else if (e.code == "Enter") {
            update();

            //Starts a new row
            row += 1;
            col = 0
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}



function update() {
    let correct = 0;

    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        //If the letter is in correct position
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        }
        //If the letter is in the word
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        }
        //Not in the word
        else {
            currTile.classList.add("absent");
        }

        //If they guess it correctly before the amount of guesses
        if (correct == width) {
            gameOver = true;
        }
    }
}
