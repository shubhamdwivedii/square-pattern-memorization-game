// import { Graphics } from 'pixi.js';
import gsap from 'gsap'; 
import * as PIXI from 'pixi.js';

class Header {
    constructor(posX, posY, width, resources,round, totalLevels, isMobile) {
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
        this.closeBtn.x = posX; 
        this.closeBtn.y = posY - (width/8) + this.closeBtn.height/2; 
        

        this.muteBtn.scale.x = 0.5 
        this.muteBtn.scale.y = 0.5   
        this.muteBtn.anchor.set(0.5)
        this.muteBtn.x = posX + width; 
        this.muteBtn.y = posY - (width/8) + this.muteBtn.height/2; 

        this.currentLevel.x = posX + (width/2) - (this.currentLevel.width);
        this.currentLevel.y = posY - (width/6); 
        this.totalLevels.x = posX + (width/2); 
        this.totalLevels.y = posY - (width/6) + (this.totalLevels.height/2);

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


    draw(stage) {
        console.log('Draing')

        stage.addChild(this.closeBtn)
        stage.addChild(this.muteBtn)
        stage.addChild(this.currentLevel)
        stage.addChild(this.totalLevels)
    }
}

export default Header; 