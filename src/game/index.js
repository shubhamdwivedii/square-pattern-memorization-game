import * as PIXI from 'pixi.js';
import Grid from './Grid'; 
import Stars from './Stars';

const game = new PIXI.Application({
    width: 600, 
    height: 600, 
    antialias: true,
    resolution: 1, 
    transparent: true,
});

game.renderer.resize(window.innerWidth, window.innerHeight)

// let gameoverText = new PIXI.Text('Game Over',{fontFamily : 'Apercu', fontSize: 24, fill : 0xff1010, align : 'center'});
const fontStyle = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontWeight: "bold",
    align: 'center', 
});
const gameoverText = new PIXI.Text('Game Over', fontStyle);
const gameclearText = new PIXI.Text('Grid Clear!', fontStyle);


let STATE = play, WIDTH = game.renderer.width, HEIGHT = game.renderer.height; 
gameoverText.x = WIDTH/2 - 60; 
gameoverText.y = HEIGHT/2 - 20; 

const stars = new Stars(WIDTH, HEIGHT);

function gameover() {
    console.log("GameOver")
    game.stage.addChild(stars.shape)
    game.stage.addChild(gameoverText)
    setTimeout(() => {
        grid.clear(game.stage)
    }, 1500)


}

function gameclear() {
    console.log("GridClear")
    game.stage.addChild(stars.shape)
    game.stage.addChild(gameclearText)
    setTimeout(() => {
        grid.clear(game.stage)
    }, 1500)
}

let bunny; //temp



const isMobile = WIDTH/HEIGHT <= 1; 

const gridWidth = isMobile ? WIDTH - 50 : WIDTH/3;
const gridX = isMobile ? 25 : WIDTH/3; 
const gridY = HEIGHT/2 - (gridWidth/2) - 50;

const grid = new Grid(gridX, gridY, gridWidth, gridWidth, () => gameover(), () => gameclear())

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

game.loader.add('bunny', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png').load(setup)


function setup(loader, resources) {
    console.log("Setup Initiated")
    bunny = new PIXI.Sprite(resources.bunny.texture);

    // STATE = play; 


    bunny.x = WIDTH/2; 
    bunny.y = HEIGHT/2; 

    bunny.anchor.x = 0.5; 
    bunny.anchor.y = 0.5; 

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
}


export default game; 
