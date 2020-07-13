import * as PIXI from 'pixi.js';
import Grid from './Grid'; 
// import Stars from './Stars';
import GameOver from './GameOver'; 
import Background from './Background'
import closeImg from './assets/close.png'; 
import muteImg from './assets/sound.png';
import Header from './Header'; 

const game = new PIXI.Application({
    width: 600, 
    height: 600, 
    antialias: true,
    resolution: 1, 
    transparent: true,
});

game.renderer.resize(window.innerWidth, window.innerHeight)


let STATE = play, WIDTH = game.renderer.width, HEIGHT = game.renderer.height; 
const MAX_ROUNDS = 12; 

let round = 1; 

// const stars = new Stars(WIDTH, HEIGHT);


function onGameOver() {
    console.log("GameOver")
    // game.stage.addChild(stars.shape)
    gameOver.draw(game.stage)
    setTimeout(() => {
        grid.clear(game.stage, () => console.log("Cleared"))
    }, 1500)
}

function gameclear() {
    console.log("GridClear")
    round += 1; 
    if (round > MAX_ROUNDS) {
        setTimeout(() => {
            grid.clear(game.stage, () => {
                // game.stage.addChild(stars.shape)
                gameOver.draw(game.stage)
            })
        }, 1500)
    } else {
        setTimeout(() => {
            grid.clear(game.stage, () => setTimeout(() => grid.reset(game.stage, round), 400))
            header.next(); 
        }, 1500)
    }
}

let bunny; //temp


const isMobile = WIDTH/HEIGHT <= 1; 

const gridWidth = isMobile ? WIDTH - 50 : WIDTH/3;
const gridX = isMobile ? 25 : WIDTH/3; 
const gridY = HEIGHT/2 - (gridWidth/2) + 50;

const gameOver = new GameOver(gridX, gridY, gridWidth, WIDTH, HEIGHT, isMobile, round)

// gameOver.draw(game.stage) // remove later

const background = new Background(WIDTH, HEIGHT);
let header; 
const grid = new Grid(gridX, gridY, gridWidth, gridWidth, round, false, () => onGameOver(), () => gameclear())

// const cell = new Cell(10, 10, 100, 100, '24')

function loadingProgress(loader, resource) {
    console.log("Loading Progress")
    console.log("---loading:" + resource.url)
    console.log("---progress: "+ loader.progress + "%")
}

function loadingComplete() {
    console.log("Loading Complete")
}

game.loader.onComplete.add(loadingComplete); 
game.loader.onProgress.add(loadingProgress); 


game.loader
    .add('bunny', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png')
    .add('closeBtn', closeImg)
    .add('muteBtn', muteImg)
    .load(setup)


function setup(loader, resources) {
    console.log("Setup Initiated")
    // bunny = new PIXI.Sprite.from('./assets/bunny.png'); //
    bunny = new PIXI.Sprite(resources.bunny.texture);

    header = new Header(gridX, gridY, gridWidth, resources, round, MAX_ROUNDS, isMobile)
    // STATE = play; 


    bunny.x = WIDTH/2; 
    bunny.y = HEIGHT/2; 

    bunny.anchor.x = 0.5; 
    bunny.anchor.y = 0.5; 

    background.draw(game.stage)
    header.draw(game.stage)
    grid.draw(game.stage)
    
    game.stage.addChild(bunny);
    // game.stage.removeChild(bunny);
    bunny.visible = false; 

    // Ticker is called 60 times per second.
    game.ticker.add(gameloop)
}


function gameloop(delta) {
    STATE(delta)
}


function play(delta){
    bunny.rotation += delta * 0.1; 
    grid.update(delta); 
    gameOver.update(delta, round);
}


export default game; 
