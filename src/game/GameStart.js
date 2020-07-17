import { Graphics } from 'pixi.js'; 
import Entity from './Entity'; 
import * as PIXI from 'pixi.js'; 
import gsap from 'gsap'; 

const FONT_SIZE = 32; 
const LABEL_SCALE = 2/3; 
const LG_FONT_SIZE = 42; 
const RADIUS = 15; 

const LEVELS = 12; 
const TIME_REQ = 3; 

class GameStart extends Entity {
    constructor(onStart) {
        super(); 
        this.remark = new PIXI.Text(`Good job!
You know what to do now!`);

        this.infoBox = new Graphics(); 
        this.levelsLabel = new PIXI.Text("Levels")
        this.timeLabel = new PIXI.Text("Time")
        this.levelsText = new PIXI.Text(`${LEVELS}`)
        this.timeText = new PIXI.Text(`${TIME_REQ}m`)

        this.button = new Graphics(); 
        this.buttonLabel = new PIXI.Text("START");


        this.onStart = onStart; 
        this.offset = { x: 0, y: 0}
        this.buttonOffsetY = 0;
        this.starting = false; 
        if (this.screen.isMobile) {
            this.offset.y = 5000
        } else {
            this.offset.x = 5000
        }

        this.button.interactive = true; 
        this.button.click = (e) => {
            this.onClick(e)
        }
        this.button.touchstart = (e) => {
            this.onClick(e)
        }

        this.reposition = this.reposition.bind(this)
    }

    reposition() {
        this.x = this.screen.origin.x; // this.screen.origin.x; 
        this.y = this.screen.origin.y; 

        if (this.screen.isMobile) {
            this.y += (this.grid.w/2)
        } else {
            this.x += (this.grid.w/2)
        }

        this.buttonWidth = (this.grid.w/2); 
        this.buttonHeight = this.grid.w/6 - this.grid.w/48; 
        this.scale = this.grid.s; 
        this.r = RADIUS * this.scale; 
    }

    getButtonFont(scale) {
        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE * scale, 
            align: "center", 
            // fill: "#4b85f0"
        }); 
        return fontStyle; 
    }

    getLabelFont(scale) {
        const labelFontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: FONT_SIZE * LABEL_SCALE * scale,
            align: "center",  
            fill: "#727575"
        })
        return labelFontStyle
    }

    getRemarkFont(scale, width) {
        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica", 
            fontWeight: "bold", 
            fontSize: LG_FONT_SIZE * scale, 
            wordWrap: true, 
            wordWrapWidth: width, 
            align: "center",
        })
        return fontStyle;
    }

    onClick(event) {
        if (!this.starting) {
            this.animation = gsap.from(this, {
                buttonOffsetY: this.buttonOffsetY + this.buttonHeight/18, 
                ease: 'elastic', 
                delay: 0, 
                paused: false, 
                duration: 0.8, 
            })
            this.starting = true; 
            this.onStart(); 
            setTimeout(() => {
                this.starting = false; 
            }, 1600)
        }
    }


    draw(stage) {
        this.timeLabel = new PIXI.Text(this.timeLabel.text, this.getLabelFont(this.scale))
        this.remark = new PIXI.Text(this.remark.text, this.getRemarkFont(this.scale, this.grid.w))
        this.levelsLabel = new PIXI.Text(this.levelsLabel.text, this.getLabelFont(this.scale))
        this.timeText = new PIXI.Text(this.timeText.text, this.getRemarkFont(this.scale, this.grid.w))
        this.levelsText = new PIXI.Text(this.levelsText.text, this.getRemarkFont(this.scale, this.grid.w))
        this.buttonLabel = new PIXI.Text("START", this.getButtonFont(this.scale))
        
        if (this.screen.isMobile) {
            this.buttonOffsetY = -(this.grid.w/6)/2;
        }
        
        stage.addChild(this.remark)
        stage.addChild(this.infoBox)
        stage.addChild(this.levelsLabel)
        stage.addChild(this.timeLabel)
        stage.addChild(this.levelsText)
        stage.addChild(this.timeText)
        stage.addChild(this.button)
        stage.addChild(this.buttonLabel)
    }

    show() {
        this.animation = gsap.to(this.offset, {
            y: 0,  
            x: 0, 
            ease: 'power2', 
            delay: 0.4, 
            duration: 0.8, 
            paused: false, 
        })
    }

    remove(stage) {
        this.animation = gsap.to(this, {
            y: -2000, 
            ease: 'power2', 
            delay: 0.4, 
            duration: 0.6, 
            paused: false, 
            onComplete: () => {
                stage.removeChild(this.remark)
                stage.removeChild(this.infoBox)
                stage.removeChild(this.levelsLabel)
                stage.removeChild(this.timeLabel)
                stage.removeChild(this.levelsText)
                stage.removeChild(this.timeText)
                stage.removeChild(this.button)
                stage.removeChild(this.buttonLabel)
            }
        })
    }


    update(delta) {
        const posX = this.offset.x + this.x - this.buttonWidth/2;
        const posY = this.screen.isMobile ? this.offset.y + this.y - (this.grid.w/2) : this.offset.y + this.y - ((this.grid.w/4) * 3/2);

        this.remark.x = this.offset.x + this.x - this.remark.width/2; 
        this.remark.y = posY; //+ this.remark.height/2; 

        this.timeLabel.x = posX + this.buttonWidth/4 - this.timeLabel.width/2; 
        this.timeLabel.y = this.remark.y + this.remark.height + this.buttonHeight - this.timeLabel.height/2; 

        this.levelsLabel.x = posX + this.buttonWidth - this.buttonWidth/4 - this.levelsLabel.width/2; 
        this.levelsLabel.y = this.timeLabel.y; 

        this.timeText.x = posX + this.buttonWidth/4 - this.timeText.width/2; 
        this.timeText.y = this.remark.y + this.remark.height  + this.buttonHeight*3/2 - this.timeText.height/2; 
        this.levelsText.x = posX + this.buttonWidth - this.buttonWidth/4 - this.levelsText.width/2; 
        this.levelsText.y = this.timeText.y;  

        this.buttonLabel.x = this.offset.x + this.x - this.buttonLabel.width/2; 
        this.buttonLabel.y = this.buttonOffsetY + this.offset.y + this.y + ((this.grid.w/4) * 3/2) - this.buttonHeight*3/2 + (this.buttonHeight- this.grid.w/48)/2 - this.buttonLabel.height/2; 
        
        this.infoBox.clear(); 
        this.infoBox.lineStyle(2, 0x4b85f0)
        this.infoBox.beginFill(0xdce8ff)
        this.infoBox.drawRoundedRect(posX, (this.remark.y + this.remark.height) + this.buttonHeight/2, this.buttonWidth, this.buttonHeight*3/2, this.r*3)
        this.infoBox.endFill();

        this.button.clear(); 
        this.button.lineStyle(2, 0x000000);
        this.button.beginFill(0xc9a91e)
        this.button.drawRoundedRect(posX, this.buttonOffsetY + this.offset.y + this.y + ((this.grid.w/4) * 3/2) - this.buttonHeight*3/2, this.buttonWidth, this.buttonHeight, this.r)
        this.button.beginFill(0xfcd21c);
        this.button.drawRoundedRect(posX, this.buttonOffsetY + this.offset.y + this.y + ((this.grid.w/4) * 3/2) - this.buttonHeight*3/2, this.buttonWidth, this.buttonHeight - (this.grid.w/48), this.r)
        this.button.endFill(); 
    }

}


export default GameStart; 