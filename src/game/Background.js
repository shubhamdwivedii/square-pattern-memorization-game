import { Graphics } from 'pixi.js';

const TILES_PER_COL = 18;
const MATRIX_SIZE = 6; 
const OFFSET = 10; 

class Background {
    constructor(screenWidth, screenHeight) {
        this.cellWidth = screenHeight/TILES_PER_COL; 

        const topLeft = getTriangle(screenWidth, screenHeight, this.cellWidth)
        console.log("LLLL", topLeft)
        // this.tiles = [new Tile(OFFSET, 0,this.cellWidth)]
        this.tiles = topLeft.map(tile => new Tile(tile.x, tile.y, this.cellWidth - 4))
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
    const triangles = []; 

    const topLeft = []
    // for (let i = 0; i < MATRIX_SIZE ; i++) {
    //     for (let j =0; j < MATRIX_SIZE ; j++) {
    //         if (i + j > MATRIX_SIZE -1) {
    //             continue; 
    //         } 
    //         if (Math.floor(Math.random() * 10)%3 === 0) {
    //             topLeft.push({ x: i * cellWidth, y: j* cellWidth }) 
    //         }
    //     }
    // }
    // for (let i = 0; i < MATRIX_SIZE ; i++) {
    //     for (let j =0; j < MATRIX_SIZE ; j++) {
    //         if (i + j > MATRIX_SIZE -1) {
    //             continue; 
    //         } 
    //         if (Math.floor(Math.random() * 10)%3 === 0) {
    //             topLeft.push({ x: i * cellWidth, y: j* cellWidth }) 
    //         }
    //     }
    // }

    const topL = [[0,1,0,1,0], [1,0,1,0,0], [1,1,0,0,0], [0,0,0,0,0], [1,0,0,0,0]]
    topL.forEach((row, i) => {
        row.forEach((col, j) => {
            if(col) {
                topLeft.push({ x: j * cellWidth, y: i *cellWidth})
            }
        })
    })

    // for (let i = 0; i < MATRIX_SIZE ; i++) {
    //     for (let j =0; j < MATRIX_SIZE ; j++) {
    //         if (i + j < MATRIX_SIZE -1) {
    //             continue; 
    //         } 
    //         // if (Math.floor(Math.random() * 10)%3 === 0) {
    //             topLeft.push({ x: screenWidth - (i * cellWidth), y: (j* cellWidth) }) 
    //         // }
    //     }
    // }

    // for (let i = 0; i < MATRIX_SIZE ; i++) {
    //     for (let j =0; j < MATRIX_SIZE ; j++) {
    //         if (i + j > MATRIX_SIZE -1) {
    //             continue; 
    //         } 
    //         // if (Math.floor(Math.random() * 10)%3 === 0) {
    //             topLeft.push({ x: i * cellWidth, y: j* cellWidth }) 
    //         // }
    //     }
    // }

    // for (let i = 0; i < MATRIX_SIZE ; i++) {
    //     for (let j =0; j < MATRIX_SIZE ; j++) {
    //         if (i<j) {
    //             continue; 
    //         } 
    //         // if (Math.floor(Math.random() * 10)%3 === 0) {
    //             topLeft.push({ x: (i * cellWidth), y: j* cellWidth }) 
    //         // }
    //     }
    // }

    return topLeft; 
    // topLeft (i + j > MATRIX_SIZE -1)
    // bottomLeft i>j
    // topRight i<j
    // bottomRight (i + j < MATRIX_SIZE -1)
}


export default Background; 

