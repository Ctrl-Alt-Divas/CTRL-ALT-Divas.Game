import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
import * as Matter from "matter-js";

class Application {
  run(config) {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    this.config = config;

    this.app = new PIXI.Application({
      resizeTo: window,
      clearBeforeRender: true,
      view: document.getElementById("game-canvas"),
    });
    globalThis.__PIXI_APP__ = this.app;
    //this.app.ticker.maxFPS = 60;
    const container = document.getElementById("container");

    if (container) {
      container.appendChild(this.app.view);
    }

    this.scenes = new ScenesManager();
    this.app.stage.interactive = true;
    this.app.stage.addChild(this.scenes.container);

    this.loader = new Loader(this.app.loader, this.config);
    this.loader.preload().then(() => this.start());

    this.createPhysics();
  }

  createPhysics() {
    this.physics = Matter.Engine.create();
    const runner = Matter.Runner.create();
    Matter.Runner.start(runner, this.physics);
  }
  character(key) {
    if (this.loader.resources[key]) {
      const textures = [];
      for (let i = 1; i < 8; i++) {
        const texture = PIXI.Texture.from(`${key}${i}.png`);
        textures.push(texture);
      }
      return textures;
    }
  }
  res(key) {
    if (this.loader.resources[key] && this.loader.resources[key]?.texture) {
      return this.loader.resources[key]?.texture;
    }
  }

  sprite(key) {
    return new PIXI.Sprite(this.res(key));
  }

  start() {
    this.scenes.start("Game");
  }
}

export const App = new Application();
