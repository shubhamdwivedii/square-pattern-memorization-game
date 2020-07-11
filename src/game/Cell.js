import { Graphics } from 'pixi.js';
import gsap from 'gsap';


class Cell {
    constructor(posX, posY, width, height, id, active, addStrike, addCheck, isOver) {
        this.square = new Graphics();
        this.time = 2.0;
        this.active = active;
        this.clicked = false;
        this.clickable = false;
        this.hidden = true;
        this.isLast = false;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.dimensions = { x: this.posX + 4, y: this.posY + 4, h: this.height - 8, w: this.width - 8, r: 10 }

        this.animation = gsap.from(this.dimensions, {
            x: posX + 4 + ((width - 8) / 2),
            y: Math.round(Math.random() * 600) - 1200, //posY + 4 + ((height -8)/2), 
            w: 10,//width - 8, 
            h: 10, //height - 8,
            ease: 'elastic',
            duration: 1.5,
            delay: (Math.random() * 0.2),
            paused: false,
            onComplete: () => {
                console.log("Load Anim Complete")
            }
        })

        this.square.interactive = true;
        this.square.buttonMode = true;
        this.square.click = (e) => {
            if (this.clickable && !isOver()) {
                this.onClick(e)
            }
        }

        this.square.touchstart = (e) => {
            console.log("Touched")
            if (this.clickable && !isOver()) {
                this.onClick(e)
            }
        }

        this.addStrike = addStrike;
        this.addCheck = addCheck;


    }

    update(delta) {
        this.draw();
    }

    onClick(event) {
        if (!this.clicked) {
            if (this.active) {
                const isLast = this.addCheck();
                if (isLast) {
                    this.isLast = true;
                }
            } else {
                this.addStrike();
            }

            this.clicked = true;
            this.popAnimate(() => {
                if (!this.active) {
                    this.flipAnimate(() => {
                        this.clicked = false;
                    })
                }
            })
        }
    }

    showActive() {
        this.flipAnimate(() => {
            // this.clickable = false;
            this.hidden = false;
        })
    }

    hideActive() {
        this.flipAnimate(() => {
            this.clickable = true;
            this.hidden = true;
        })
    }

    unClickable(onComplete) {
        this.flipAnimate(() => {
            this.clickable = false;
            this.hidden = true;
            onComplete();
        })
    }

    draw() {
        const { x, y, h, w, r } = this.dimensions;

        let color = 0x4b85f0 //0xfcd21c
        if (this.clicked) {
            if (this.active) {
                if (this.isLast) {
                    color = 0x10ca5a;
                } else {
                    color = 0xfcd21c;
                }
            } else {
                color = 0xDE3249
            }
        } else {
            if (this.active && !this.hidden) {
                color = 0xfcd21c //0x4b85f0
            }
        }
        this.square.clear()
        this.square.beginFill(color) //(0xBB81CD)
        this.square.drawRoundedRect(x, y, w, h, r)

        if (this.active && this.isLast) {
            this.square.lineStyle(6, 0xFFFFFF, 0.7)
            this.square.moveTo((x + (w / 3) - (w / 14)), y + (h / 2) - (h / 16))
            this.square.lineTo((x + (w / 2) - (w / 10)), y + (h / 2) + (h / 6) - (h / 16))
            this.square.lineTo((x + w - (w / 3.5)), y + (h / 2.5) - (h / 16))
        }

        if (this.clicked && !this.active) {
            this.square.lineStyle(6, 0xFFFFFF, 0.7)
            this.square.moveTo((x + (w / 3)), y + (h / 3))
            this.square.lineTo((x + w - (w / 3)), y + h - (h / 3))
            this.square.moveTo((x + w - (w / 3)), y + (h / 3))
            this.square.lineTo((x + (w / 3)), y + h - (h / 3))
        }

        this.square.endFill()

        // this.square.drawRoundedRect(this.posX+4, this.posY+4, this.width-8, this.height-8)
    }

    popAnimate(onPopCb) {
        this.animation.pause();
        this.animation = gsap.from(this.dimensions, {
            x: this.posX + 4 + ((this.width - 8) / 2),
            y: this.posY + 4 + ((this.height - 8) / 2),
            w: 2,//width - 8, 
            h: 2, //height - 8,
            ease: 'elastic',
            duration: 1,
            delay: 0,
            paused: true,
            onComplete: () => {
                setTimeout(onPopCb, 200)
            }
        })
        this.animation.resume();
    }

    flipAnimate(onFlipCb) {
        console.log("FLip Aimating")
        this.animation.pause();
        this.animation = gsap.to(this.dimensions, {
            x: ((this.posX + 4) + ((this.width - 8) / 2)),
            w: 0,//width - 8, 
            ease: 'power1',
            duration: 0.2,
            delay: Math.random() * 0.4,
            // paused: true, 
            onComplete: () => {
                onFlipCb();
                this.animation = gsap.to(this.dimensions, {
                    x: this.posX + 4,
                    w: this.width - 8,
                    ease: 'power1',
                    duration: 0.2,
                    delay: 0,
                })
            }
        })
        this.animation.resume();
    }
}

export default Cell; 