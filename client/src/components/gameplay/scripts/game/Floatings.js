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
      x: 1000,
      y: 600
    });

    
  }

  get randomData() {
    this.ranges = App.config.floatings.ranges;
    let data = { rows: 0, cols: 0, x: 0, y: 0 };

    const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

    data.x = this.current.container.x + this.current.container.width + offset;
    //mess with this data.y to get the appropriate height for the floating tiles eventually 
    data.y = window.innerHeight - offset;
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
    // Calculate the visible area of the screen
    const visibleArea = {
      minX: -this.container.x, // Left edge of the screen
      maxX: -this.container.x + window.innerWidth, // Right edge of the screen
    };

    if (this.current.container.x + this.current.container.width < window.innerWidth) {
      this.createPlatform(this.randomData);
    }
   // Iterate through each platform to move left and check if it's within the visible area
    for (let i = this.floatings.length - 1; i >= 0; i--) {
      const platform = this.floatings[i];

      // Move the platform
      platform.move();
      //this.floatings.forEach((platform) => platform.move());

      // Check if the platform is completely outside the left edge of the visible area
      if (platform.container.x + platform.container.width < visibleArea.minX) {
        // Remove the platform from the container and the floatings array
        this.container.removeChild(platform.container);
        this.floatings.splice(i, 1);
        console.log(this.floatings);
      }
    } 
  }

  destroy() {
    this.floatings.forEach((platform) => platform.destroy());
    this.container.destroy();
  }
}