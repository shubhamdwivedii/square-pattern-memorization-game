// import { Graphics } from 'pixi.js';
import Entity from './Entity'; 
import gsap from 'gsap'; 
import * as PIXI from 'pixi.js';

const SCALE_FACTOR = 0.5; 


class Header extends Entity {
    constructor(resources,round, totalLevels, isMobile, onQuit, onMute) {
        super(); 
        // this.posX = posX;
        // this.posY = posY; 
        // this.width = width; 
        // this.height = height; 

        this.level = round; 
        this.currentLevel = this.getLevelText(this.level);
        this.totalLevels = this.getLevelText(totalLevels, true);

        this.muteBtn = new PIXI.Sprite(resources.muteBtn.texture);
        this.closeBtn = new PIXI.Sprite(resources.closeBtn.texture);

        this.closeBtn.anchor.set(0.5)
        
        this.muteBtn.anchor.set(0.5)

        this.onQuit = onQuit; 
        this.onMute = onMute; 
        this.closeBtn.interactive = true; 
        this.muteBtn.interactive = true; 
        this.closeBtn.on('pointerdown', this.onQuit)
        this.muteBtn.on('ponterdown', this.onMute)
        this.closeBtn.on('touchstart', this.onQuit)
        this.muteBtn.on('touchstart', this.onMute)

        this.reposition = this.reposition.bind(this);

    }

    reposition() {
        this.x = this.grid.x; 
        this.y = this.screen.isMobile ? 0 : this.grid.y; 
        this.w = this.grid.w; 
        this.scale = this.grid.s; 
    }


    getLevelText(level, total) {
        let text = level <= 9 ? `0${level}` : `${level}`;
        text = total ? `/` + text : text;  
        const fontStyleLg = new PIXI.TextStyle({
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: (!!total ? 32 : 64) * this.scale, 
            fill: "#e5325f",
            align: "center",
        });

        const levelText = new PIXI.Text(text, fontStyleLg)
        return levelText; 
    }

    next() {
        this.level += 1; 
        this.currentLevel.text = this.level <= 9 ? `0${this.level}` : `${this.level}`;
    }

    remove(stage) {
        // this.animation && this.animation.pause(); 
        const posY = this.y; 
        this.animation = gsap.to(this, {
            y: -100, 
            ease: 'power2', 
            delay: 0.4, 
            duration: 1, 
            paused: false, 
            onComplete: () => {
                stage.removeChild(this.closeBtn)
                stage.removeChild(this.muteBtn)
                stage.removeChild(this.currentLevel)
                stage.removeChild(this.totalLevels)
                this.y = posY; 
            }
        })
        // this.animation.resume();
    } 


    draw(stage, round) {
        this.level = round; 
        this.closeBtn.scale.x = SCALE_FACTOR * this.scale;
        this.closeBtn.scale.y = SCALE_FACTOR * this.scale;    
        this.muteBtn.scale.x = SCALE_FACTOR * this.scale; 
        this.muteBtn.scale.y = SCALE_FACTOR * this.scale;   

        this.currentLevel.text = this.level <= 9 ? `0${this.level}` : `${this.level}`; 
        this.animation = gsap.from(this, {
            y: -2000, 
            ease: 'power2', 
            delay: 0.2, 
            duration:1, 
            paused: false, 
        })

        stage.addChild(this.closeBtn)
        stage.addChild(this.muteBtn)
        stage.addChild(this.currentLevel)
        stage.addChild(this.totalLevels)
    }

    update(delta) {
        if (this.screen.isMobile) {
            this.muteBtn.x = this.x + this.w - this.w/24; 
            this.closeBtn.x = this.x + this.w/24; 
            this.closeBtn.y = this.y + (this.w/12) + this.closeBtn.height/2; 
            this.muteBtn.y = this.y + (this.w/12) + this.muteBtn.height/2; 
        } else {
            this.muteBtn.x = this.x + this.w + this.w/4; 
            this.closeBtn.x = this.x - this.w/4; 
            this.closeBtn.y = this.y - (this.w/4) + this.closeBtn.height/2; 
            this.muteBtn.y = this.y - (this.w/4) + this.muteBtn.height/2; 
        }

        this.currentLevel.x = this.x + (this.w/2) - (this.currentLevel.width);
        this.currentLevel.y = this.closeBtn.y - this.currentLevel.height/2; 
        this.totalLevels.x = this.x + (this.w/2); 
        this.totalLevels.y = this.closeBtn.y - this.currentLevel.height/2 + (this.totalLevels.height * 3/4);
    }


}

export default Header; 