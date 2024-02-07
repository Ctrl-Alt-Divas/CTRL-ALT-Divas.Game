import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetCharactersMutation, useGetLeaderboardMutation} from '../../api/divasApi';
import {updateLeaderboard} from '../app/slice';

function Home() {
    const [getLeaderboard] = useGetLeaderboardMutation();
    const [getCharacters] = useGetCharactersMutation();

    const dispatch = useDispatch();
    let [leaderboard, setLeaderboard] = useState();
    let [characters, setCharacters] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const leaderboard = await getLeaderboard();
            dispatch(updateLeaderboard(leaderboard.data));
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
                <div className='flex gap-9 items-center'>
                    <p className='text-xl text-pink-400'>{leaderboard.indexOf(player) + 1}</p>
                    <img
                        className='rounded-full h-[50px] border-2'
                        src={new URL(`../assets/images/profile/${player.image}`, import.meta.url).href}
                        width={50}
                    />
                    <p className='text-xl text-pink-400'>{player.username}</p>
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
                <Link to={`/characters/${character.id}`}>
                    <div className='bg-purple-600 w-[200px] flex justify-between flex-col p-5 rounded-md'>
                        <p>{character.name}</p>
                        <img
                            src='https://freepngtransparent.com/wp-content/uploads/2023/03/mario-png-62.png'
                            width={200}
                        />
                        {/* Maybe add our short description to the seedData? */}
                        <p>Short description</p>
                    </div>
                </Link>
            );
        }
        return rows;
    }

    return (
        <>
            <div className='flex w-full'>
                <div className='flex flex-col hero-bg h-[600px] basis-3/4 items-center justify-end'>
                    <Link to='/gameplay' className='bg-purple-500 w-24 p-2 rounded-md text-lg mb-10'>
                        Play Now
                    </Link>
                </div>
                <div className='flex flex-col basis-1/4 items-center border-2'>
                    <div className='text-pink-500 text-2xl mb-5 mt-2'>Leaderboards</div>
                    {leaderboard && leaderboard.length > 0 && (
                        <div className='flex flex-col gap-3'>{createLeaderboard()}</div>
                    )}
                </div>
            </div>
            <div className='flex flex-col mb-4 gap-10 p-10 items-center'>
                <h2 className='text-purple-500 text-3xl'>Characters</h2>
                <div className='flex gap-10'>
                  {createCharacters()}
                </div>
            </div>
            {/* <div className='bg-pink-600 border-2'>
                <h2>How to Play</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>Carousel for Videos</div> */}
        </>
    );
}

export default Home;
