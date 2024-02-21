import {useParams} from 'react-router-dom';
import {Game} from './scripts/game/Game';
import {App} from './scripts/system/App';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Gameplay = () => {
    const {id} = useParams();
    const characters = useSelector((it) => it.state.characters);
    const player = useSelector((it) => it.state.player);

    // added checking for which character is selected
    useEffect(() => {
        const foundCanvas = document.querySelector('canvas');
        if (foundCanvas && characters && characters?.length > 0 && id && player) {
            const character = characters.find((it) => parseInt(it.id) == id);
            // focusses the game so that when you are jumping or shooting it doesn't move your scroll bar
            window.addEventListener(
                'keydown',
                function (evt) {
                    window.focus();
                    evt.preventDefault();
                    evt.stopPropagation();
                    evt.target.style.cursor = 'default';
                },
                false
            );

            fitToContainer(foundCanvas);
            App.run({
                characterName: character.name,
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
                            min: 4,
                            max: 10,
                        },
                        offset: {
                            min: 100,
                            max: 150,
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
                bugs: {
                    chance: 0.05,
                    offset: {
                        min: 0,
                        max: 10,
                    },
                },
                floatings: {
                    moveSpeed: character.speed,
                    ranges: {
                        rows: {
                            min: 1,
                            max: 1,
                        },
                        cols: {
                            min: 1,
                            max: 4,
                        },
                        offset: {
                            min: 300,
                            max: 500,
                        },
                    },
                },
                score: {
                    x: 10,
                    y: 10,
                    anchor: 0,
                    style: {
                        fontFamily: 'Verdana',
                        fontWeight: 'bold',
                        fontSize: 44,
                        fill: ['#FF7F50'],
                    },
                },
                level: {
                    x: 10,
                    y: 75,
                    anchor: 0,
                    style: {
                        fontFamily: 'Verdana',
                        fontWeight: 'bold',
                        fontSize: 24,
                        fill: ['#FF7F50'],
                    },
                },
                loader: [
                    {key: 'bg', data: new URL('./sprites/bg.png', import.meta.url).href},
                    {key: 'bg2', data: new URL('./sprites/bg2.png', import.meta.url).href},
                    {key: 'bg3', data: new URL('./sprites/bg3.png', import.meta.url).href},
                    {key: 'bg4', data: new URL('./sprites/bg4.png', import.meta.url).href},
                    {key: 'vscode', data: new URL('./sprites/vscode.png', import.meta.url).href},
                    {key: 'react', data: new URL('./sprites/react.png', import.meta.url).href},
                    {key: 'js', data: new URL('./sprites/js.png', import.meta.url).href},
                    {key: 'redux', data: new URL('./sprites/redux.png', import.meta.url).href},
                    {
                        key: 'projectile-Fancypants',
                        data: new URL('./sprites/projectiles/projectile-Fancypants.png', import.meta.url).href,
                    },
                    {
                        key: 'projectile-Lilypad',
                        data: new URL('./sprites/projectiles/projectile-Lilypad.png', import.meta.url).href,
                    },
                    {
                        key: 'projectile-Lani',
                        data: new URL('./sprites/projectiles/projectile-Lani.png', import.meta.url).href,
                    },
                    {
                        key: 'projectile-Eli',
                        data: new URL('./sprites/projectiles/projectile-Eli.png', import.meta.url).href,
                    },
                    {
                        key: 'creature',
                        data: new URL('./sprites/alien.png', import.meta.url).href,
                    },
                    {
                        key: 'jump',
                        data: new URL('./sprites/jump.png', import.meta.url).href,
                    },
                    {
                        key: 'floatingtile',
                        data: new URL('./sprites/platform.png', import.meta.url).href,
                    },
                    {
                        key: 'tile',
                        data: new URL('./sprites/tilepink.png', import.meta.url).href,
                    },
                    {
                        key: 'Fancypants-walk1',
                        data: new URL('./sprites/characters/Fancypants/1.png', import.meta.url).href,
                    },
                    {
                        key: 'Fancypants-walk2',
                        data: new URL('./sprites/characters/Fancypants/2.png', import.meta.url).href,
                    },
                    {
                        key: 'Fancypants-walk3',
                        data: new URL('./sprites/characters/Fancypants/3.png', import.meta.url).href,
                    },
                    {
                        key: 'Fancypants-walk4',
                        data: new URL('./sprites/characters/Fancypants/4.png', import.meta.url).href,
                    },
                    {
                        key: 'Fancypants-walk5',
                        data: new URL('./sprites/characters/Fancypants/5.png', import.meta.url).href,
                    },
                    {
                        key: 'Fancypants-walk6',
                        data: new URL('./sprites/characters/Fancypants/6.png', import.meta.url).href,
                    },
                    {
                        key: 'Fancypants-walk7',
                        data: new URL('./sprites/characters/Fancypants/7.png', import.meta.url).href,
                    },
                    {
                        key: 'Eli-walk1',
                        data: new URL('./sprites/characters/Eli/1.png', import.meta.url).href,
                    },
                    {
                        key: 'Eli-walk2',
                        data: new URL('./sprites/characters/Eli/2.png', import.meta.url).href,
                    },
                    {
                        key: 'Eli-walk3',
                        data: new URL('./sprites/characters/Eli/3.png', import.meta.url).href,
                    },
                    {
                        key: 'Eli-walk4',
                        data: new URL('./sprites/characters/Eli/4.png', import.meta.url).href,
                    },
                    {
                        key: 'Eli-walk5',
                        data: new URL('./sprites/characters/Eli/5.png', import.meta.url).href,
                    },
                    {
                        key: 'Eli-walk6',
                        data: new URL('./sprites/characters/Eli/6.png', import.meta.url).href,
                    },
                    {
                        key: 'Eli-walk7',
                        data: new URL('./sprites/characters/Eli/7.png', import.meta.url).href,
                    },
                    {
                        key: 'Lilypad-walk1',
                        data: new URL('./sprites/characters/Lilypad/1.png', import.meta.url).href,
                    },
                    {
                        key: 'Lilypad-walk2',
                        data: new URL('./sprites/characters/Lilypad/2.png', import.meta.url).href,
                    },
                    {
                        key: 'Lilypad-walk3',
                        data: new URL('./sprites/characters/Lilypad/3.png', import.meta.url).href,
                    },
                    {
                        key: 'Lilypad-walk4',
                        data: new URL('./sprites/characters/Lilypad/4.png', import.meta.url).href,
                    },
                    {
                        key: 'Lilypad-walk5',
                        data: new URL('./sprites/characters/Lilypad/5.png', import.meta.url).href,
                    },
                    {
                        key: 'Lilypad-walk6',
                        data: new URL('./sprites/characters/Lilypad/6.png', import.meta.url).href,
                    },
                    {
                        key: 'Lilypad-walk7',
                        data: new URL('./sprites/characters/Lilypad/7.png', import.meta.url).href,
                    },
                    {
                        key: 'Lani-walk1',
                        data: new URL('./sprites/characters/Lani/1.png', import.meta.url).href,
                    },
                    {
                        key: 'Lani-walk2',
                        data: new URL('./sprites/characters/Lani/2.png', import.meta.url).href,
                    },
                    {
                        key: 'Lani-walk3',
                        data: new URL('./sprites/characters/Lani/3.png', import.meta.url).href,
                    },
                    {
                        key: 'Lani-walk4',
                        data: new URL('./sprites/characters/Lani/4.png', import.meta.url).href,
                    },
                    {
                        key: 'Lani-walk5',
                        data: new URL('./sprites/characters/Lani/5.png', import.meta.url).href,
                    },
                    {
                        key: 'Lani-walk6',
                        data: new URL('./sprites/characters/Lani/6.png', import.meta.url).href,
                    },
                    {
                        key: 'Lani-walk7',
                        data: new URL('./sprites/characters/Lani/7.png', import.meta.url).href,
                    },
                ],
                scenes: {
                    Game: Game,
                },
            });
        }
    }, []);

    function fitToContainer(foundCanvas) {
        foundCanvas.style.width = '100vw';
        foundCanvas.style.height = '90vh';
        foundCanvas.width = foundCanvas.offsetWidth;
        foundCanvas.height = foundCanvas.offsetHeight;
    }

    return <canvas id='game-canvas'></canvas>;
};

export default Gameplay;
