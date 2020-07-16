import * as PIXI from 'pixi.js';
import Entity from './Entity'; 
import gsap from 'gsap';
// import starImg from './assets/star.png'; 
// import starAlt from './assets/starAlt.png';

const FIXED_SCALE = 0.45; 
const FIXED_SCALE_LG = 0.7; 


class Stars extends Entity {
    constructor(resources, round) {
        super();
        this.round = round; 
        this.starTex = resources.star.texture;
        this.altTex = resources.starAlt.texture;
        this.starOne = new PIXI.Sprite(this.round >= 4 ? this.starTex : this.altTex); //new Graphics();
        this.starTwo = new PIXI.Sprite(this.round >= 8 ? this.starTex : this.altTex);
        this.starThree = new PIXI.Sprite(this.round === 12 ? this.starTex : this.altTex);

        this.starOne.scale.set(FIXED_SCALE);
        this.starTwo.scale.set(FIXED_SCALE_LG);
        this.starThree.scale.set(FIXED_SCALE);

        this.starOne.anchor.set(0.5);
        this.starThree.anchor.set(0.5);
        this.starOne.rotation -= 0.2;
        this.starThree.rotation += 0.2;


        this.remark = this.getRemarkText(round);
        this.reposition = this.reposition.bind(this)
    }

    reposition() {
        this.x = this.screen.w/2; 
        this.y = this.grid.y;
        this.scale = this.grid.s; 
    }

    draw(stage, round) {
        this.round = round; 
        this.starOne.texture = round >= 4 ? this.starTex : this.altTex;
        this.starTwo.texture = round >= 8 ? this.starTex : this.altTex;
        this.starThree.texture = round === 12 ? this.starTex : this.altTex;
        // this.remark.text = getText(round)
        // this.remark.fontSize = (this.remark.fontSize*0.5) //this.scale)
        this.remark = this.getRemarkText(round, this.scale)
        this.starOne.scale.set(FIXED_SCALE * this.scale);
        this.starTwo.scale.set(FIXED_SCALE_LG * this.scale);
        this.starThree.scale.set(FIXED_SCALE * this.scale);
        stage.addChild(this.starOne)
        stage.addChild(this.starTwo)
        stage.addChild(this.starThree)
        stage.addChild(this.remark)
        this.animation = gsap.from(this, {
            y: -1500, 
            ease: 'power3',
            delay: 0.4, 
            duration: 1.5, 
            paused: false,
        })
    }

    remove(stage) {
        const posY = this.y; 
        this.animation = gsap.to(this, {
            y: -1500, 
            ease: 'power3',
            delay: 0.4, 
            duration: 1.5, 
            paused: false,
            onComplete: () => {
                stage.removeChild(this.starOne)
                stage.removeChild(this.starTwo)
                stage.removeChild(this.starThree)
                stage.removeChild(this.remark)
                this.y = posY; 
            }
        })
    }

    update(delta) {
        const posY = this.screen.isMobile ? this.y - this.starTwo.height/2 : this.y - this.starTwo.height/4; 
        this.starOne.x = this.x + this.w/2 - this.starTwo.width/2 - this.starOne.width/2; 
        this.starOne.y = posY - this.w/5 + this.starOne.height;
        this.starTwo.x = this.x + this.w/2 - this.starTwo.width/2; 
        this.starTwo.y = posY + this.w/4; 

        this.starThree.x = this.x + this.w/2 + this.starTwo.width/2 + this.starThree.width/2; 
        this.starThree.y = posY - this.w/5 + this.starThree.height;

        this.remark.x = this.x + (this.w/2) - this.remark.width/2; 
        this.remark.y = posY + this.starTwo.height + (this.remark.height/2); 
    
    }

    getRemarkText(round, scale) {
        let text = getText(round)

        const fontStyle = new PIXI.TextStyle({
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: 36 * scale, 
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