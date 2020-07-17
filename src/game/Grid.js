import { Graphics } from 'pixi.js'
import Cell from './Cell';
import TimeBar from './TimeBar';
import NextLevel from './LevelGenerator';

const MAX_ROWS = 6;
// const MAX_COLS = 6; 
// const MAX_COUNT = 18; 
class Grid {
    constructor(posX, posY, gridWidth, gridHeight, resources, round, isRandom, gameover, gameclear) {
        // this.rowSize = Math.floor(Math.random() * (MAX_ROWS-3)) + 4; 
        // this.colSize = Math.floor(Math.random() * (MAX_COLS-3)) + 4; 
        this.width = gridWidth;
        this.height = gridHeight;
        this.isRandom = isRandom
        this.gameover = gameover;
        this.resources = resources; 
        this.cleared = false;
        this.isover = false;
        this.gameclear = gameclear;
        this.strikes = 0;
        this.posX = posX;
        this.posY = posY;
        // this.gameover(); 
        this.board = new Graphics();
        this.board.beginFill(0x4b85f0, 0.1)
        this.board.drawRect(posX, posY, gridWidth, gridHeight)
        this.board.endFill();
        this.round = round; 
        this.cellSize = gridWidth / MAX_ROWS;
    }

    initialize(round) {
        const level = NextLevel(round, this.isRandom)
        this.checks = level.checks;
        this.totalTurns = 0;
        this.correctTurns = 0;
        this.cleared = false;
        this.isover = false;
        this.cells = []
        this.timeBar = new TimeBar(this.posX + (this.width - (level.cols * this.cellSize)) / 2, this.posY + (this.height - (level.rows * this.cellSize)) / 2 - (this.cellSize / 4), (level.cols * this.cellSize), this.cellSize / 8, level.demo, level.time)
        level.cells.forEach((row, j) => {
            row.forEach((col, i) => {
                const posX = this.posX + i * this.cellSize + (this.width - (level.cols * this.cellSize)) / 2;
                const posY = this.posY + j * this.cellSize + (this.height - (level.rows * this.cellSize)) / 2;
                this.cells.push(new Cell(posX, posY, this.cellSize, this.cellSize, this.resources, (col === 1), () => this.addStrike(), () => this.addCheck(), () => (this.isover || this.cleared)))
            })
        })
        // SSSSS Add check if every tile is loaded or not
       
    }

    draw(stage) {
        this.initialize(this.round)
        // stage.addChild(this.board);
        this.startTime = new Date(); // reinitialize when demo is over

        if (this.timeBar) {
            this.timeBar.draw(stage)
        }
        this.cells.forEach(cell => {
            cell.draw(stage)
        })
        setTimeout(this.showActiveCells.bind(this), 2000)
    }

    clear(stage, onComplete) {
        const last = this.cells.length - 1
        this.cells.forEach((cell, idx) => cell.unClickable(() => {
            stage.removeChild(cell.square)
            if (idx >= last) {
                onComplete();
            }
        }))
        stage.removeChild(this.timeBar.shape)
    }

    reset(stage, round) {
        this.round = round; 
        this.draw(stage);
    }

    update(delta) {
        this.timeBar.update(delta)
        this.cells.forEach(cell => cell.update(delta))
    }

    addCheck() {
        this.checks -= 1;
        this.totalTurns += 1;
        this.correctTurns += 1;
        if (this.checks === 0) {
            this.cleared = true;
            const duration = (new Date() - this.startTime) / 1000;
            this.gameclear(duration, this.correctTurns, this.totalTurns);
            return true;
        }
        return false;
    }

    addStrike() {
        this.strikes += 1;
        this.totalTurns += 1;
        if (this.strikes > 2) {
            // this.isover = true; 
            // this.gameover(); 
        }
    }

    showActiveCells() {
        this.cells.forEach(cell => {
            cell.showActive();
        })
        setTimeout(() => {
            this.timeBar.startDemo(() => {
                this.startTime = new Date(); 
                this.hideActiveCells(); //.bind(this)
            })
        }, 380)
    }

    hideActiveCells() {
        this.cells.forEach(cell => {
            cell.hideActive();
        })

        setTimeout(() => {
            this.timeBar.startPlay((current) => {
                if (this.timeBar === current) {
                    if (!this.cleared) {
                        if (!this.isover) {
                            this.isover = true;
                            const duration = (new Date() - this.startTime) / 1000;
                            this.gameover(duration, this.correctTurns, this.totalTurns);
                        }
                    }
                }
            })
        }, 380)

    }
}

export default Grid; 