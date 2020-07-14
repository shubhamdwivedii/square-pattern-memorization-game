// import { Graphics } from 'pixi.js';
import gsap from 'gsap'; 
import * as PIXI from 'pixi.js';

class Header {
    constructor(posX, posY, width, resources,round, totalLevels, isMobile, onQuit, onMute) {
        this.posX = posX;
        this.posY = posY; 
        this.width = width; 
        // this.height = height; 

        this.level = round; 
        this.currentLevel = this.getLevelText(this.level);
        this.totalLevels = this.getLevelText(totalLevels, true);

        this.muteBtn = new PIXI.Sprite(resources.muteBtn.texture);
        this.closeBtn = new PIXI.Sprite(resources.closeBtn.texture);

        this.closeBtn.scale.x = 0.5 
        this.closeBtn.scale.y = 0.5    
        this.closeBtn.anchor.set(0.5)
        this.muteBtn.scale.x = 0.5 
        this.muteBtn.scale.y = 0.5   
        this.muteBtn.anchor.set(0.5)

        this.onQuit = onQuit; 
        this.onMute = onMute; 
        this.closeBtn.interactive = true; 
        this.muteBtn.interactive = true; 
        this.closeBtn.on('pointerdown', this.onQuit)
        this.muteBtn.on('ponterdown', this.onMute)
        this.closeBtn.on('touchstart', this.onQuit)
        this.muteBtn.on('touchstart', this.onMute)

        if (isMobile) {
            this.muteBtn.x -= width/8;
            this.closeBtn.x += width/8;
        } else {
            this.muteBtn.x += width/8; 
            this.closeBtn.x -= width/8;
        }

    }


    getLevelText(level, total) {
        let text = level <= 9 ? `0${level}` : `${level}`;
        text = total ? `/` + text : text;  
        const fontStyleLg = new PIXI.TextStyle({
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: !!total ? 24 : 42, 
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
        const posY = this.posY; 
        this.animation = gsap.to(this, {
            posY: -2000, 
            ease: 'power2', 
            delay: 0.4, 
            duration: 1, 
            paused: false, 
            onComplete: () => {
                stage.removeChild(this.closeBtn)
                stage.removeChild(this.muteBtn)
                stage.removeChild(this.currentLevel)
                stage.removeChild(this.totalLevels)
                this.posY = posY; 
            }
        })
        // this.animation.resume();
    } 


    draw(stage) {
        this.animation = gsap.from(this, {
            posY: -2000, 
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
        this.closeBtn.x = this.posX; 
        this.closeBtn.y = this.posY - (this.width/8) + this.closeBtn.height/2; 
        this.muteBtn.x = this.posX + this.width; 
        this.muteBtn.y = this.posY - (this.width/8) + this.muteBtn.height/2; 
        


        this.currentLevel.x = this.posX + (this.width/2) - (this.currentLevel.width);
        this.currentLevel.y = this.posY - (this.width/6); 
        this.totalLevels.x = this.posX + (this.width/2); 
        this.totalLevels.y = this.posY - (this.width/6) + (this.totalLevels.height/2);
    }


}

export default Header; 