const snake = [
    { x: 150, y: 90 },
    { x: 120, y: 90 },
    { x: 90, y: 90 }
]

const foodInd = { x: 390, y: 150 }

let direction = "RIGHT";
let score = 0;
const size =30;
const gameBoxSize = 600;

const gameBox = document.getElementById("gameBox");
const scoreText = document.getElementById("score");

const food = document.createElement("div");
food.className = "food";
gameBox.appendChild(food);

food.style.cssText = `
    width : 30px;
    height : 30px;
    background-color : rgb(42, 241, 95);
    position : absolute;
`

function foodPostion() {
    food.style.left = foodInd.x + "px";
    food.style.top = foodInd.y + "px";
}

foodPostion();


function drawSnake() {

    document.querySelectorAll(".snake").forEach(block => block.remove());
        let bool = true;
    snake.forEach(post => {
        const snakeDiv = document.createElement("div");
        snakeDiv.className = "snake";
        
        if(bool==true){
        snakeDiv.style.cssText = `
            width : 30px;
            height : 30px;
            background-color : rgb(239, 70, 70);
            position : absolute;
            left: ${post.x}px;
            top:${post.y}px;
           `
           bool = false;
        }else{
            snakeDiv.style.cssText = `
                width : 30px;
                height : 30px;
                background-color : rgb(233, 140, 140);
                position : absolute;
                left: ${post.x}px;
                top:${post.y}px;
            `
        }
        gameBox.appendChild(snakeDiv);
    })

}
drawSnake();

document.addEventListener("keydown",(e)=>{
    if(e.key === "ArrowDown" && direction !== "UP")direction = "DOWN";
    if(e.key === "ArrowUp" && direction !== "DOWN")direction = "UP";
    if(e.key === "ArrowLeft" && direction !== "RIGHT")direction = "LEFT";
    if(e.key === "ArrowRight" && direction !== "LEFT")direction = "RIGHT";
});

function movement(){
    let head = {...snake[0]};

    if(direction === "UP") head.y -= size;
    if(direction === "DOWN") head.y += size;
    if(direction === "LEFT") head.x -= size;
    if(direction === "RIGHT") head.x += size;

    if(foodInd.x === head.x && foodInd.y === head.y){
        score+=10;
        scoreText.innerText = score;

        foodInd.x = Math.floor(Math.random() * (gameBoxSize/size)) *size;
        foodInd.y = Math.floor(Math.random() * (gameBoxSize/size)) *size;
        foodPostion();
    }else {
        snake.pop();
    }

    if(head.x<0 || head.x>=gameBoxSize || head.y<0 || head.y>=gameBoxSize ){
        alert("Game Over!!")
        clearInterval(moveLoop);
        return;
    }

    for(let i = 0; i<snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            alert("GAME OVER");
            clearInterval(moveLoop);
            return;
        }
    }

    snake.unshift(head);
    drawSnake();
}

function resetGame() {
    if (moveLoop) clearInterval(moveLoop);

    snake.length = 0;
    snake.push(
        { x: 150, y: 90 },
        { x: 120, y: 90 },
        { x: 90, y: 90 }
    );

    direction = "RIGHT";
    score = 0;
    scoreText.innerText = score;

    foodInd.x = Math.floor(Math.random() * (gameBoxSize / size)) * size;
    foodInd.y = Math.floor(Math.random() * (gameBoxSize / size)) * size;
    foodPostion();

    drawSnake();
}


let moveLoop ;
function startGame(){
    resetGame();
    moveLoop = setInterval(movement,200);
}
