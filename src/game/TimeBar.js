import { Graphics } from 'pixi.js';
import Entity from './Entity'; 
import * as PIXI from 'pixi.js';
import gsap from 'gsap';

const RADIUS_FACTOR = 16; 

class TimeBar extends Entity {
    constructor(posX, posY, width, height, demoTime, playTime) {
        super(posX, posY, width, height)
        this.trueWidth = width; 
        this.demoTime = demoTime  // + 1000; // remove 1000 after testing 
        this.demoComplete = false; 
        this.playTime = playTime //+ 2500; // remove 2500 after testing 
        this.shape = new Graphics(); 
    
        this.animation = gsap.from(this, {
            y: Math.round(Math.random() * 600) - 1200, 
            w: 0, 
            trueWidth: 0,
            ease: 'elastic', 
            duration: 1.5, 
            delay: (Math.random() * 0.2),
            onComplete: () => {
                console.log("TimeBar loading complete")
            }
        })

        this.reposition = this.reposition.bind(this)
    }

    reposition() {
        this.scale = this.grid.s; 
        this.r = RADIUS_FACTOR * this.scale; 
    }
    
    draw() {
        this.shape.clear();
        if (this.demoComplete) {
            this.shape.beginFill(0x10ca5a);
            this.shape.drawRoundedRect(this.x, this.y , this.w, this.h, this.r)
        } else {
            this.shape.beginFill(0x10ca5a);
            this.shape.drawRoundedRect(this.x, this.y, this.trueWidth, this.h, this.r)
            this.shape.beginFill(0xfcd21c)
            this.shape.drawRoundedRect(this.x, this.y, this.w, this.h, this.r)
        }
        this.shape.endFill(); 
    }
    
    startDemo(onComplete) {
        this.startTimer(this.demoTime, () => {
            console.log("Demo TimeOut");
            onComplete(); 
        }); 
    }

    startPlay(onComplete) {
        this.w = this.trueWidth; 
        this.demoComplete = true; 
        this.startTimer(this.playTime, () => {
            console.log("Play TimeOut")
            onComplete(this); 
        })
    }

    update(delta) {
        this.draw()
    }


    startTimer(duration, onTimeout) {
        this.animation && this.animation.pause(); 
        this.animation = gsap.to(this, {
            w: 0,
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

export default TimeBar; 