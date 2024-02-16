import Matter from 'matter-js';
import { App } from '../system/App';
import { Scene } from '../system/Scene';
import { Background } from './Background';
import { Hero } from './Hero';
import { Platforms } from './Platforms';
import { LabelScore } from './LabelScore';
import { Projectile } from './Projectile';
import { Bug } from './Bug';

const keys = {};

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

  keysDown(e) {
    if (e.keyCode && e.keyCode === 32) {
      // keys[e.keyCode] = true;
      this.hero.fire(keys);
    }
  }

  keysUp(e) {
    if (e.keyCode) {
      keys[e.keyCode] = false;
    }
  }

  onCollisionStart(event) {
    const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.gamePlatform);
    const diamond = colliders.find((body) => body.gameDiamond);
    const bug = colliders.find((body) => body.gameBug);
    const projectile = colliders.find((body) => body.gameProjectile);

    if (hero && diamond) {
      this.hero.collectDiamond(diamond.gameDiamond);
    }

    if (hero && platform) {
      this.hero.stayOnPlatform(platform.gamePlatform);
    }

    if (hero && bug) {
      this.saveScore();
      App.scenes.start('Game');
    }

    if (bug && projectile) {
      console.log(bug.sprite);
      Matter.World.remove(App.physics.world, bug.gameBug.body);
      if (bug.sprite) {
        bug.sprite.destroy();
        bug.sprite = null;
      }
    }
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

    window.addEventListener('keydown', (event) => this.onKeyDown(this.hero, this.container, event));

    this.hero.sprite.once('die', () => {
      this.saveScore();
      App.scenes.start('Game');
    });
  }

  onKeyDown(hero, container, e) {
    if (e.keyCode === 32) {
      hero.fire(hero.body.position.x - hero.sprite.width / 2, container, hero.body.position.y - hero.sprite.height / 2);
    }
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
