import { Graphics } from 'pixi.js';
import Entity from '../Entity'; 
import * as PIXI from 'pixi.js';
import gsap from 'gsap'; 

const FONT_SIZE = 32; 
const RADIUS = 15; 

class ExploreMoreButton extends Entity {
    constructor() {
        super()
        this.button = new Graphics(); 
       

        this.text = new PIXI.Text("EXPLORE MORE GAMES")

        this.button.interactive = true; 
        this.button.buttonMode = true; 
        this.button.click = (e) => {
            this.onClick(e)
        };
        this.button.touchstart = (e) => {
            this.onClick(e)
        }
        
        this.reposition = this.reposition.bind(this)
    }


    reposition() {
        this.x = this.grid.x + this.grid.w/20; 
        this.y = this.grid.y + ((this.grid.w/3)*2) 
        this.w = this.grid.w - (this.grid.w/10); 
        this.h = this.grid.w/6 - this.grid.w/48;
        this.scale = this.grid.s; 
        this.r = RADIUS * this.scale;


    }

    getFontStyle(scale) {
        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE * scale, 
            align: "center", 
            // fill: "#4b85f0"
        }); 
        return fontStyle; 
    }

    onClick(event) {
        this.animation && this.animation.pause(); 
        this.animation = gsap.from(this, {
            y: this.y + this.h/18, 
            ease: 'elastic', 
            delay: 0, 
            paused: true, 
            duration: 0.8,
        })
        this.animation.resume(); 
    }


    draw(stage) {
        this.text = new PIXI.Text("EXPLORE MORE GAMES", this.getFontStyle(this.scale))
        stage.addChild(this.button)
        stage.addChild(this.text)

        this.animation = gsap.from(this, {
            y: 2000, 
            ease: 'power2', 
            delay: 0.4, 
            duration: 0.8, 
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
        this.text.y = this.y + ((this.h-this.grid.w/48)/2)  - this.text.height/2; 
        this.button.clear(); 
        this.button.lineStyle(2, 0x000000);
        this.button.beginFill(0xc9a91e)
        this.button.drawRoundedRect(this.x, this.y, this.w, this.h, this.r)
        this.button.beginFill(0xfcd21c);
        this.button.drawRoundedRect(this.x, this.y, this.w, this.h - (this.grid.w/48), this.r)
        this.button.endFill(); 
    }
}

export default ExploreMoreButton; 