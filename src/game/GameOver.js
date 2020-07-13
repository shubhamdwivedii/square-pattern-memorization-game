import { Graphics } from 'pixi.js';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'; 
import Stars from './Stars'; 

class GameOver {
    constructor(posX, posY, width, screenWidth, screenHeight, isMobile, round) {
        this.posX = posX;
        this.posY = posY; 
        this.width = width; 
        this.screenWidth = screenWidth; 
        this.screenHeight = screenHeight; 
        this.round = round; 
        this.stars = new Stars(posX, posY, width, screenWidth, screenHeight, round)
    
        // this.remark = this.getRemarkText(round);
    

        // this.remark.x = posX + (width/2) - this.remark.width; 
        // this.remark.y = posY - (width/6) - 50; 

        this.metricBox = new Graphics(); 

        this.moreGames = new Graphics(); 
    
    }


    draw(stage) {
        // stage.addChild(this.remark)
        this.stars.draw(stage)
        stage.addChild(this.metricBox);
        stage.addChild(this.moreGames);

        this.animation = gsap.from(this, {
            posY: 2000, 
            ease: 'power2',
            delay: 0.4, 
            duration: 0.8, 
            paused: false,
            onComplete: () => {
                console.log("StarAnim Done")
            }
        })
    }

    update(delta, round) {
        this.round = round; 
        this.stars.update(delta, round)

        this.metricBox.clear(); 
        this.metricBox.lineStyle(2, 0x4b85f0)
        this.metricBox.beginFill(0xdce8ff)
        this.metricBox.drawRoundedRect(this.posX + (this.width/6), this.posY + this.width/3, 4*(this.width/6), 2*(this.width/8), 30)
        this.metricBox.endFill();


        this.moreGames.clear(); 
        this.moreGames.lineStyle(2, 0x000000)
        
        this.moreGames.beginFill(0xc9a91e);
        this.moreGames.drawRoundedRect(this.posX, this.posY + (this.width/3)*2, this.width, 2*(this.width/12), 15)
        this.moreGames.beginFill(0xfcd21c)
        this.moreGames.drawRoundedRect(this.posX, this.posY + (this.width/3)*2, this.width, 2*(this.width/12) - (this.width/48), 15)
        
        this.moreGames.endFill(); 
    }


   
}

export default GameOver;