import { Graphics } from 'pixi.js';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';


class Stars {
    constructor(screenWidth, screenHeight) {
        this.shape = new Graphics(); 
        this.shape.lineStyle(2, 0xffaa11);
        // this.shape.beginFill(0xffca11, 1);
        this.shape.beginTextureFill(gradient('#ffeba6', '#ffca11'))
        // this.shape.rotation = 0.5;
        this.shape.drawStar(360, 370, 5, 50);
        this.shape.endFill();
    }
}


function gradient(from, to) {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const grd = ctx.createLinearGradient(0,0,100,100);
    grd.addColorStop(0, from);
    grd.addColorStop(1, to);
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,120,120);
    return new PIXI.Texture.from(c);
  }

export default Stars; 