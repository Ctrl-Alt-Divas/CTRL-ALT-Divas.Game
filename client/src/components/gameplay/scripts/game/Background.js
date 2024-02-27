import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { sound } from '@pixi/sound';

export class Background {
  constructor() {
    this.speed = App.config.bgSpeed;
    this.container = new PIXI.Container();
    this.createSprites('bg');
  }

  createSprites(image) {

    if(this.sprites && this.sprites?.length > 0) {
      for(const sprite of this.sprites) {
        if(sprite) {
          sprite.destroy()
        }
      }
    }

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

  update() {
    if (App.scenes.scene.hero.score === 15) {
      this.createSprites('bg2');
      sound.find('level1').stop();
      sound.play('level2', { loop: true, volume: 0.1 });
    } else if (App.scenes.scene.hero.score === 30) {
      this.createSprites('bg3');
      sound.find('level2').stop();
      sound.play('level3', { loop: true, volume: 0.2 });
    } else if (App.scenes.scene.hero.score === 60) {
      this.createSprites('bg4');
      sound.find('level3').stop();
      sound.play('level4', { loop: true, volume: 0.2 });
    }
  }

  destroy() {
    this.container.destroy();
  }
}