import * as PIXI from 'pixi.js';
import Grid from './Grid';
// import Stars from './Stars';
import GameOver from './GameOver';
import Background from './Background'
import closeImg from './assets/close.png';
import muteImg from './assets/sound.png';
import unMuteImg from './assets/mute.png'; 
import Header from './Header';

const game = new PIXI.Application({
    width: 600,
    height: 600,
    antialias: true,
    resolution: 1,
    transparent: true,
});

game.renderer.resize(window.innerWidth, window.innerHeight)


let STATE = play;
export const WIDTH = game.renderer.width;
export const HEIGHT = game.renderer.height;
export const isMobile = WIDTH / HEIGHT <= 1;
export const GRID_SCALE = 650; // (HEIGHT - 650 >= 300) ? 650 : HEIGHT - 300; 
const MIN_MARGIN = 150; 
export const gridWidth = isMobile ? WIDTH - 30 : ((HEIGHT - GRID_SCALE >= (MIN_MARGIN*2)) ? GRID_SCALE : HEIGHT - (MIN_MARGIN*2));
export const gridX = isMobile ? 15 : WIDTH/2 - gridWidth/2;
export const gridY = HEIGHT/2 - (gridWidth/2);


const MAX_ROUNDS = 12;

let round = 1;
let isMuted = false; 
let totalDuration = 0;
let totalCorrect = 0;
let totalMoves = 0;



// const stars = new Stars(WIDTH, HEIGHT);


function onGameOver(duration, correctMoves, movesTotal) {
    totalDuration += duration;
    totalCorrect += correctMoves;
    totalMoves += movesTotal;
    // game.stage.addChild(stars.shape) 
    setTimeout(() => {
        grid.clear(game.stage, () => {
            header.remove(game.stage)
            gameOver.draw(game.stage, round, totalDuration, totalCorrect / totalMoves)
        })
    }, 1500)
}

function gameclear(duration, correctMoves, movesTotal) {
    totalDuration += duration;
    totalCorrect += correctMoves;
    totalMoves += movesTotal;
    round += 1;
    if (round > MAX_ROUNDS) {
        setTimeout(() => {
            grid.clear(game.stage, () => {
                // game.stage.addChild(stars.shape)
                header.remove(game.stage)
                gameOver.draw(game.stage, round - 1, totalDuration, totalCorrect / totalMoves)
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



const gameOver = new GameOver(gridX, gridY, gridWidth, WIDTH, HEIGHT, isMobile, round, restart)

// gameOver.draw(game.stage) // remove later

const background = new Background(WIDTH, HEIGHT);
let header;
const grid = new Grid(gridX, gridY, gridWidth, gridWidth, round, false, (d, c, t) => onGameOver(d, c, t), (d, c, t) => gameclear(d, c, t))

// const cell = new Cell(10, 10, 100, 100, '24')

function loadingProgress(loader, resource) {
    console.log("Loading Progress")
    console.log("---loading:" + resource.url)
    console.log("---progress: " + loader.progress + "%")
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
    .add('unmuteBtn', unMuteImg)
    .load(setup)


function setup(loader, resources) {
    console.log("Setup Initiated")
    // bunny = new PIXI.Sprite.from('./assets/bunny.png'); //
    bunny = new PIXI.Sprite(resources.bunny.texture);

    header = new Header(resources, round, MAX_ROUNDS, isMobile, onQuit, onMute)
    // STATE = play; 


    bunny.x = WIDTH / 2;
    bunny.y = HEIGHT / 2;

    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    background.draw(game.stage)
    header.draw(game.stage, round)
    grid.draw(game.stage)

    game.stage.addChild(bunny);
    // game.stage.removeChild(bunny);
    bunny.visible = false;

    // Ticker is called 60 times per second.
    game.ticker.add(gameloop)
}


function restart() {
    console.log("Restarting Game")
    round = 1;
    totalDuration = 0;
    totalCorrect = 0;
    totalMoves = 0;
    header.draw(game.stage, round) 
    gameOver.remove(game.stage)
    setTimeout(() => {
        grid.reset(game.stage, round);
    }, 1000)
}



function gameloop(delta) {
    STATE(delta)
}


function play(delta) {
    bunny.rotation += delta * 0.1;
    grid.update(delta);
    gameOver.update(delta, round);
    header.update(delta)
}


function onMute() {
    console.log("Muting Sounds")
    isMuted = !isMuted; 
}

export function isMute() {
    return isMuted;
}

function onQuit() {
    console.log("Quitting Game")
}

export default game; 
