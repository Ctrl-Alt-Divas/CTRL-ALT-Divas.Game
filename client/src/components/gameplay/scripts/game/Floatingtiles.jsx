import { Matter } from "matter-js"
import { App } from "../system/App"
import * as PIXI from 'pixi.js'
export class Floatingtile {
    constructor (x, y) {
        this.createSprite(x, y)
    }

    createSprite(x, y) {
        try {
            this.sprite = new PIXI.Sprite.from('floatingtile')
        this.sprite.x = x
        this.sprite.y = y
        } catch(error) {
            console.log('this stupid thing didnt create')
        }
        
    }

    createBody() {
        // this.body = Matter.Bodies.reactangle(this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, this.sprite.height / 2 +  this.sprite.y + this.sprite.parent.y, this.sprite.width, this.sprite.height, 
        // { friction: 0, isStatic: true} )
        // this.body.gameFloatingTile = this
        // Matter.World.add(App.physics.word, this.body)
    }

    update() {
        if (this.sprite) {
          Matter.Body.setPosition(this.body, {
            x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
            y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y,
          });
        }
    }

}