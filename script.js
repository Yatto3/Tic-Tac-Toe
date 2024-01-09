"use strict";

const tieScoreElem = document.querySelector("[data-tie]");
const userScoreElem = document.querySelector("[data-userScore]");
const computerScoreElem = document.querySelector("[data-computerScore]");
const ticTacContainer = document.querySelector("[data-ticTac]");
const tilesElements = document.querySelectorAll(".tile");
const gameElementsSrc = [
    "./public/img/icons8-x-48.png",
    "./public/img/icons8-circle-48.png"
];

let isPlayerTurn = true ; 
let userSequence = [];
let computerSequence = [];
let totalTiles = tilesElements.length;
let userScore = 0 ;
let computerScore = 0 ;
let tieScore = 0 ;
let win = 0 ;

ticTacContainer.addEventListener("click" ,(e) => {
    let path  = "http://127.0.0.1:5500/public/img/icons8-circle-48.png";
    if ( e.target.tagName === "DIV"){
        if(e.target.querySelector("img").src === path) return ;
        if (isPlayerTurn){
            totalTiles--;
            userSequence.push(getTileIndex(e));
            
            let imgElem = e.target.querySelector("img");
            imgElem.src = gameElementsSrc[0];
            imgElem.setAttribute("class" , "unHide");

            if(checkForUserWin()){
                updateScore("user");
                restartGame();

                return;
            }


            isPlayerTurn = false;
            if(totalTiles === 0){
                checkForTie();
                return ;
            } 
            computerTurn(getRandomIndex);
            return;
        }

        
    }
})

function computerTurn(getRandIndex){
    totalTiles--;
    let randIndex = getRandIndex();
    let img = tilesElements[randIndex].querySelector("img");
    
    while( img.getAttribute("class","unHide") ){
        randIndex = getRandIndex()
        img = tilesElements[randIndex].querySelector("img");
    }

    img.src = gameElementsSrc[1];
    setTimeout(() => {
        img.setAttribute("class" , "unHide");
        isPlayerTurn = true;
    },400);

    if(checkForCompWin()){
        updateScore("comp");
        restartGame();
        return;
    };
}

function checkForTie(){
        
    updateScore("tie");
    restartGame();
    return;

}

function checkForUserWin(){
    let i = 0 ;
    let cell = tilesElements;
    let xPath = "http://127.0.0.1:5500/public/img/icons8-x-48.png";
  
    if (
        //Column wining positions
        (cell[i].querySelector("img").src === xPath   && cell[i+3].querySelector("img").src === xPath && cell[i+6].querySelector("img").src === xPath )  || 
        (cell[i+1].querySelector("img").src === xPath && cell[i+4].querySelector("img").src === xPath && cell[i+7].querySelector("img").src === xPath)   ||
        (cell[i+2].querySelector("img").src === xPath && cell[i+5].querySelector("img").src === xPath && cell[i+8].querySelector("img").src === xPath)   ||
        
        //Row wining positions
        (cell[i].querySelector("img").src === xPath   && cell[i+1].querySelector("img").src === xPath && cell[i+2].querySelector("img").src === xPath)   ||
        (cell[i+3].querySelector("img").src === xPath && cell[i+4].querySelector("img").src === xPath && cell[i+5].querySelector("img").src === xPath)   ||
        (cell[i+6].querySelector("img").src === xPath && cell[i+7].querySelector("img").src === xPath && cell[i+8].querySelector("img").src === xPath)   ||
        
        //Diagonal wining positions
        (cell[i].querySelector("img").src === xPath   && cell[i+4].querySelector("img").src === xPath && cell[i+8].querySelector("img").src === xPath)    ||
        (cell[i+2].querySelector("img").src === xPath && cell[i+4].querySelector("img").src === xPath && cell[i+6].querySelector("img").src === xPath)  
        
        ) {
            win = 1;
            return true;
        }
        
}

function checkForCompWin(){
    let i = 0 ;
    let cell = tilesElements;
    let oPath = "http://127.0.0.1:5500/public/img/icons8-circle-48.png";

    if(
    //Column wining positions
    (cell[i].querySelector("img").src === oPath   && cell[i+3].querySelector("img").src === oPath && cell[i+6].querySelector("img").src === oPath )  || 
    (cell[i+1].querySelector("img").src === oPath && cell[i+4].querySelector("img").src === oPath && cell[i+7].querySelector("img").src === oPath)   ||
    (cell[i+2].querySelector("img").src === oPath && cell[i+5].querySelector("img").src === oPath && cell[i+8].querySelector("img").src === oPath)   ||

    //Row wining positions
    (cell[i].querySelector("img").src === oPath   && cell[i+1].querySelector("img").src === oPath && cell[i+2].querySelector("img").src === oPath)   ||
    (cell[i+3].querySelector("img").src === oPath && cell[i+4].querySelector("img").src === oPath && cell[i+5].querySelector("img").src === oPath)   ||
    (cell[i+6].querySelector("img").src === oPath && cell[i+7].querySelector("img").src === oPath && cell[i+8].querySelector("img").src === oPath)   ||

    //Diagonal wining positions
    (cell[i].querySelector("img").src === oPath   && cell[i+4].querySelector("img").src === oPath && cell[i+8].querySelector("img").src === oPath)    ||
    (cell[i+2].querySelector("img").src === oPath && cell[i+4].querySelector("img").src === oPath && cell[i+6].querySelector("img").src === oPath)  
    ) {
        win = 1;
        return true;
    }
    
}

function updateScore(player){
    switch(player){
        case "user": 
            userScoreElem.textContent = ++userScore;
            break;

        case "comp" :
            computerScoreElem.textContent = ++computerScore;
            break;

        case "tie" :
            tieScoreElem.textContent = ++tieScore;
    }
}

function restartGame(){
    switchOffButtons();
    setTimeout(() => {
        prepareNextRound();
    },500);
}


function prepareNextRound(){
    userSequence.length = 0;
    computerSequence.length = 0;
    totalTiles = tilesElements.length;
    isPlayerTurn = true 

    tilesElements.forEach(tile => {
        tile.classList.remove("off");

        let img = tile.querySelector("img");
        img.classList.remove("unHide");
        img.src = "";
        

    })
}

 function switchOffButtons(){
    tilesElements.forEach(tile => {
        tile.classList.add("off");
    })
}

let  getRandomIndex = () => { return Math.floor( Math.random() * tilesElements.length )};
let  getTileIndex  =  (e) => { return Object.entries(tilesElements).findIndex((div) => div[1] === e.target)};


// For future implementation of the animated tiles when computer or user wins 
// function animateTiles(tiles){
//     tiles.forEach(tile => {
//         let count = 0;
//         let img = tile.querySelector("img");
        
//         let timer = setInterval(() => {
//             count++;
//             if(count === 3) clearInterval(timer);
//             setTimeout(() => {
//                 img.style.visibility = "hidden";
//             },400);
    
//             setTimeout(() => {
//                 img.style.visibility = "visible";
//             },600);
//             count ++
//         },500)
//     })
// }