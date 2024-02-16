import { useParams } from "react-router-dom";
import { Game } from "./scripts/game/Game";
import { App } from "./scripts/system/App";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const Gameplay = () => {
  const { id } = useParams();
  const characters = useSelector((it) => it.state.characters);
  const player = useSelector((it) => it.state.player);

  useEffect(() => {
    const foundCanvas = document.querySelector("canvas");
    if (foundCanvas && characters && characters?.length > 0 && id && player) {
      const character = characters.find((it) => parseInt(it.id) == id);

      fitToContainer(foundCanvas);
      App.run({
        playerId: player.id,
        bgSpeed: 0,
        hero: {
          jumpSpeed: character.jump,
          maxJumps: 2,
          position: {
            x: 250,
            y: 10,
          },
        },
        platforms: {
          moveSpeed: character.speed,
          ranges: {
            rows: {
              min: 1,
              max: 1,
            },
            cols: {
              min: 3,
              max: 9,
            },
            offset: {
              min: 100,
              max: 250,
            },
          },
        },
        diamonds: {
          chance: 0.4,
          offset: {
            min: 25,
            max: 200,
          },
        },
        floatingtiles: {
          chance: 0.4,
          offset: {
            min: 100,
            max: 300,
          },
        },
        score: {
          x: 10,
          y: 10,
          anchor: 0,
          style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"],
          },
        },
        loader: [
          { key: "bg", data: new URL("./sprites/bg.png", import.meta.url).href },
          {
            key: "diamond",
            data: new URL("./sprites/vscode.png", import.meta.url).href,
          },
          {
            key: "hero",
            data: new URL("./sprites/hero.png", import.meta.url).href,
          },
          {
            key: "jump",
            data: new URL("./sprites/jump.png", import.meta.url).href,
          },
          {
            key: "floatingtile",
            data: new URL("./sprites/platform.png", import.meta.url).href,
          },
          {
            key: "tile",
            data: new URL("./sprites/tile.png", import.meta.url).href,
          },
          {
            key: "beauty",
            data: new URL("./sprites/beauty.png", import.meta.url).href,
          },
          {
            key: "beauty2",
            data: new URL("./sprites/beauty2.png", import.meta.url).href,
          },
        ],
        scenes: {
          Game: Game,
        },
      });
    }
  }, [characters, id]);

  function fitToContainer(foundCanvas) {
    foundCanvas.style.width = "100vw";
    foundCanvas.style.height = "90vh";
    foundCanvas.width = foundCanvas.offsetWidth;
    foundCanvas.height = foundCanvas.offsetHeight;
  }

  return <canvas id="game-canvas"></canvas>;
};

export default Gameplay;
