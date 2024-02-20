import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class Background {
  constructor() {
    this.speed = App.config.bgSpeed;
    this.container = new PIXI.Container();
    this.createSprites('bg');
  }

  createSprites(image) {
    this.sprites = [];

    for (let i = 0; i < 3; i++) {
      this.createSprite(image, i);
    }
  }

  createSprite(image, i) {
    const sprite = App.sprite(image);

    sprite.x = sprite.width * i;
    sprite.y = 0;
    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  move(sprite, offset) {
    const spriteRightX = sprite.x + sprite.width;

    const screenLeftX = 0;

    if (spriteRightX <= screenLeftX) {
      sprite.x += sprite.width * this.sprites.length;
    }

    sprite.x -= offset;
  }

  update(dt) {
    const offset = this.speed * dt;

    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
    if (App.scenes.scene.hero.score === 5) {
      this.createSprites('bg2');
    }
    if (App.scenes.scene.hero.score === 10) {
      this.createSprites('bg3');
    }
    if (App.scenes.scene.hero.score === 15) {
      this.createSprites('bg4');
    }
  }

  destroy() {
    this.container.destroy();
  }
}
