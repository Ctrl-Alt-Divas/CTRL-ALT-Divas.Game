import { App } from '../system/App'
import { Matter } from 'matter-js'

export class Floating {
    constructor(x, y) {
        this.createFloating(x, y)
     
    }

    createFloating(x, y) {
        this.sprite = App.sprite('floatingTiles')
        this.sprite.x = x
        this.sprite.y = y
    }

    createBody() {
    //     this.body = Matter.Bodies.rectangle(
    //         this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
    //   this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y,
    //   this.sprite.width,
    //   this.sprite.height,
    //   { friction: 0, isStatic: true, }
    //     );
        // this.gameFloating = this
        // Matter.World.add(App.physics.world)
    }
}

