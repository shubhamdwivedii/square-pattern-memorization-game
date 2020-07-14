import { Graphics } from 'pixi.js';
import Entity from '../Entity';

import * as PIXI from 'pixi.js';
import gsap from 'gsap'; 

const FONT_SIZE = 24; 

class PlayAgain extends Entity {
    constructor(posX, posY, width, height, onRestart) {
        super(posX, posY, width, height, 0, 0)
        this.button = new Graphics(); 
        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE, 
            align: "center", 
            fill: "#4b85f0"
        });

        this.text = new PIXI.Text("PLAY AGAIN", fontStyle);

        this.button.interactive = true; 
        this.button.click = (e) => {
            this.onClick(e)
        }
        this.button.touchstart = (e) => {
            this.onClick(e)
        }

        this.onRestart = onRestart;
    }


    onClick(event) {
        // this.animation && this.animation.pause(); 
        this.animation = gsap.from(this, {
            y: this.y + 10, 
            ease: 'power2', 
            delay: 0, 
            duration: 0.5, 
            paused: false,
        })
        // this.animation.resume(); 
        this.onRestart(); 

    }

    draw(stage) {
        stage.addChild(this.button)
        stage.addChild(this.text)

        this.animation = gsap.from(this, {
            y: 2000, 
            ease: 'power2', 
            delay: 0.8, 
            duration: 1, 
            paused: false, 
        })
    }

    
    remove(stage) {
        const posY = this.y; 
        this.animation = gsap.to(this, {
            y: -2000, 
            ease: 'power2', 
            delay: 0.4, 
            duration: 0.8, 
            paused: false, 
            onComplete: () => {
                stage.removeChild(this.button)
                stage.removeChild(this.text)
                this.y = posY;
            }
        })
    }

    update(delta) {
        this.text.x = this.x + this.w/2 - this.text.width/2; 
        this.text.y = this.y + this.h/2 - this.text.height/2; 
        this.button.clear(); 
        this.button.beginFill(0xffffff);
        this.button.drawRect(this.x, this.y, this.w, this.h)
        this.button.endFill(); 
    }
}

export default PlayAgain; 