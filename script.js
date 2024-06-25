let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");

let turnO = true; // playerX, playerO
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    let isDraw = true;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            msgContainer.innerText = `Congratulations, ${pos1Val} is the winner!`;
            
            boxes.forEach(box => box.disabled = true);
            startCountdown(); 
            return; 
        }

       
        if (pos1Val === "" || pos2Val === "" || pos3Val === "") {
            isDraw = false;
        }
    }

   
    if (isDraw) {
        msgContainer.innerText = "It's a draw!";
        startCountdown(); 
    }
};

const startCountdown = () => {
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        msgContainer.innerText = `New game starts in ${countdown--} seconds`;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            resetGame();
        }
    }, 1000);
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    msgContainer.innerText = ""; 
    console.log("Game reset");
};


resetbtn.addEventListener("click", resetGame);


newbtn.addEventListener("click", resetGame);
