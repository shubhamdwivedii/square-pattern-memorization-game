import * as PIXI from 'pixi.js';
import Grid from './Grid';
import Tutorial from './Tutorial';
import GameOver from './GameOver';
import Background from './Background'
import Loading from './Loading';

import closeImg from './assets/close.png';
import muteImg from './assets/sound.png';
import unMuteImg from './assets/mute.png';
import starImg from './assets/star.png';
import starAlt from './assets/starAlt.png';
import checkSnd from './assets/check.mp3';
import clearSnd from './assets/clear.mp3';
import strikeSnd from './assets/strike.mp3';


import Header from './Header';

const game = new PIXI.Application({
    width: 600,
    height: 600,
    antialias: true,
    resolution: 1,
    transparent: true,
});

game.renderer.resize(window.innerWidth, window.innerHeight)


let STATE = splash;
const FOREVER_MODE = false; 
export const WIDTH = game.renderer.width;
export const HEIGHT = game.renderer.height;
export const isMobile = WIDTH / HEIGHT <= 1;
export const GRID_SCALE = 650; // (HEIGHT - 650 >= 300) ? 650 : HEIGHT - 300; 
const MIN_MARGIN = 150;
export const gridWidth = isMobile ? WIDTH - 30 : ((HEIGHT - GRID_SCALE >= (MIN_MARGIN * 2)) ? GRID_SCALE : HEIGHT - (MIN_MARGIN * 2));
export const gridX = isMobile ? 15 : WIDTH / 2 - gridWidth / 2;
export const gridY = HEIGHT / 2 - (gridWidth / 2);

const container = new PIXI.Container(); 
container.sortableChildren = true; 
game.stage.addChild(container);

const MAX_ROUNDS = 12;

let round = 1;
let isMuted = false;
let totalDuration = 0;
let levelsCleared = 0;
let totalCorrect = 0;
let totalMoves = 0;

function onGameOver(duration, correctMoves, movesTotal) {
    totalDuration += duration;
    totalCorrect += correctMoves;
    totalMoves += movesTotal;


    if (!FOREVER_MODE) {
        // To Enable GameOver on TimeOut
        setTimeout(() => {
            grid.clear(container, () => {
                header.remove(container)
                gameOver.draw(container, round, levelsCleared, totalDuration, totalCorrect / totalMoves)
            })
        }, 1500)
    } else {
        // Never GameOver
        round += 1;
        if (round > MAX_ROUNDS) {
            setTimeout(() => {
                grid.clear(container, () => {
                    header.remove(container)
                    gameOver.draw(container, round, levelsCleared, totalDuration, totalCorrect / totalMoves)
                })
            }, 1500)
        } else {
            setTimeout(() => {
                grid.clear(container, () => setTimeout(() => {
                    grid.reset(container, round)
                    header.next();
                }, 400))
            }, 1500)
        }
    }


}

function onGameClear(duration, correctMoves, movesTotal) {
    totalDuration += duration;
    totalCorrect += correctMoves;
    totalMoves += movesTotal;
    levelsCleared += 1;
    round += 1;
    if (round > MAX_ROUNDS) {
        console.log("Max ROund reached")
        setTimeout(() => {
            grid.clear(container, () => {
                header.remove(container)
                gameOver.draw(container, round - 1, levelsCleared, totalDuration, totalCorrect / totalMoves)
            })
        }, 1500)
    } else {
        setTimeout(() => {
            grid.clear(container, () => setTimeout(() => {
                grid.reset(container, round)
                header.next();
            }, 400))
        }, 1500)
    }
}


const background = new Background(WIDTH, HEIGHT);
const loadingScreen = new Loading();

let gameOver;
let header;
let grid;
let tutorialGrid;

function initialise() {
    console.log("Initializing...")
    background.draw(container)
    loadingScreen.draw(container)
    game.ticker.add(gameloop)
}


function loadingProgress(loader, resource) {
    console.log("Loading Progress")
    console.log("---loading:" + resource.url)
    console.log("---progress: " + loader.progress + "%")
    loadingScreen.progress(loader.progress)
}

function loadingComplete() {
    console.log("Loading Complete")
    // remove splash screen here //
}

initialise();


game.loader.onComplete.add(loadingComplete);
game.loader.onProgress.add(loadingProgress);


game.loader
    .add('closeBtn', closeImg)
    .add('muteBtn', muteImg)
    .add('unmuteBtn', unMuteImg)
    .add('star', starImg)
    .add('starAlt', starAlt)
    .add('checkSnd', checkSnd)
    .add('clearSnd', clearSnd)
    .add('strikeSnd', strikeSnd)
    .load(setup)


function setup(loader, resources) {
    console.log("Setup Initiated")
    header = new Header(resources, round, MAX_ROUNDS, isMobile, onQuit, onMute)
    tutorialGrid = new Tutorial(resources, () => {
        tutorialGrid.remove(container, () => {
            header.draw(container, round)
            grid.draw(container)
            STATE = play;
        });
    })

    grid = new Grid(gridX, gridY, gridWidth, gridWidth, resources, round, false, (d, c, t) => onGameOver(d, c, t), (d, c, t) => onGameClear(d, c, t))
    gameOver = new GameOver(resources, round, restart)
    setTimeout(() => {
        loadingScreen.remove(container)
        setTimeout(() => {
            tutorialGrid.draw(container)
            // header.draw(container, round)
           // grid.draw(container)
 
            // Ticker is called 60 times per second.
            STATE = tutorial;
        }, 500)
    }, 1000)
}


function restart() {
    console.log("Restarting Game")
    round = 1;
    totalDuration = 0;
    totalCorrect = 0;
    totalMoves = 0;
    levelsCleared = 0;
    header.draw(container, round)
    gameOver.remove(container)
    setTimeout(() => {
        grid.reset(container, round);
    }, 1000)
}



function gameloop(delta) {
    STATE(delta)
}

function splash(delta) {
    loadingScreen.update(delta)
}

function tutorial(delta) {
    tutorialGrid.update(delta)
}

function play(delta) {
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
