let score = 0, left = 10;

let player = {
    x: 400,
    y: 330,
    dir: 0,
    speed: 5
}

class Kebab {
    constructor(){
        this.x = random(800) - 70;
        this.y = 0;
        this.speed = random(4) + 1;
    }
}

kebabs = [];

function random(n){
    return Math.floor(Math.random() * n);
}

let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 450;

elementsImg = new Image();
elementsImg.ready = false;
elementsImg.onload = isReady;
elementsImg.src = "../img/game/elements.png";

let keyClick = {};

document.addEventListener("keydown", function (event) {
    keyClick[event.keyCode] = true;
    move(keyClick);
},false);

document.addEventListener("keyup", function (event) {
    delete keyClick[event.keyCode];
},false);

function move(keyClick) {
    if(37 in keyClick){
        player.x -= player.speed;
        player.dir = 0;
    }
    if(39 in keyClick){
        player.x += player.speed;
        player.dir = 1;
    }
    if(player.x >=canvas.width-32){player.x = 0;}
    if(player.y >=canvas.height-32){player.y = 0;}
    if(player.x < 0){player.x = canvas.width - 32;}
    if(player.y < 0){player.y = canvas.height - 32;}
    render();
}

function isReady() {
    this.ready = true;
    play();
}

function play() {
    render();
    requestAnimationFrame(play);
}

function render() {
    context.drawImage(elementsImg,0,0, 800, 450,0,0,800,450);
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Wynik: " +score +"\nMożesz upuścić: " + left,2, 18 );
    if(player.dir === 0)
        context.drawImage(elementsImg,800, 70,55,120,player.x, 330, 55,120);
    else
        context.drawImage(elementsImg,800, 190,55,120,player.x, 330, 55,120);

    while(kebabs.length < 6){
        kebabs.push(new Kebab());
    }

    for(let i=0; i < 5; i++){
        kebabs[i].y += kebabs[i].speed;
        if(kebabs[i].y > 375) {
            kebabs.splice(i,i);
            left--;
        }else if (kebabs[i].x <= 55 + player.x && kebabs[i].x <= 55 + player.x && kebabs[i].y >= 270) {
            kebabs.splice(i,i);
            score++;
        } else
            context.drawImage(elementsImg,800,0,70,70, kebabs[i].x, kebabs[i].y, 70,70);
    }
}