import { Graphics } from 'pixi.js';
import Entity from '../Entity'; 
import * as PIXI from 'pixi.js'; 
import gsap from 'gsap'; 


const FONT_SIZE = 32; 

class ResultBox extends Entity {
    constructor(posX, posY, width, height) {
        super(posX, posY, width, height, 30, 0)
        this.bgBox = new Graphics(); 

        this.timeTaken = 234 // minutes
        this.ratio = 15/18 // correct/total 

        const labelFontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE * 3/4,
            align: "center",  
            fill: "#727575"
        })

        const metricFontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE, 
            align: "center", 
        })

        this.timeTakenLabel = new PIXI.Text("Time Taken", labelFontStyle)
        this.accuracyLabel = new PIXI.Text("Accuracy", labelFontStyle)


        this.timeTakenText = new PIXI.Text("--", metricFontStyle)
        this.accuracyText = new PIXI.Text("--", metricFontStyle)
    }


    draw(stage, timeTaken, ratio) {

        this.timeTakenText.text = `${Math.round(timeTaken/60)}:${Math.round(timeTaken%60)}`
        const accuracy = Math.round(((ratio*100) + Number.EPSILON) * 100) /100
        
        this.accuracyText.text = isNaN(accuracy) ? "--" : `${accuracy}%`

        stage.addChild(this.bgBox)
        stage.addChild(this.timeTakenLabel)
        stage.addChild(this.timeTakenText)
        stage.addChild(this.accuracyLabel)
        stage.addChild(this.accuracyText)

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
                stage.removeChild(this.bgBox)
                stage.removeChild(this.timeTakenLabel)
                stage.removeChild(this.timeTakenText)
                stage.removeChild(this.accuracyLabel)
                stage.removeChild(this.accuracyText)
                this.y = posY; 
            }
        })
    }

    update(delta) {
        this.timeTakenLabel.x = this.x + this.w/4 - this.timeTakenLabel.width/2; 
        this.timeTakenLabel.y = this.y + this.h/3 - this.timeTakenLabel.height/2; 

        this.accuracyLabel.x = this.x + this.w - this.w/4 - this.accuracyLabel.width/2; 
        this.accuracyLabel.y = this.timeTakenLabel.y; 

        this.timeTakenText.x = this.x + this.w/4 - this.timeTakenText.width/2; 
        this.timeTakenText.y = this.y + this.h - this.h/3 - this.timeTakenText.height/2; 

        this.accuracyText.x = this.x + this.w - this.w/4 - this.accuracyText.width/2; 
        this.accuracyText.y = this.timeTakenText.y; 

        this.bgBox.clear(); 
        this.bgBox.lineStyle(2, 0x4b85f0)
        this.bgBox.beginFill(0xdce8ff)
        this.bgBox.drawRoundedRect(this.x, this.y, this.w, this.h, this.r)
        this.bgBox.endFill(); 
    }

}

export default ResultBox; 