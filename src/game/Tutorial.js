import { Graphics } from 'pixi.js'
import Entity from './Entity'; 
import Cell from './Cell'; 
import GameStart from './GameStart'; 
import * as PIXI from 'pixi.js'; 
import gsap from 'gsap'; 

const MAX_ROWS = 4; 
const FONT_SIZE = 24; 
const RELATIVE_SCALE = 5/4.5; 
const DEMO_TIME = 4000; 
const PLAY_TIME = 10000; 


class Tutorial extends Entity {
    constructor(resources, onStart) {
        super(); 


        this.reposition = this.reposition.bind(this);
        // this.cleared = false; 
        this.onStart = onStart; 


        this.instructions = new PIXI.Text("Remember and tap the highlighted tiles before time runs out")
        this.insOffsetX = 0; 
        this.insOffsetY = 0; 
        
        this.resources = resources; 
        this.cellSize = this.grid.w / MAX_ROWS; 
        this.scale = this.screen.isMobile ? this.grid.s : this.grid.s * RELATIVE_SCALE; 
    }


    initialize() {
        const level = {
            rows: 3, cols: 3, cells: [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ], demo: DEMO_TIME, time: PLAY_TIME, checks: 4, 
        }

        this.checks = level.checks; 
        this.strikes = 0; 
        this.cleared = false; 
        this.cells = []; 
        this.gameStart = new GameStart(this.onStart); 
        level.cells.forEach((row, j) => {
            row.forEach((col, i) => {
                const posX = this.grid.x + i * this.cellSize + (this.grid.w - (level.cols * this.cellSize)) / 2;
                const posY = this.grid.y + j * this.cellSize + (this.grid.w - (level.rows * this.cellSize)) / 2;
                this.cells.push(new Cell(posX, posY, this.cellSize, this.cellSize, this.resources, (col === 1), () => this.addStrike(), () => this.addCheck(), () => (this.isover || this.cleared)))
            })
        })
    }

    draw(stage) {
        this.initialize()
        this.instructions = new PIXI.Text(this.instructions.text, this.getFontStyle(this.scale, this.grid.w))
        this.gameStart.draw(stage)
        // this.starTime = new Date(); 
        this.cells.forEach(cell => {
            cell.draw(stage)
        })
        stage.addChild(this.instructions)
        setTimeout(this.showActiveCells.bind(this), 2000)
    }

    remove(stage, onComplete) {
        const last = this.cells.length - 1; 
        stage.removeChild(this.instructions)
        this.gameStart.remove(stage);
        this.cells.forEach((cell, idx) => cell.unClickable(() => {
            stage.removeChild(cell.square)
            if (idx >= last) {
                onComplete(); 
            }
        }))
        // remove everything else 
    }

    update(delta) {
        this.instructions.x = this.insOffsetX + this.screen.origin.x - this.instructions.width/2; 
        this.instructions.y = this.insOffsetY + this.grid.y + this.grid.w  //this.instructions.height; 
        this.gameStart.update(delta)
        this.cells.forEach(cell => cell.update(delta))
    }


    addCheck() {
        this.checks -= 1;
        // this.totalTurns += 1;
        // this.correctTurns += 1;
        if (this.checks === 0) {
            this.cleared = true;
            this.onClear(); 
            // const duration = (new Date() - this.startTime) / 1000;
            // this.gameclear(duration, this.correctTurns, this.totalTurns);
            return true;
        }
        return false;
    }

    addStrike() {
        this.strikes += 1;
    }

    onClear() {
        const moveX = this.screen.isMobile ? 0 : -(this.grid.w/2);
        const moveY = this.screen.isMobile ? -(this.grid.w/2) : 0; 
        const textOffset = this.screen.isMobile ? { x: this.screen.w * 3/2, y: 0 } : { x: 0, y: this.screen.h * 3/2 } 
        setTimeout(() => {
            // this.onStart(); 
            gsap.to(this, {
                insOffsetX: textOffset.x,
                insOffsetY: textOffset.y, 
                ease: 'power1', 
                delay: 0.2,
                duration: 0.5, 
                paused: false, 
            })
            this.cells.forEach(cell => cell.moveBy(moveX, moveY, () => {}))
            this.gameStart.show();
        }, 1000)
    }

    showActiveCells() {
        this.cells.forEach(cell => {
            cell.showActive();
        })
        // setTimeout(() => {
        //     this.timeBar.startDemo(() => {
        //         this.hideActiveCells(); //.bind(this)
        //     })
        // }, 380)

        setTimeout(() => {
            this.hideActiveCells(); 
        }, DEMO_TIME)
    }


    hideActiveCells() {
        this.cells.forEach(cell => {
            cell.hideActive();
        })
    }

    getFontStyle(scale, width) {
        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE * scale, 
            wordWrap: true, 
            wordWrapWidth: width - width/5, 
            align: "center", 
            fill: "#727575"
        })
        return fontStyle; 
    }

}

export default Tutorial; 