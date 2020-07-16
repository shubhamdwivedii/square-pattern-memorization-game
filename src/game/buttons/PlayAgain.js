import { Graphics } from 'pixi.js';
import Entity from '../Entity';

import * as PIXI from 'pixi.js';
import gsap from 'gsap'; 
import replayImg from '../assets/replay.png';

const FONT_SIZE = 32; 
const ICON_SCALE = 0.12; 

class PlayAgain extends Entity {
    constructor(onRestart) {
        super()
        this.button = new Graphics(); 

        this.text = new PIXI.Text("PLAY AGAIN ");
        const replayTexure = PIXI.Texture.from(replayImg)

        this.replayIcon = new PIXI.Sprite(replayTexure)
        this.restarting = false; 

        this.button.interactive = true; 
        this.button.click = (e) => {
            if (!this.restarting) {
                this.onClick(e)
            }
        }
        this.button.touchstart = (e) => {
            if (!this.restarting) {
                this.onClick(e)
            }
        }

        this.onRestart = onRestart;

        this.reposition = this.reposition.bind(this)
    }

    reposition() {
        this.x = this.grid.x + this.grid.w/4;
        this.y = this.grid.y + this.grid.w - (this.grid.w/8)
        this.w = this.grid.w/2;
        this.h = this.grid.w/12; 
        this.r = 0; 
        this.scale = this.grid.s; 
    }

    getFontStyle(scale) {
        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE * scale, 
            align: "center", 
            fill: "#4b85f0"
        });
        return fontStyle; 
    }

    onClick(event) {
        // this.animation && this.animation.pause(); 
        this.animation = gsap.from(this, {
            y: this.y + this.h/18, 
            ease: 'power2', 
            delay: 0, 
            duration: 0.5, 
            paused: false,
        })
        // this.animation.resume();
        this.restarting = true;  
        this.onRestart(); 

    }

    draw(stage) {
        this.text = new PIXI.Text("PLAY AGAIN ", this.getFontStyle(this.scale));

        this.replayIcon.scale.set(ICON_SCALE * this.scale)
        this.replayIcon.anchor.set(0.5);

        stage.addChild(this.button)
        stage.addChild(this.text)
        stage.addChild(this.replayIcon)
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
                stage.removeChild(this.replayIcon)
                this.y = posY;
            }
        })
    }

    update(delta) {
        this.text.x = this.x + this.w/2 - this.text.width/2; 
        this.text.y = this.y + this.h/2 - this.text.height/2; 
        this.button.clear(); 
        this.button.beginFill(0xffffff, 0.8);
        this.button.drawRect(this.x, this.y, this.w, this.h)
        this.button.endFill(); 

        this.replayIcon.x = this.text.x + this.text.width + this.replayIcon.width/2; 
        this.replayIcon.y = this.text.y + this.replayIcon.height/2 + this.replayIcon.height/12; 
    }
}

export default PlayAgain; 