import {useParams} from 'react-router-dom';
import {Game} from './scripts/game/Game';
import {App} from './scripts/system/App';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Gameplay = () => {
    const {id} = useParams();
    const characters = useSelector((it) => it.state.characters);
    const player = useSelector((it) => it.state.player);

    useEffect(() => {
        const foundCanvas = document.querySelector('canvas');
        if (foundCanvas && characters && characters?.length > 0 && id && player) {
            const character = characters.find((it) => parseInt(it.id) == id);

            fitToContainer(foundCanvas);
            App.run({
                playerId: player.id,
                bgSpeed: 2,
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
                            min: 2,
                            max: 6,
                        },
                        cols: {
                            min: 3,
                            max: 9,
                        },
                        offset: {
                            min: 60,
                            max: 200,
                        },
                    },
                },
                diamonds: {
                    chance: 0.4,
                    offset: {
                        min: 100,
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
                loader: [
                    {key: 'bg', data: new URL('./sprites/8.png', import.meta.url).href},
                    {
                        key: 'diamond',
                        data: new URL('./sprites/diamond.png', import.meta.url).href,
                    },
                    {
                        key: 'hero',
                        data: new URL('./sprites/hero.png', import.meta.url).href,
                    },
                    {
                        key: 'jump',
                        data: new URL('./sprites/jump.png', import.meta.url).href,
                    },
                    {
                        key: 'platform',
                        data: new URL('./sprites/platform.png', import.meta.url).href,
                    },
                    {
                        key: 'tile',
                        data: new URL('./sprites/tile3.png', import.meta.url).href,
                    },
                    {
                        key: 'beauty',
                        data: new URL('./sprites/beauty.png', import.meta.url).href,
                    },
                    {
                        key: 'beauty2',
                        data: new URL('./sprites/beauty2.png', import.meta.url).href,
                    },
                ],
                scenes: {
                    Game: Game,
                },
            });
        }
    }, [characters, id]);

    function fitToContainer(foundCanvas) {
        foundCanvas.style.width = '100vw';
        foundCanvas.style.height = '90vh';
        foundCanvas.width = foundCanvas.offsetWidth;
        foundCanvas.height = foundCanvas.offsetHeight;
    }

    return <canvas id='game-canvas'></canvas>;
};

export default Gameplay;
