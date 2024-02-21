import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class LevelText extends PIXI.Text {
  constructor() {
    super();
    this.x = App.config.level.x;
    this.y = App.config.level.y;
    this.anchor.set(App.config.level.anchor);
    this.style = App.config.level.style;
    this.renderLevel();
  }
  renderLevel(level = 1) {
    this.text = `Level: ${level}`;
  }
}
