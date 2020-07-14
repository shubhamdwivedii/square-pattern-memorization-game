import { Graphics } from 'pixi.js';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import starImg from './assets/star.png'; 
import starAlt from './assets/starAlt.png';


class Stars {
    constructor(posX, posY, width, screenWidth, screenHeight, round) {
        this.posX = posX; 
        this.posY = posY; 
        this.width = width; 
        this.screenWidth = screenWidth; 
        this.screenHeight = screenHeight; 
        this.round = round; 

        
        this.starTex = PIXI.Texture.from(starImg);
        this.altTex = PIXI.Texture.from(starAlt);
        this.starOne = new PIXI.Sprite(this.round >= 4 ? this.starTex : this.altTex); //new Graphics();
        this.starTwo = new PIXI.Sprite(this.round >= 8 ? this.starTex : this.altTex);
        this.starThree = new PIXI.Sprite(this.round === 12 ? this.starTex : this.altTex);

        this.starOne.scale.set(0.1);
        this.starTwo.scale.set(0.15);
        this.starThree.scale.set(0.1);

        this.starOne.anchor.set(0.5);
        this.starThree.anchor.set(0.5);
        this.starOne.rotation -= 0.2;
        this.starThree.rotation += 0.2;


        this.remark = this.getRemarkText(round);

        this.remark.x = posX + (width/2) - this.remark.width; 
        this.remark.y = posY - (width/6) - 50; 

        
    }

    draw(stage, round) {
        this.round = round; 
        this.starOne.texture = round >= 4 ? this.starTex : this.altTex;
        this.starTwo.texture = round >= 8 ? this.starTex : this.altTex;
        this.starThree.texture = round === 12 ? this.starTex : this.altTex;
        this.remark.text = getText(round)

        stage.addChild(this.starOne)
        stage.addChild(this.starTwo)
        stage.addChild(this.starThree)
        stage.addChild(this.remark)
        this.animation = gsap.from(this, {
            posY: -1500, 
            ease: 'power3',
            delay: 0.4, 
            duration: 1.5, 
            paused: false,
            onComplete: () => {
                console.log("StarAnim Done")
            }
        })
    }

    remove(stage) {
        const posY = this.posY; 
        this.animation = gsap.to(this, {
            posY: -1500, 
            ease: 'power3',
            delay: 0.4, 
            duration: 1.5, 
            paused: false,
            onComplete: () => {
                console.log("StarAnim Done")
                stage.removeChild(this.starOne)
                stage.removeChild(this.starTwo)
                stage.removeChild(this.starThree)
                stage.removeChild(this.remark)
                this.posY = posY; 
            }
        })
    }

    update(delta) {
        this.starOne.x = this.posX + this.width/2 - this.starTwo.width/2 - this.starOne.width/2; 
        this.starOne.y = this.posY - this.width/4 + this.starOne.height// - this.starOne.height/4;
        // this.starOne.rotation -= 0.2; 
        this.starTwo.x = this.posX + this.width/2 - this.starTwo.width/2; 
        this.starTwo.y = this.posY - this.width/4; 

        this.starThree.x = this.posX + this.width/2 + this.starTwo.width/2 + this.starThree.width/2; 
        this.starThree.y = this.posY - this.width/4 + this.starThree.height// - this.starThree.height/4;

        this.remark.x = this.posX + (this.width/2) - this.remark.width/2; 
        this.remark.y = this.posY - (this.width/6) + this.starTwo.height - (this.remark.height/2); 
    
    }

    getRemarkText(round) {
        let text = getText(round)

        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: 36, 
            // fill: "#e5325f",
            align: "center",
        })

        const remark = new PIXI.Text(text, fontStyle)
        return remark; 
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

  function getText(round) {
    let text = "You did poorly!"
    if (round >= 4) {
        text = "You did okay!"
    } 
    if (round >= 8) {
        text = "You did great!"
    }
    if (round === 12) {
        text = "You did amazing!"
    }
    return text; 
}

export default Stars;  