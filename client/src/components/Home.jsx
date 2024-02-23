import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetCharactersMutation, useGetLeaderboardMutation} from '../../api/divasApi';
import {updateLeaderboard} from '../app/slice';
import CarouselVideos from './CarouselVideos';

function Home() {
    const token = useSelector((it) => it.state?.token);

    const [getLeaderboard] = useGetLeaderboardMutation();
    const [getCharacters] = useGetCharactersMutation();

    const dispatch = useDispatch();
    let [leaderboard, setLeaderboard] = useState();
    let [characters, setCharacters] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const leaderboard = await getLeaderboard();
            dispatch(updateLeaderboard(leaderboard));
            setLeaderboard(leaderboard.data);

            const characters = await getCharacters();
            setCharacters(characters.data);
        };

        fetchData().catch(console.error);
    }, []);

    function createLeaderboard() {
        const rows = [];
        let counter = 0;
        for (const player of leaderboard) {
            if (counter === 10) break;
            rows.push(
                <div key={player.id} className='flex gap-10 items-center justify-between'>
                    <div className='flex gap-10 items-center'>
                        <p className='text-xl text-fuchsia-400'>{leaderboard.indexOf(player) + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img
                                className='rounded-full h-[50px] border-2'
                                src={new URL(`../assets/images/profile/${player.image}`, import.meta.url).href}
                                width={50}
                            />
                            <p className='text-xl text-fuchsia-400'>{player.username}</p>
                        </div>
                    </div>
                    <p className='text-xl text-cyan-400'>{player.score}</p>
                </div>
            );
            counter++;
        }
        return rows;
    }

    function createCharacters() {
        const rows = [];
        for (const character of characters) {
            rows.push(
                <Link key={character.id} to={`/characters/${character.id}`}>
                    <div className='bg-indigo-950 border-2 hover:bg-indigo-800 border-purple-300 w-[300px] h-[400px] flex justify-between flex-col p-5 rounded-md items-center'>
                        <p>{character.name}</p>
                        <img src={new URL(`../assets/images/${character.image}`, import.meta.url).href} width={250} />
                        <p>{character.shrtdescription}</p>
                    </div>
                </Link>
            );
        }
        return rows;
    }

    return (
        <>
            <div className='flex flex-col gap-20 items-center'>
                <div className='flex w-full border-2 border-purple-300'>
                    <div className='flex flex-col hero-bg h-[80vh] basis-3/4 items-center justify-end'>
                        {token && (
                            <Link
                                to='/character-select'
                                className='bg-indigo-950 w-26 p-3 rounded-md text-lg border-2 border-purple-300 mb-10 text-purple-300 font-semibold'
                            >
                                Play Now
                            </Link>
                        )}
                        {!token && (
                            <Link
                                to='/login'
                                className='bg-indigo-950 w-26 p-3 rounded-md text-lg border-2 border-purple-300 mb-10 text-purple-300 font-semibold'
                            >
                                Play Now
                            </Link>
                        )}
                    </div>
                    <div className='flex flex-col basis-1/4 items-center border-2 border-purple-300'>
                        <div className='text-fuchsia-500 text-2xl mb-5 mt-2'>Top Players</div>
                        {leaderboard && leaderboard.length > 0 && (
                            <div className='flex flex-col gap-3'>{createLeaderboard()}</div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col gap-10 items-center'>
                    <h2 className='text-purple-300 text-3xl'>Characters</h2>
                    {characters && characters.length > 0 && (
                        <div className='flex gap-20 text-md text-purple-300 font-semibold flex-wrap'>
                            {createCharacters()}
                        </div>
                    )}
                </div>
                <hr className='border-0 bg-indigo-800 rounded w-2/3 h-1 mx-auto' />
                <div className='bg-indigo-950 border-2 border-purple-300 p-5 ml-20 mr-20 w-[80vw] text-purple-300'>
                    <h2 className='text-3xl mb-5'>How to Play</h2>
                    <p className='text-xl'>
                        Welcome to CTRL-ALT-Divas! Join Lani, Eli, Lilypad and Fancypants as they learn the fundamentals
                        of programming and conquer the world of software development. With each character, you have
                        different stats that may assist or hinder your gameplay (You can find this information in the
                        character cards above). Gain points by learning new frameworks and languages, all while fighting
                        bugs on the way.
                    </p>
                    <br />
                    <p className='text-3xl'>Controls</p>
                    <br />
                    <p className='flex justify-center'>
                        <img
                            className='w-24 h-12'
                            alt='spacebar'
                            src='https://art.pixilart.com/sr27cee4a862faws3.png'
                        />
                        : Shoot projectile
                    </p>
                    <p className='flex justify-center'>
                        <img
                            className='w-12 h-10'
                            alt='click'
                            src='https://cdn.freebiesupply.com/logos/large/2x/windows-cursor-logo-png-transparent.png'
                        />
                        : Jump
                    </p>
                    <br />
                    <p className='flex justify-center'>
                        <img
                            className='w-12 h-10'
                            alt='click'
                            src='https://cdn.freebiesupply.com/logos/large/2x/windows-cursor-logo-png-transparent.png'
                        />
                        (x2): Jump twice
                    </p>
                </div>
                <hr className='border-0 bg-indigo-800 rounded w-2/3 h-1 mx-auto' />
                <div className='mb-10'>
                    <CarouselVideos />
                </div>
            </div>
        </>
    );
}

export default Home;
