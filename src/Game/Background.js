import { Graphics } from 'pixi.js';

const TILES_PER_COL = 18;
const MATRIX_SIZE = 6; 
const OFFSET = 10; 

class Background {
    constructor(screenWidth, screenHeight) {
        this.cellWidth = screenHeight/TILES_PER_COL; 
        const tiles = getTriangle(screenWidth, screenHeight, this.cellWidth)
        // this.tiles = [new Tile(OFFSET, 0,this.cellWidth)]
        this.tiles = tiles.map(tile => new Tile(tile.x, tile.y, this.cellWidth - 4))
    }

    update(delta) {
        this.tiles.forEach(tile => tile.update(delta))
    }

    draw(stage) {
        this.tiles.forEach(tile => {
            stage.addChild(tile.tile)
            tile.draw()
        })
    }
}

class Tile {
    constructor(posX, posY, width) {
        this.tile = new Graphics(); 
        this.posX = posX; 
        this.posY = posY; 
        this.width = width; 
    }


    update(delta) {
        this.draw()
    }

    draw() {
        this.tile.clear(); 
        this.tile.beginFill(0x4b85f0, 0.1)
        this.tile.drawRoundedRect(this.posX, this.posY, this.width, this.width, 4)
        this.tile.endFill(); 
    }
}

function getTriangle(screenWidth, screenHeight, cellWidth) {
    const tiles = []
    const topR = [[0,1,0,1,1], [0,0,1,0,1], [0,0,1,0,0], [0,0,0,0,1], [0,0,0,1,1]]
    const topL = [[0,1,0,1,0], [1,0,1,0,0], [1,1,0,0,0], [0,0,0,0,0], [1,0,0,0,0]]
    const botL = [[0,0,0,0,0], [0,1,0,0,0], [0,0,1,0,0], [1,1,0,0,1], [0,1,1,1,0,1]]
    const botR = [[0,0,0,0,0], [0,0,0,0,1], [0,0,1,0,0], [0,0,0,1,1], [1,1,0,1,1,1]]

    topL.forEach((row, i) => {
        row.forEach((col, j) => {
            if(col) {
                tiles.push({ x: j * cellWidth, y: i *cellWidth})
            }
        })
    })

    topR.forEach((row, i) => {
        row.forEach((col, j) => {
            if(col) {
                tiles.push({ x: (screenWidth - (5 * cellWidth)) +  j * cellWidth, y: i *cellWidth})
            }
        })
    })

    botL.forEach((row, i) => {
        row.forEach((col, j) => {
            if(col) {
                tiles.push({ x: j * cellWidth, y: (screenHeight - (5 * cellWidth)) + i *cellWidth})
            }
        })
    })

    botR.forEach((row, i) => {
        row.forEach((col, j) => {
            if(col) {
                tiles.push({ x: (screenWidth - (5 * cellWidth)) + j * cellWidth, y: (screenHeight - (5 * cellWidth)) + i *cellWidth})
            }
        })
    })


    return tiles; 
}


export default Background; 

