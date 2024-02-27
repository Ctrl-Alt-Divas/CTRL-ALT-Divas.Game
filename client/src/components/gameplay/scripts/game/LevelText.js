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

    let levelName = ''

    if(level === 1){
      levelName = 'Check Your Terminal'
    }
    else if(level === 2){
      levelName = 'Console.log'
    }
    else if(level === 3){
      levelName = 'Component Chaos'
    }
    else if(level === 4){
      levelName = 'Redux Hell'
    }

    this.text = `Level: ${level} - ${levelName}`;
  }
}
