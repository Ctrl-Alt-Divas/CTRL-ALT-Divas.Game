import Matter from 'matter-js';
import { App } from '../system/App';
import { Scene } from '../system/Scene';
import { Background } from './Background';
import { Hero } from './Hero';
import { Platforms } from './Platforms';
import { Floatings } from './Floatings';
import { LabelScore } from './LabelScore';
import { LevelText } from './LevelText';

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
    this.levelText = new LevelText();

    this.container.addChild(this.labelScore);
    this.container.addChild(this.levelText);

    this.hero.sprite.on('score', () => {
      this.labelScore.renderScore(this.hero.score);
    });
    this.hero.sprite.on('level', (level) => {
      this.levelText.renderLevel(level);
    });
  }

  setEvents() {
    Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
  }

  // if you press spacebar projectile happens
  keysDown(e) {
    if (e.keyCode && e.keyCode === 32) {
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

    // if we collide with bug restart game
    if (hero && bug) {
     this.hero.die()
    }

    // if projectile collides with bug, remove bug
    if (bug && projectile) {
      this.hero.killBugAndProjectile(bug.gameBug, projectile.gameProjectile);
    }
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPlatforms() {
    this.floatings = new Floatings();
    this.platfroms = new Platforms();
    this.container.addChild(this.platfroms.container);
    this.container.addChild(this.floatings.container);
  }

  createHero() {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;
    this.container.on('pointerdown', () => {
      this.hero.startJump();
    });

    // key down listener
    window.addEventListener('keydown', (event) => this.onKeyDown(this.hero, this.container, event));

    this.hero.sprite.once('die', () => {
      this.saveScore();
      App.scenes.start('Game');
    });
  }

  onKeyDown(hero, container, e) {
    if (e.keyCode === 32) {
      hero.fire(hero.body.position.x - 96 / 2, container, hero.body.position.y - 96 / 2);
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

  // if you can't find canvas, stop game
  update(dt) {
    const foundCanvas = document.querySelector('canvas');
    if (!foundCanvas) {
      App.app.stop();
      App.app.destroy();
    }
    this.bg.update(dt);
    this.platfroms.update(dt);
    this.floatings.update(dt);
  }

  destroy() {
    Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    App.app.ticker.remove(this.update, this);
    this.bg.destroy();
    this.hero.destroy();
    this.platfroms.destroy();
    this.floatings.destroy();
    this.labelScore.destroy();
    this.levelText.destroy();
  }
}
