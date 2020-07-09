import { Graphics } from 'pixi.js' 
import Cell from './Cell';
const MAX_ROWS = 8;  
const MAX_COLS = 8; 
const MAX_COUNT = 25; 
class Grid {
    constructor(screenWidth, screenHeight, gameover) {
        const ROW_SIZE = Math.floor(Math.random() * (MAX_ROWS-3)) + 4; 
        const COL_SIZE = Math.floor(Math.random() * (MAX_COLS-3)) + 4; 
        console.log("gggg", gameover)
        this.gameover = gameover; 
        this.strikes = 0; 
        // this.gameover(); 
        this.board = new Graphics(); 
        this.board.beginFill(0xDCC3C8)
        this.board.drawRect(0, 0, screenWidth, screenHeight)
        this.board.endFill(); 

        this.cellSize = screenWidth/MAX_ROWS; 

        this.cells = []

        let count = 0; 
        for (let i = 0; i < ROW_SIZE; i++) {
            for (let j = 0; j< COL_SIZE; j++) {

                const posX = i*this.cellSize + (screenWidth-(ROW_SIZE*this.cellSize))/2; 
                const posY = j*this.cellSize + (screenHeight-(COL_SIZE*this.cellSize))/2; 
                console.log("sq",i,j,"pos", posX, posY, "size", this.cellSize)
                let active = false;
                if ((Math.floor(Math.random() * 10)%3 === 0) && count < MAX_COUNT){
                    active = true; 
                    count += 1; 
                }
                this.cells.push(new Cell(posX, posY, this.cellSize, this.cellSize, `${i}-${j}`, active, () => this.addStrike()))
            }
        }

        setTimeout(this.hideActiveCells.bind(this), 4000)
    }

    draw(stage) {
        // stage.addChild(this.board);
        this.cells.forEach(cell => {
            stage.addChild(cell.square)
        })
    }

    clear(stage) {
        // this.cells.forEach(cell => {
        //     stage.removeChild(cell.square)
        // })
        // this.cells = [];
        this.cells.forEach(cell => cell.unClickable())
    }

    addStrike() {
        console.log("add Strike", this.strikes)
        this.strikes += 1; 
        if (this.strikes > 2) {
            console.log("OUT", this.gameover)
            this.gameover(); 
        }
    }


    hideActiveCells() {
        this.cells.forEach(cell => {
            cell.hideActive(); 
        })
    }
}

export default Grid; 