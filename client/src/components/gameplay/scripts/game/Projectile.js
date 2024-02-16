import Matter from 'matter-js';
import { App } from '../system/App';

export class Projectile {
  constructor(x, y) {
    this.createSprite(x, y);
    this.createBody(x, y);
    App.app.ticker.add(this.update.bind(this));
  }

  createSprite(x, y) {
    this.sprite = App.sprite('diamond');
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.speed = 10;
  }

  createBody() {
    this.body = Matter.Bodies.rectangle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y + this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0 }
    );
    Matter.World.add(App.physics.world, this.body);
    this.body.gameProjectile = this;
    this.body.isSensor = true;
  }

  update() {
    // if (this.sprite) {
    //   Matter.Body.setPosition(this.body, {
    //     x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
    //     y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y,
    //   });
    // }
  }

  destroy() {
    if (this.sprite) {
      App.app.ticker.remove(this.update, this);
      Matter.World.remove(App.physics.world, this.body);
      this.sprite.destroy();
      this.sprite = null;
    }
  }
}
