console.log("game on");
//variable identification

const startBtn = document.querySelector("#start-btn");
const rollBtn = document.querySelector("#roll-btn");
const indivBtn = document.querySelector("#indiv-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const resetBtn = document.querySelector("#reset-btn");

const firstDice = document.querySelector("#firstDice");
const secondDice = document.querySelector("#secondDice");

const boardNames = document.querySelector(".board-div");
const board = document.querySelector(".board-container");
const scores = document.querySelector(".score");
const buttons = document.querySelector(".button");
const startDiv = document.querySelector(".start");
const tbody = document.querySelector('#scoreTableBody');
const resetDiv = document.querySelector(".reset");

// const buttons = document.querySelector(".button");


//index 0 --> holds points for each round

//other index numbers are correspondent to each other on the board

const boxes =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//player names and round number
const getRound= document.querySelector("#round-number");
const player1Input = document.querySelector("#p1-input");
const player2Input = document.querySelector("#p2-input");
const playerNameDiv = document.querySelector(".player-name");

//let variables
let playerTurn = document.querySelector("#player-turn");
let roundNumber = 1;

let dice1 = 0;
let dice2 = 0;

let player1Points = 0;
let player2Points = 0;

let player1TotalPoints = 0; // Total points for Player 1
let player2TotalPoints = 0; // Total points for Player 2

let value1 = player1Input.value.trim();
let value2 = player2Input.value.trim();

let totalPts1 =[];
let totalPts2 =[];

let winnerMessage = document.querySelector(".winner-message");

//disabling buttons
rollBtn.disabled = true;
indivBtn.disabled = true;
sumBtn.disabled = true;
endBtn.disabled = true;
resetBtn.style.display = 'none';

firstDice.style.display = 'none';
secondDice.style.display = 'none';

// allowing the roll button to function
rollBtn.addEventListener("click", function(){

    dice1 = rollDice();
    dice2 = rollDice();

    //update icons to corresponding number
    firstDice.className = `bi bi-dice-${dice1}`;
    secondDice.className = `bi bi-dice-${dice2}`;

    //process dice to see action
    processRoll(dice1);
    processRoll(dice2);

    //updating buttons based on rules
    const sum = dice1 + dice2;
    const dice1Shut = boxes[dice1] === "X";
    const dice2Shut = boxes[dice2] === "X";
    const sumShut = sum > 9 || boxes[sum] === "X";

    indivBtn.disabled = dice1 === dice2 || dice1Shut || dice2Shut;
    sumBtn.disabled = sumShut;
    endBtn.disabled = !(indivBtn.disabled && sumBtn.disabled);

    // Disable Roll button
    rollBtn.disabled = true;

    console.log(`Dice rolled: ${dice1}, ${dice2}`);
    console.log(`Buttons - Individual: ${!indivBtn.disabled}, Sum: ${!sumBtn.disabled}, End Turn: ${!endBtn.disabled}`);
    console.log(`The sum is ${sum}`);

}); //end of roll button event listener


// roll dice function
function rollDice(){

    const diceNum = Math.floor(Math.random() * 6) + 1;
    return diceNum;

};//end of rollDice

  //This function will process the dice

function processRoll(diceValue) {
    console.log(`Processing roll for value: ${diceValue}`);

    if (boxes[diceValue] === "X") {
        console.log(`Box for ${diceValue} are already shut.`);

    } else {
        console.log(`Box for ${diceValue} are open.`);

    }

}; //end of rollDice function


//event listener for the start button
startBtn.addEventListener("click", function(){

    value1 = player1Input.value.trim();
    value2 = player2Input.value.trim();

    //checks the input of each player
    if(value1 === "" || value2 ===""){
        alert("One of your names is empty. Please input proper name.");
        return;

    }else{
        playerTurn.textContent = (value1 + "'s Turn");
        getRound.textContent = ("Round " + roundNumber);
    }


  boardNames.style.display = "block";
  board.style.display = "flex";
  rollBtn.style.display = "block";
  buttons.style.display = "flex"
  playerNameDiv.style.display = "none";
  rollBtn.disabled = false;
  scores.style.display = "none";
  firstDice.style.display = "block";
  secondDice.style.display = "block";
  startBtn.style.display = "none";

  console.log(`Game started with players: ${value1} and ${value2}`);

}); //end of startBtn event listener


//shut function
function shut(boxNumber) {

    const boxElement = document.querySelector(`.box${boxNumber}`);
    if (boxElement) {
        boxElement.classList.add("shut");
        boxElement.textContent = "X";

    }else{

        boxElement.classList.remove("shut")
    }
}; //end of shut function

//individual button
indivBtn.addEventListener("click", function () {

    if(dice1 !== "X" && dice2 !== "X"){
        shut(dice1);
        shut(dice2);

    }else{

        indivBtn.disabled = true;
    }
    //update boxes array
    boxes[dice1] = "X";
    boxes[dice2] = "X";
    boxes[0] = boxes[0] + (dice1 + dice2);
    console.log(`Updated boxes: ${boxes}`);

    //disable indiv and sum buttons, enable roll button
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;

}); // end of indiv button event listener


//sum button
sumBtn.addEventListener("click", function () {
    const sum = dice1 + dice2;
    if (sum <= 9) {
        shut(sum);

        //update boxes array
        boxes[sum] = "X";
        boxes[0] = boxes[0] + sum;

        console.log(`Updated boxes: ${boxes}`);

    }else{
        sumBtn.disabled = true;
    }

    //disable individual and sum buttons, enable roll button
    indivBtn.disabled = true;
    rollBtn.disabled = false;
    sumBtn.disabled = true;

}); //end of sum button event listener


endBtn.addEventListener('click', function () {
    const player1Name = value1
    const player2Name = value2;

    document.getElementById('p1Name').textContent = player1Name;
    document.getElementById('p2Name').textContent = player2Name;

    const points = 45 - boxes[0];

    if (playerTurn.textContent.includes(value1)) {

        // Its player ones turn
        //Creating the new row
        const newRow = buildRow(roundNumber, points, 0); // Pass Player 2's points as 0 first as filler

        tbody.insertAdjacentElement('beforeend', newRow);
        playerTurn.textContent = `${value2}'s Turn`;
        console.log(`Player 1 Points: ${points}`);
        totalPts1.push(points);

    } else {

        // Its player twos turn
        //Have to update row with player two points
        const existingRow = document.querySelector(`#Round${roundNumber}`); //selects same round in table

        if (existingRow) {
            //goes into same round row to 'select' the player two points section
            const tdP2 = existingRow.querySelector(".p2Pts");

            if (tdP2) tdP2.textContent = points; //adds player two points to table
        }

        totalPts2.push(points);
        playerTurn.textContent = `${value1}'s Turn`; //changes to player ones turn
        roundNumber++; // Increment round after Player 2's turn
        getRound.textContent = `Round ${roundNumber}`; //changes round visually
        console.log(`Player 2 Points: ${points}`);
    }
    resetBoard();

    //displaying and disabling elements
    endBtn.disabled = true;
    rollBtn.disabled = false;
    scores.style.display = "block";

}); // end of endBtn event listener


//This is the buildRown Function
function buildRow(currentRound, player1Points) {

    // Create a new table row
    const tr = document.createElement('tr');
    tr.id = `Round${currentRound}`;

    // Create the table header element for the round
    const th = document.createElement('th');
    th.textContent = `Round ${currentRound}`;
    tr.insertAdjacentElement('beforeend', th);

    // Create the table data element for Player 1's points
        const tdP1 = document.createElement('td');
        tdP1.classList.add("p1Pts");
        tdP1.textContent = player1Points; //set player 1's points
        tr.insertAdjacentElement('beforeend', tdP1);

        // Create the table data element for Player 2's points
        const tdP2 = document.createElement('td');
        tdP2.classList.add("p2Pts");
        tdP2.textContent = player2Points; // Set Player 2's points
        tr.insertAdjacentElement('beforeend', tdP2);

    // Return the constructed row
    return tr;

} // end of buildRown function


//this is the start of the resetBoard function

function resetBoard(){
    boxes.fill(0);

    const cards = document.querySelectorAll(".box");
    cards.forEach((card, index) =>{

        card.classList.remove('shut'); //removes shut class
        card.textContent = index + 1; //goes to the next card by increasing index
        console.log(card.classList);
        console.log(index);

    })

    if(roundNumber > 5){

        gameOver();
        console.log("GAME OVER!");

    }else{
        console.log("Continue");
        endBtn.disabled = true;
        sumBtn.disabled = true;
        indivBtn.disabled = true;
        rollBtn.disabled = false;

    }

}; // end of resetBoard function

function gameOver() {

    endBtn.disabled = true;
    boardNames.style.display = "none";
    rollBtn.style.display = "none";
    buttons.style.display = "none";
    firstDice.style.display = "none";
    secondDice.style.display = "none";
    resetDiv.style.display = "flex";
    resetDiv.style.flexDirection = "column";
    scores.style.display = "block";

     player1TotalPoints = 0;
     player2TotalPoints = 0;

    for (let i = 0; i < totalPts1.length; i++) {
        player1TotalPoints += totalPts1[i];

    }
    for (let i = 0; i < totalPts2.length; i++) {
        player2TotalPoints += totalPts2[i];

    }
    let winnerMsg = document.querySelector("#winner-message");

    if (player1TotalPoints < player2TotalPoints) {
        winnerMsg.textContent = `${value1} wins with ${player1TotalPoints} points! ${value1} won by ${player2TotalPoints - player1TotalPoints} points! ${value2} scored ${player2TotalPoints} points.`;

    } else if (player1TotalPoints > player2TotalPoints) {
        winnerMsg.textContent = `${value2} wins with ${player2TotalPoints} points! ${value2} won by ${player1TotalPoints - player2TotalPoints} points! ${value1} scored ${player1TotalPoints} points.`;

    } else {
        winnerMsg.textContent = `It's a tie! Both players scored ${player1TotalPoints} points.`;

    }

    resetBtn.style.display = "block";
    winnerMsg.style.display = "block";

    return {

        player1TotalPoints,
        player2TotalPoints

    };

}


resetBtn.addEventListener("click", function(){

    //resetting to the start screen

    boardNames.style.display = "none";
    rollBtn.style.display = "none";
    buttons.style.display = "none";
    firstDice.style.display = "none";
    secondDice.style.display = "none";
    resetDiv.style.display = "none";
    scores.style.display = "none";
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    playerNameDiv.style.display = "block";

    rollBtn.disabled = true;
    startBtn.disabled = false;
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    endBtn.disabled = true;
    startDiv.style.display = "flex";
    startDiv.style.flexDirection = "column";
    startDiv.style.justifyContent = "center";

    roundNumber = 1;
    boxes.fill(0);

    dice1 = 0;
    dice2 = 0;

    player1Points = 0;
    player2Points = 0;
    player1TotalPoints = 0;
    player2TotalPoints = 0;
    totalPts1 =[];
    totalPts2 =[];

    player1Input.value = "";
    player2Input.value = "";
    tbody.innerHTML = "";
    playerTurn.textContent = ""

})



