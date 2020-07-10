import { Graphics } from 'pixi.js';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';


class TimeBar {
    constructor(posX, posY, width, height, demoTime, playTime) {
        console.log("constructing TimeBar")
        this.posX = posX; 
        this.posY = posY; 
        this.width = width; 
        this.trueWidth = width; 
        this.height = height;
        this.demoTime = demoTime + 1000; // remove 1000 after testing 
        this.demoComplete = false; 
        this.playTime = playTime + 2500; // remove 2500 after testing 
        this.shape = new Graphics(); 
        // this.shape.beginTextureFill(gradient('#10ca5a', '#14f56d', gridWidth, 100))
        // this.shape.beginFill(0x10ca5a);
        // this.shape.drawRoundedRect(posX, posY, width, height, 16)
        // this.shape.endFill(); 

        this.animation = gsap.from(this, {
            posY: Math.round(Math.random() * 600) - 1200, 
            width: 0, 
            trueWidth: 0,
            ease: 'elastic', 
            duration: 1.5, 
            delay: (Math.random() * 0.2),
            onComplete: () => {
                console.log("TimeBar anim complete")
            }
        })
    }
    
    draw() {
        this.shape.clear();
        if (this.demoComplete) {
            this.shape.beginFill(0x10ca5a);
            this.shape.drawRoundedRect(this.posX, this.posY, this.width, this.height, 16)
        } else {
            this.shape.beginFill(0x10ca5a);
            this.shape.drawRoundedRect(this.posX, this.posY, this.trueWidth, this.height, 16)
            this.shape.beginFill(0xfcd21c)
            this.shape.drawRoundedRect(this.posX, this.posY, this.width, this.height, 16)
        }
        this.shape.endFill(); 
    }
    
    startDemo(onComplete) {
        console.log("Starting dEMO")
        this.startTimer(this.demoTime, () => {
            console.log("DEMO TIME OUT");
            onComplete(); 
        }); 
    }

    startPlay(onComplete) {
        this.width = this.trueWidth; 
        this.demoComplete = true; 
        this.startTimer(this.playTime, () => {
            console.log("PLAY TIME OUT")
            onComplete(this); 
        })
    }

    update(delta) {
        // console.log("updating", this.width)
        // if (this.width <= 0) {
        //     // console.log("times up")
        // } else {
        //     this.width = this.width - (delta*1) 
        // }
    
        this.draw()
    }


    startTimer(duration, onTimeout) {
        this.animation && this.animation.pause(); 
        this.animation = gsap.to(this, {
            width: 0,
            ease: 'linear',
            delay: 0.1, 
            duration: duration/1000, 
            paused: true, 
            onComplete: () => {
                onTimeout(); 
            }
        })
        this.animation && this.animation.resume();
    }
}


function gradient(from, to, w, h) {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const grd = ctx.createLinearGradient(0,0,100,100);
    grd.addColorStop(0, from);
    grd.addColorStop(1, to);
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,w,h);
    return new PIXI.Texture.from(c);
  }




export default TimeBar; 