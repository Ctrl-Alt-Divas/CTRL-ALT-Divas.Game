import {useSelector} from 'react-redux';

function Account() {
    const player = useSelector((it) => it.state.player);
    const leaderboard = useSelector((it) => it.state.leaderboard);

    return (
        <div className='p-10 flex items-center gap-20'>
          {/* Maybe add logic to change our profile picture? */}
            <img
                className='rounded-full bg-cyan-900 p-[20px] h-[250px]'
                src='https://freepngtransparent.com/wp-content/uploads/2023/03/mario-png-62.png'
                width={250}
            />
            <div className='flex flex-col items-start'>
                <h1 className='text-4xl'>{player.username}Players Name</h1>
                {/* <p>Rank: {leaderboard.findIndex(it => it.username === player.username) + 1 }</p> */}
                <p>Score: {player.score} </p>
            </div>
        </div>
    );
}

export default Account;
