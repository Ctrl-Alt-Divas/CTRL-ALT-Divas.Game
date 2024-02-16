import Matter from 'matter-js';
import { App } from '../system/App';
import { Scene } from '../system/Scene';
import { Background } from './Background';
import { Hero } from './Hero';
import { Platforms } from './Platforms';
import { LabelScore } from './LabelScore';

export class Game extends Scene {
  create() {
    this.createBackground();
    this.createHero();
    this.createPlatforms();
    this.setEvents();
    this.createUI();
  }

  createUI() {
    this.labelScore = new LabelScore();
    this.container.addChild(this.labelScore);
    this.hero.sprite.on('score', () => {
      this.labelScore.renderScore(this.hero.score);
    });
  }

  setEvents() {
    Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
  }

  onCollisionStart(event) {
    const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.gamePlatform);
    const diamond = colliders.find((body) => body.gameDiamond);
    // const floatingTile = colliders.find((body) => body.gameFloatingTile);

    if (hero && diamond) {
      this.hero.collectDiamond(diamond.gameDiamond);
    }

    if (hero && platform) {
      this.hero.stayOnPlatform(platform.gamePlatform);
    }

    // if (hero && floatingTile) {
    //   this.hero.stayOnPlatform(platform.gameFloatingTile)
    // }
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPlatforms() {
    this.platfroms = new Platforms();
    this.container.addChild(this.platfroms.container);
  }

  createHero() {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;
    this.container.on('pointerdown', () => {
      this.hero.startJump();
    });
    this.hero.sprite.once('die', () => {
      this.saveScore();
      App.scenes.start('Game');
    });
  }

  async saveScore() {
    if (App.config.playerId && this.hero?.score > 1) {
      await fetch('http://localhost:8080/api/players/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: App.config.playerId, score: this.hero.score }),
      });
    }
  }

  update(dt) {
    this.bg.update(dt);
    this.platfroms.update(dt);
  }

  destroy() {
    Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    App.app.ticker.remove(this.update, this);
    this.bg.destroy();
    this.hero.destroy();
    this.platfroms.destroy();
    this.labelScore.destroy();
  }
}