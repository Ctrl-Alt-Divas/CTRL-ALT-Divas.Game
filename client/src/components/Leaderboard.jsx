import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetLeaderboardMutation } from "../../api/divasApi";
import { updateLeaderboard } from "../app/slice";

function Leaderboard() {
  const [getLeaderboard] = useGetLeaderboardMutation();

  const dispatch = useDispatch();
  let [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const leaderboard = await getLeaderboard();
      dispatch(updateLeaderboard(leaderboard));
      setLeaderboard(leaderboard.data);
    };
    fetchData().catch(console.error);
  }, []);

    function createLeaderboard() {
        const rows = [];
        for (const player of leaderboard) {
            rows.push(
                <div key={player.id} className='flex items-center justify-between  lg:flex gap-10 items-center justify-between'>
                    <div className='flex items-center lg:flex gap-10 items-center'>
                            <p className='text-xl text-purple-300 pr-2 lg:text-3xl text-purple-300'>{leaderboard.indexOf(player) + 1}</p>
                            <img
                                className='rounded-full h-[50px] border-2'
                                src={new URL(`../assets/images/profile/${player.image}`, import.meta.url).href}
                                width={50}
                            />
                            <p className='text-xl text-purple-400 pr-5 lg:text-3xl text-purple-400'>{player.username}</p>
                    </div>
                       
                <div className='flex gap-10 items-center'>
                    <p className='text-3xl text-cyan-400 '>{player.score}</p>
                </div>
                </div>
            );
        }
        return rows;
    }

    return (
        <>
            <div className='flex w-full items-center justify-center'>
                <div className='flex flex-col items-center'>
                    <div className='text-fuchsia-500 text-4xl mb-5 mt-5'>Leaderboard</div>
                    {leaderboard && leaderboard.length > 0 && (
                        <div className='flex flex-col gap-3'>{createLeaderboard()}</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Leaderboard;
