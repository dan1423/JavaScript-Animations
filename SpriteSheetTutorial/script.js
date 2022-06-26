

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 575;
const spriteHeight = 523;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

let playerState = 'idle';

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name:'idle',
        frames:7,
    },
    {
        name:'jump',
        frames:7,
    },
    {
        name:'fall',
        frames:7,
    },
    {
        name:'run',
        frames:9,
    },
    {
        name:'dizzy',
        frames:11,
    },
    {
        name:'sit',
        frames:5,
    },
    {
        name:'roll',
        frames:7,
    },
    {
        name:'bite',
        frames:7,
    },
    {
        name:'ko',
        frames:12,
    },
    {
        name:'getHit',
        frames:4,
    }
];
animationStates.forEach((state,index)=>{
    let frames = {
        loc:[],
    }
  
    for(j=0;j<state.frames;j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x:positionX, y:positionY});   
    }
    spriteAnimations[state.name] = frames;
});

setDropdown();

let countc = 1;
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
   
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage,frameX ,frameY,
        spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
       if(countc ==1){
        countc = 2;
       }
        gameFrame++;
        requestAnimationFrame(animate);
}
animate();

function setDropdown(){
    let dropdown = document.querySelector('#actionDropwdown');
    animationStates.forEach(e=>{
        let op = new Option(e.name,e.name);
       dropdown.add(op,undefined);
    })

    dropdown.addEventListener('change',()=>{
        playerState = dropdown.value;
    });
}