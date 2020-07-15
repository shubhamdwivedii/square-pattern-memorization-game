import { Graphics } from 'pixi.js';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'; 
import Stars from './Stars'; 
import ExploreMoreButton from './buttons/ExploreMoreGames';
import ResultBox from './buttons/ResultBox'; 
import PlayAgain from './buttons/PlayAgain'; 

class GameOver {
    constructor(posX, posY, width, screenWidth, screenHeight, isMobile, round, restartGame) {
        this.posX = posX;
        this.posY = posY; 
        this.width = width; 
        this.screenWidth = screenWidth; 
        this.screenHeight = screenHeight; 
        this.round = round; 
        this.stars = new Stars(round)
    
        this.exploreMore = new ExploreMoreButton()

        this.resultBox = new ResultBox()

        this.playAgainBtn = new PlayAgain(() => restartGame())
    }

    draw(stage, round, timeTaken, ratio) {
        this.round = round; 
        this.stars.draw(stage, round)
        this.resultBox.draw(stage, timeTaken, ratio);
        this.exploreMore.draw(stage);
        this.playAgainBtn.draw(stage);
    }

    remove(stage) {
        this.stars.remove(stage)
        this.resultBox.remove(stage)
        this.exploreMore.remove(stage)
        this.playAgainBtn.remove(stage);
    }

    update(delta) {
        this.stars.update(delta)
        this.exploreMore.update(delta)
        this.resultBox.update(delta);
        this.playAgainBtn.update(delta);
    }


   
}

export default GameOver;