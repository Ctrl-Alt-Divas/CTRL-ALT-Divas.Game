import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { Platform } from './Platform';

export class Platforms {
  constructor() {
    this.platforms = [];
    this.container = new PIXI.Container();

    // added empty attribute
    this.createPlatform({
      rows: 1,
      cols: 8,
      x: 200,
      empty: true,
    });
  }

  get randomData() {
    this.ranges = App.config.platforms.ranges;
    let data = { rows: 0, cols: 0, x: 0 };

    const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

    data.x = this.current.container.x + this.current.container.width + offset;
    data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
    data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

    return data;
  }

  createPlatform(data) {
    const platform = new Platform(data.rows, data.cols, data.x, data.empty);
    this.container.addChild(platform.container);
    this.platforms.push(platform);
    this.current = platform;
  }

  update() {


    // Calculate the visible area of the screen
    const visibleArea = {
      minX: -this.container.x, // Left edge of the screen
      maxX: -this.container.x + window.innerWidth, // Right edge of the screen
    };

    // Generate and add new platforms if needed
    if (this.container.x + this.container.width < window.innerWidth) {
      this.createPlatform(this.randomData);
    }

    // Iterate through each platform to move left and check if it's within the visible area
    for (let i = this.platforms.length - 1; i >= 0; i--) {
      const platform = this.platforms[i];

      // Move the platform
      platform.move();
      //this.platforms.forEach((platform) => platform.move());

      // Check if the platform is completely outside the left edge of the visible area
      if (platform.container.x + platform.container.width < visibleArea.minX) {
        // Remove the platform from the container and the platforms array
        this.container.removeChild(platform.container);
        this.platforms.splice(i, 1);
        console.log(this.platforms);
      }
    } 
  }

  destroy() {
    this.platforms.forEach((platform) => platform.destroy());
    this.container.destroy();
  }
}
