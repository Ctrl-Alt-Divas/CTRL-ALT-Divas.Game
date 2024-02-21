import { App } from "../system/App";
import Matter from "matter-js";

export class Bug {
  constructor(x, y) {
    this.createSprite(x, y);
    App.app.ticker.add(this.update, this);
  }

  stayOnPlatform(platform) {
    this.platform = platform;
  }

  createBody() {
    this.body = Matter.Bodies.rectangle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y + this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0, isStatic: true, render: { fillStyle: "#060a19" } }
    );
    this.body.gameBug = this;
    this.body.isSensor = true;
    Matter.Composite.add(App.physics.world, this.body);
  }

  createSprite(x, y) {
    this.sprite = App.sprite("creature");
    this.sprite.x = x;
    this.sprite.y = y;
  }

  update() {
    if (this.sprite) {
      Matter.Body.setPosition(this.body, {
        x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
        y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y,
      });
    }
  }

  destroy() {
    if (this.sprite) {
      App.app.ticker.remove(this.update, this);
      Matter.Composite.remove(App.physics.world, this.body);
      this.sprite.destroy();
      this.sprite = null;
    }
  }
}
