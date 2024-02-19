import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { Floating } from './Floating';

export class Floatings {
  constructor() {
    this.floatings = [];
    this.container = new PIXI.Container();

    this.createPlatform({
      rows: 1,
      cols: 2,
      x: 200,
      y: 800
    });

    
  }

  get randomData() {
    this.ranges = App.config.floatings.ranges;
    let data = { rows: 0, cols: 0, x: 0, y: 0 };

    const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

    data.x = this.current.container.x + this.current.container.width + offset;
    data.y = this.current.container.height + (600);
    data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
    data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

    return data;
  }

  createPlatform(data) {
    const platform = new Floating(data.rows, data.cols, data.x, data.y);
    this.container.addChild(platform.container);
    this.floatings.push(platform);
    this.current = platform;
  }

  update() {
    if (this.current.container.x + this.current.container.width < window.innerWidth && this.current.container.y + this.current.container.height < window.innerHeight) {
      this.createPlatform(this.randomData);
    }
    this.floatings.forEach((platform) => platform.move());
  }

  destroy() {
    this.floatings.forEach((platform) => platform.destroy());
    this.container.destroy();
  }
}