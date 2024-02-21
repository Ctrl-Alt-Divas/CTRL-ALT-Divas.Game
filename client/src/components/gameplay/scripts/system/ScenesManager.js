import * as PIXI from 'pixi.js';
import { App } from './App';

export class ScenesManager {
  constructor() {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    this.currentScene = this.newScene;
  }

  async gotoScene(newScene) {
    if (this.currentScene !== undefined) {
      await this.currentScene.remove();
      this.container.removeChildren();
    }  
  
    this.newScene = new App.config.scenes[newScene]();
    this.container.addChild(this.newScene.container);
    
  }

  update(dt) {
    if (this.currentScene !== undefined) {
      this.currentScene.update(dt);
    }
  }
}
