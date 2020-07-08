import * as PIXI from 'pixi.js';
import Grid from './Grid'; 
import Cell from './Cell';

const game = new PIXI.Application({
    width: 600, 
    height: 600, 
    antialias: true,
    resolution: 1, 
    transparent: true,
});

const thing = new PIXI.Graphics();
let gameoverText = new PIXI.Text('Game Over',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});

let STATE = play, WIDTH = game.renderer.width, HEIGHT = game.renderer.height; 
thing.x = WIDTH/2; 
thing.y = HEIGHT/2
gameoverText.x = thing.x - 60; 
gameoverText.y = thing.y - 20; 


function gameover() {
    console.log("GameOver")
    game.stage.addChild(thing);
    game.stage.addChild(gameoverText)
    setTimeout(() => {
        grid.clear(game.stage)
    }, 1500)
}

let bunny; //temp
let count = 0; 
const grid = new Grid(WIDTH, HEIGHT, () => gameover())


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
    // game.stage.addChild(thing);
    game.stage.addChild(bunny);
    // game.stage.removeChild(bunny);
    bunny.visible = false; 

    // Ticker is called 60 times per second.
    game.ticker.add(gameloop)


    game.ticker.add(() => {
        count += 0.1;
    
        thing.clear();
        thing.lineStyle(10, 0xff0000, 1);
        thing.beginFill(0xffFF00, 0.5);
    
        thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
        thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
        thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
        thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
        thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
        thing.closePath();
    
        thing.rotation = count * 0.1;
        // gameoverText.rotation = count * 0.1; 
        // graphics.rotation = count * 1.2;
    });
}


function gameloop(delta) {
    STATE(delta)
}


function play(delta){
    bunny.rotation += delta * 0.1; 
}


export default game; 
