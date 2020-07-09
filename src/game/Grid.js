import { Graphics } from 'pixi.js' 
import Cell from './Cell';
const MAX_ROWS = 6;  
const MAX_COLS = 6; 
const MAX_COUNT = 18; 
class Grid {
    constructor(posX, posY, gridWidth, gridHeight, gameover, gameclear) {
        const ROW_SIZE = Math.floor(Math.random() * (MAX_ROWS-3)) + 4; 
        const COL_SIZE = Math.floor(Math.random() * (MAX_COLS-3)) + 4; 
        console.log("gggg", gameover)
        this.gameover = gameover; 
        this.gameclear = gameclear; 
        this.strikes = 0; 
        this.checks = -1; 
        this.posX = posX; 
        this.posY = posY; 
        // this.gameover(); 
        this.board = new Graphics(); 
        this.board.beginFill(0xDCC3C8)
        this.board.drawRect(posX, posY, gridWidth, gridHeight)
        this.board.endFill(); 

        this.cellSize = gridWidth/MAX_ROWS; 

        this.cells = []

        let count = 0; 
        let checks = 0; 
        for (let i = 0; i < ROW_SIZE; i++) {
            for (let j = 0; j< COL_SIZE; j++) {

                const posX = this.posX + i*this.cellSize + (gridWidth-(ROW_SIZE*this.cellSize))/2; 
                const posY = this.posY + j*this.cellSize + (gridHeight-(COL_SIZE*this.cellSize))/2; 
                let active = false;
                if ((Math.floor(Math.random() * 10)%3 === 0) && count < MAX_COUNT){
                    active = true; 
                    count += 1; 
                    checks += 1; 
                }
                this.cells.push(new Cell(posX, posY, this.cellSize, this.cellSize, `${i}-${j}`, active, () => this.addStrike(), () => this.addCheck()))
            }
        }

        this.checks = checks; 

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
        this.cells.forEach(cell => cell.unClickable(() => {
            stage.removeChild(cell.square)
        }))
    }

    update(delta) {
        this.cells.forEach(cell => cell.update(delta))
    }

    addCheck() {
        console.log("add Check", this.checks)
        this.checks -= 1; 
        if (this.checks === 0) {
            this.gameclear();
        }
    }

    addStrike() {
        console.log("add Strike", this.strikes)
        this.strikes += 1; 
        if (this.strikes > 2) {
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