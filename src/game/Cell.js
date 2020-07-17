import { Graphics } from 'pixi.js';
import Entity from './Entity';
import { isMute } from '../game';
import gsap from 'gsap';
import sound from 'pixi-sound';


const RADIUS_FACTOR = 10;
const LINE_WIDTH = 8;
const ENABLE_CIRCLE_ANIM = false;

class Cell extends Entity {
    constructor(posX, posY, width, height, resources, active, addStrike, addCheck, isOver) {
        super(posX + 4, posY + 4, width - 8, height - 8, 0, 0)
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

        this.radius = 0;

        this.strikeSound = sound.Sound.from(resources.strikeSnd.sound);
        this.checkSound = sound.Sound.from(resources.checkSnd.sound);
        this.winSound = sound.Sound.from(resources.clearSnd.sound);

        this.square.interactive = true;
        this.square.buttonMode = true;
        this.square.click = (e) => {
            if (this.clickable && !isOver()) {
                this.onClick(e)
            }
        }

        this.square.touchstart = (e) => {
            if (this.clickable && !isOver()) {
                this.onClick(e)
            }
        }

        this.addStrike = addStrike;
        this.addCheck = addCheck;

        this.reposition = this.reposition.bind(this);
    }

    reposition() {
        this.scale = this.grid.s;
        this.r = RADIUS_FACTOR * this.scale;
        this.lineWidth = LINE_WIDTH * this.scale;
    }

    draw(stage) {
        this.animation = gsap.from(this, {
            x: this.posX + 4 + ((this.width - 8) / 2),
            y: Math.round(Math.random() * 600) - 1200,
            w: 10,//width - 8, 
            h: 10, //height - 8,
            ease: 'elastic',
            duration: 1.5,
            delay: (Math.random() * 0.2),
            paused: false,
            onComplete: () => {
                console.log("Cell Load Animation Complete")
            }
        })
        stage.addChild(this.square)
    }

    update(delta) {
        const { x, y, h, w, r } = this;

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
        if (this.radius >= 5) {
            this.square.drawCircle(x + w / 2, y + h / 2, this.radius)
        }

        if (this.active && this.isLast) {
            this.square.lineStyle(this.lineWidth, 0xFFFFFF, 0.7)
            this.square.moveTo((x + (w / 3) - (w / 14)), y + (h / 2) - (h / 16))
            this.square.lineTo((x + (w / 2) - (w / 10)), y + (h / 2) + (h / 6) - (h / 16))
            this.square.lineTo((x + w - (w / 3.5)), y + (h / 2.5) - (h / 16))
        }

        if (this.clicked && !this.active) {
            this.square.lineStyle(this.lineWidth, 0xFFFFFF, 0.7)
            this.square.moveTo((x + (w / 3)), y + (h / 3))
            this.square.lineTo((x + w - (w / 3)), y + h - (h / 3))
            this.square.moveTo((x + w - (w / 3)), y + (h / 3))
            this.square.lineTo((x + (w / 3)), y + h - (h / 3))
        }

        this.square.endFill()
    }

    onClick(event) {
        if (!this.clicked) {
            this.clicked = true;
            this.square.zIndex = 4
            this.popAnimate(() => {
                this.square.zIndex = 0;
                if (!this.active) {
                    this.flipAnimate(() => {
                        this.clicked = false;
                    })
                }
            })

            if (this.active) {
                const isLast = this.addCheck();
                if (isLast) {
                    this.isLast = true;

                    if (ENABLE_CIRCLE_ANIM) {
                        this.square.zIndex = 6;
                        this.circlePop(() => {
                            this.square.zIndex = 0;
                        })
                    }

                    !isMute() && this.winSound.play();
                } else {
                    !isMute() && this.checkSound.play();
                }
            } else {
                this.addStrike();

                if (ENABLE_CIRCLE_ANIM) {
                    this.square.zIndex = 6;
                    this.circlePop(() => {
                        this.square.zIndex = 0;
                    })
                }

                !isMute() && this.strikeSound.play();
            }
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



    popAnimate(onPopCb) {
        // this.animation.pause();
        this.animation = gsap.from(this, {
            x: this.posX + 4 + ((this.width - 8) / 2),
            y: this.posY + 4 + ((this.height - 8) / 2),
            w: 2,//width - 8, 
            h: 2, //height - 8,
            ease: 'elastic',
            duration: 1,
            delay: 0,
            // paused: true,
            onComplete: () => {
                setTimeout(onPopCb, 200)
            }
        })
        // this.animation.resume();
    }

    flipAnimate(onFlipCb) {
        // this.animation.pause();
        this.animation = gsap.to(this, {
            x: ((this.posX + 4) + ((this.width - 8) / 2)),
            w: 0,//width - 8, 
            ease: 'power1',
            duration: 0.2,
            delay: Math.random() * 0.4,
            // paused: true, 
            onComplete: () => {
                onFlipCb();
                this.animation = gsap.to(this, {
                    x: this.posX + 4,
                    w: this.width - 8,
                    ease: 'power1',
                    duration: 0.2,
                    delay: 0,
                })
            }
        })
        // this.animation.resume();
    }

    moveBy(x, y, onMoveCb) {
        this.posX = this.x + x;
        this.animation = gsap.to(this, {
            x: this.x + x,
            y: this.y + y,
            ease: 'power2',
            duration: 0.5,
            delay: 0.2,
            onComplete: () => {
                onMoveCb && onMoveCb();
            }
        })
    }


    circlePop(onComplete) {
        gsap.to(this, {
            radius: this.width - this.width / 5,
            ease: 'elastic',
            duration: 1,
            delay: 0,
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(this, {
                        radius: 0,
                        ease: 'power2',
                        duration: 1,
                        delay: 0,
                        onComplete: () => {
                            onComplete()
                        },
                    })
                }, 200)
            }
        })
    }
}

export default Cell; 