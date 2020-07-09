import { Graphics } from 'pixi.js';

class Cell {
    constructor(posX, posY, width, height, id, active, addStrike) {
        this.square = new Graphics();
        this.active = active;
        this.clickable = false; 
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        // this.square.position.x = posX; 
        // this.square.position.y = posY; 

        // this.square.lineStyle(4, 0x2E2C32, 1) // width color alpha

        this.square.interactive = true;
        this.square.buttonMode = true;
        this.square.click = (e) => {
            if (this.clickable) {
                this.clicked(e)
            }
        }

        this.addStrike = addStrike;



        if (this.active) {
            this.square.beginFill(0x4b85f0) //(0xBB81CD) // color 
        } else {
            this.square.beginFill(0xfcd21c) //(0x4F20C8)
        }
        this.draw();
        // this.square.drawRoundedRect(this.posX, this.posY, this.width, this.height)
        
        // this.square.rotation = 0; 
        this.square.endFill();

    }

    clicked(event) {
        if (this.active) {
            this.square.clear()
            this.square.beginFill(0x5EC77F)
            // this.square.drawRoundedRect(this.posX, this.posY, this.width, this.height)
            this.draw();
            this.square.endFill()
        } else {
            this.square.clear()
            this.square.beginFill(0xDE3249)
            // this.square.drawRoundedRect(this.posX, this.posY, this.width, this.height)
            this.draw();
            this.square.endFill()
            this.addStrike();
        }
    }

    hideActive() {
        this.square.clear()
        this.square.beginFill(0xfcd21c) //(0xBB81CD)
        // this.square.drawRoundedRect(this.posX, this.posY, this.width, this.height)
        this.draw();
        this.square.endFill()
        this.clickable = true; 
    }

    unClickable() {
        this.clickable = false; 
    }


    draw() {
        this.square.drawRoundedRect(this.posX+4, this.posY+4, this.width-8, this.height-8)
    }
}

export default Cell; 