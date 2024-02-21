import * as PIXI from 'pixi.js';
import { App } from './App';
import { Scene } from './Scene';

export class Menu {
  constructor() {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    this.create();
  
    App.app.ticker.add(this.update, this);
    
  }

    create() {
        this.onStart();
    }

    onStart() {
      this.titleText = new PIXI.Text('CTRL-ALT-DIVAS', {
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: 62,
        fill: ["#FF7F50"],
    });
    this.titleText.x = 35;
    this.titleText.y = 90;
        // Text button to go to gameplay screen
        this.gameplayText = new PIXI.Text('Get Ready To Play', {
            fontFamily: 'Verdana',
            fill: 0x000000,
            fontSize: 24
          });
          this.gameplayText.x = 35;
          this.gameplayText.y = 320;
          // These options make the text clickable
          this.gameplayText.buttonMode = true;
          this.gameplayText.interactive = true;
          // Go to the gameplay scene when clicked
          this.gameplayText.on('pointerup', () => {
            this.container.gotoScene(new Scene(this.container));
          });
  
          // Finally we add these elements to the new
          // container provided by the coordinator
          // this.container.addChild(this.onStart);
          // Resolving the promise signals to the coordinator
          // that this scene is all done with setup
          // this.resolve();
    }

   
  // The menu is static so there's not
  // any need for changes on update
  update(dt) {}

  // There isn't anything to teardown
  // when the menu exits
  destroy() {}
}