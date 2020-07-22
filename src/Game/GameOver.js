import Stars from './Stars'; 
import ExploreMoreButton from './buttons/ExploreMoreGames';
import ResultBox from './buttons/ResultBox'; 
import PlayAgain from './buttons/PlayAgain'; 

class GameOver {
    constructor(resources, round, restartGame) {
        this.round = round; 
        this.stars = new Stars(resources, round)
        this.exploreMore = new ExploreMoreButton(() => restartGame())
        this.resultBox = new ResultBox()
        // this.playAgainBtn = new PlayAgain(() => restartGame())
    }

    draw(stage, round, levelsCleared, timeTaken, ratio) {
        this.round = round; 
        this.stars.draw(stage, round, levelsCleared);
        this.resultBox.draw(stage, timeTaken, ratio);
        this.exploreMore.draw(stage);
        // this.playAgainBtn.draw(stage);
    }

    remove(stage) {
        this.stars.remove(stage)
        this.resultBox.remove(stage)
        this.exploreMore.remove(stage)
        // this.playAgainBtn.remove(stage);
    }

    update(delta) {
        this.stars.update(delta)
        this.exploreMore.update(delta)
        this.resultBox.update(delta);
        // this.playAgainBtn.update(delta);
    }


   
}

export default GameOver;