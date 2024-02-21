import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import Matter from 'matter-js';
import { Projectile } from './Projectile';

export class Hero {
  constructor() {
    this.createSprite();
    this.createBody();
    App.app.ticker.add(this.update, this);
    this.dy = App.config.hero.jumpSpeed;
    this.maxJumps = App.config.hero.maxJumps;
    this.jumpIndex = 0;
    this.score = 0;
    this.projectiles = [];
  }

  collectDiamond(diamond) {
    ++this.score;
    Matter.World.remove(App.physics.world, diamond.body);
    if (diamond.sprite) {
      diamond.sprite.destroy();
      diamond.sprite = null;
    }
    this.sprite.emit('score');
  }

  // destroys bug and projectile sprite
  killBugAndProjectile(bug, projectile) {
    Matter.World.remove(App.physics.world, bug.body);
    Matter.World.remove(App.physics.world, projectile.body);

    if (bug.sprite) {
      bug.sprite.destroy();
      bug.sprite = null;
    }

    if (projectile.sprite) {
      projectile.sprite.destroy();
      projectile.sprite = null;
    }
  }

  stayOnPlatform(platform) {
    this.platform = platform;
    this.jumpIndex = 0;
  }

  startJump() {
    if (this.platform || this.jumpIndex === 1) {
      ++this.jumpIndex;
      this.platform = null;
      Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
    }
  }

  // creates the projectile and the direction
  fire(x, container, y) {
    if (this.projectiles.length < 1) {
      let projectile = new Projectile(x + 30, y + 40);
      this.projectiles.push(projectile);
      container.addChild(projectile.sprite);
      this.container = container;
    }
  }

  updateProjectiles() {
    for (const projectile of this.projectiles) {
      if (projectile.sprite) {
        projectile.body.position.x += 0.2;
        projectile.sprite.x = projectile.body.position.x - projectile.sprite.width / 2 + 0.2;
      } else {
        this.container.removeChild(projectile.sprite);
        this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
        Matter.World.remove(App.physics.world, projectile.body);
      }
    }

    for (const projectile of this.projectiles) {
      if (projectile.sprite.x > window.innerWidth) {
        this.container.removeChild(projectile.sprite);
        this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
        Matter.World.remove(App.physics.world, projectile.body);
      }
    }
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
    this.body.gameHero = this;
  }

  createSprite() {
    this.sprite = new PIXI.AnimatedSprite([
      App.res(`${App.config.characterName}-walk1`),
      App.res(`${App.config.characterName}-walk2`),
      App.res(`${App.config.characterName}-walk3`),
      App.res(`${App.config.characterName}-walk4`),
      App.res(`${App.config.characterName}-walk5`),
      App.res(`${App.config.characterName}-walk6`),
      App.res(`${App.config.characterName}-walk7`),
    ]);

    this.sprite.x = App.config.hero.position.x;
    this.sprite.y = App.config.hero.position.y;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
  }

  update() {
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;

    if (this.sprite.y > window.innerHeight || (this.sprite && this.sprite?.x <= 0)) {
      this.sprite.emit('die');
    }

    this.updateProjectiles();
    if (this.score === 5) {
      this.sprite.emit('level', 2);
    }
    if (this.score === 10) {
      this.sprite.emit('level', 3);
    }
    if (this.score === 15) {
      this.sprite.emit('level', 4);
    }
  }

  die() {
    this.sprite.emit('die');
  }

  destroy() {
    App.app.ticker.remove(this.update, this);
    Matter.World.remove(App.physics.world, this.body);
    this.sprite.destroy();
  }
}