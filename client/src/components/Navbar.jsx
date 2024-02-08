import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setToken, updatePlayer} from '../app/slice';

function Navbar() {
    // token should be on the player object which is set on login
    const token = useSelector((it) => it.state?.token);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // update player in state to be empty
    function logout() {
        dispatch(updatePlayer(''));
        dispatch(setToken(''));
        navigate('/');
    }

    return (
        <Link to='/' className='bg-indigo-950 h-14 flex justify-between items-center pl-10 pr-10'>
            <div className='flex gap-2 items-center hover:bg-fuchsia-600 hover:rounded-md p-1'>
                <img src='https://freepngtransparent.com/wp-content/uploads/2023/03/mario-png-62.png' width={30} />
                <p className='text-2xl text-fuchsia-600 hover:text-slate-950'>CTRL-ALT-DIVAS</p>
            </div>
            <div className='flex gap-10'>
                <Link to='/' className='text-xl text-fuchsia-600 hover:text-cyan-500'>
                    Home
                </Link>
                <Link to='/gameplay' className='text-xl text-fuchsia-600 hover:text-cyan-500'>
                    Game
                </Link>
                <Link to='/leaderboard' className='text-xl text-fuchsia-600 hover:text-cyan-500'>
                    Leaderboard
                </Link>
                {!token && (
                    <Link to='/register' className='text-xl text-fuchsia-600 hover:text-cyan-500'>
                        Register
                    </Link>
                )}
                {!token && (
                    <Link to='/login' className='text-xl text-fuchsia-600 hover:text-cyan-500'>
                        Login
                    </Link>
                )}
                {token && (
                    <Link to='/account' className='text-xl text-fuchsia-600 hover:text-cyan-500'>
                        Account
                    </Link>
                )}
                {token && (
                    <>
                        <a onClick={() => logout()} to='/'>
                            Logout
                        </a>
                    </>
                )}
            </div>
        </Link>
    );
}

export default Navbar;
