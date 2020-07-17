import { Graphics } from 'pixi.js';
import Entity from './Entity'; 
import gsap from 'gsap'; 
import * as PIXI from 'pixi.js';
// import logoImg from './assets/logo.png'; 
import logoImg from './assets/myLogo.png';


const RADIUS_FACTOR = 16; 
const LOGO_SCALE = 0.6; 

class Loading extends Entity {
    constructor() {
        super();
        this.bar = new Graphics(); 
        const logoTex = PIXI.Texture.from(logoImg)
        this.logo = new PIXI.Sprite(logoTex) 

        this.reposition = this.reposition.bind(this);
    }


    reposition() {
        this.x = this.grid.x + this.grid.w/20; ; 
        this.y = this.screen.origin.y; //this.grid.y + this.grid.w; 
        this.w = 0; //this.grid.w/2; 
        this.tw = this.grid.w - (this.grid.w/10); 
        this.h = this.grid.w/(6*8); 
        this.scale = this.grid.s; 
        this.r = RADIUS_FACTOR * this.scale; 
    }


    draw(stage) {
        this.logo.scale.set(LOGO_SCALE * this.scale)
        this.logo.anchor.set(0.5)
        stage.addChild(this.bar)
        stage.addChild(this.logo)
    } 

    remove(stage) {
        this.animation = gsap.to(this, {
            y: 2000, 
            ease: 'power2', 
            delay: 0.2, 
            duration: 0.5,
            onComplete: () => {
                stage.removeChild(this.bar)
                stage.removeChild(this.logo)
            } 
        })
    }

    progress(percentage) {
        const width = (this.tw * percentage)/100; 
        this.animation = gsap.to(this, {
            w: width, 
            ease: 'linear', 
            delay: 0, 
            duration: 0.5, 
            // paused: false,
        })
    }

    update(delta) {
        this.logo.x = this.screen.origin.x;
        this.logo.y = this.y - this.logo.height/2;  

        this.bar.clear(); 
        this.bar.beginFill(0x4b72bb, 0.2);
        this.bar.drawRoundedRect(this.x, this.y + this.tw/2, this.tw, this.h, this.r)
        this.bar.beginFill(0x4b72bb)
        this.bar.drawRoundedRect(this.x, this.y + this.tw/2, this.w, this.h, this.r)
        this.bar.endFill(); 
    }
}

export default Loading; 