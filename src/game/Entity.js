import {
    HEIGHT, 
    WIDTH, 
    gridWidth, 
    gridX, 
    gridY, 
} from '../game'

class Entity {
    constructor(posX = WIDTH/2, posY = HEIGHT/2, width = 10, height = 10, radius = 0, rotation = 0) {
        this.x = posX; 
        this.y = posY; 
        this.w = width; 
        this.h = height;
        this.r = radius; 
        this.a = rotation; 

        this.position = {
            x: posX, 
            y: posY, 
        } 
        this.screen = {
            w: WIDTH,
            h: HEIGHT,
            origin: {
                x: WIDTH/2,
                y: HEIGHT/2,
            }  
        }
        this.grid = {
            x: gridX, 
            y: gridY, 
            w: gridWidth, 
        }

        this.animation = undefined; 
    }

    draw(stage) {
        console.log("Drawing Entity")
    }

    remove(stage) {
        console.log("Removing Entity")
    }

    update(delta) {
        console.log("Updating Entity")
    }
}

export default Entity; 


