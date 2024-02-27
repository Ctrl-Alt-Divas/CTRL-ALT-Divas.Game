import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setToken, updatePlayer} from '../app/slice';
import {GiTrophyCup} from 'react-icons/gi';
import {SlGameController} from 'react-icons/sl';
import {BiSolidUserAccount} from 'react-icons/bi';
import {IoMdLogOut} from 'react-icons/io';
import {IoMdLogIn} from 'react-icons/io';
import {IoHome} from 'react-icons/io5';

function Navbar() {
    // token should be on the player object which is set on login
    const token = useSelector((it) => it.state?.token);

    const dispatch = useDispatch();

    // update player in state to be empty
    async function logout() {
        dispatch(updatePlayer(''));
        dispatch(setToken({token: ''}));
    }

    return (
        <div className='bg-indigo-950 h-14 flex justify-between items-center pl-10 pr-10'>
            <Link to='/'>
                <div className='flex gap-2 items-center text-purple-300 hover:text-cyan-500 p-1'>
                    <img src={new URL(`../assets/images/icon.png`, import.meta.url).href} width={40} />
                    <p className='text-2xl text-fuchsia-500'>CTRL-ALT-DIVAS</p>
                </div>
            </Link>
            <div className='flex gap-10'>
                <Link to='/' className='text-xl text-purple-300 hover:text-cyan-500'>
                    <div className='flex gap-2 items-center'>
                        <IoHome className='text-fuchsia-500 size-6' />
                        Home
                    </div>
                </Link>
                {token && (
                    <Link to='/character-select' className='text-xl text-purple-300 hover:text-cyan-500'>
                        <div className='flex gap-2 items-center'>
                            <SlGameController className='text-blue-600 size-6' />
                            Game
                        </div>
                    </Link>
                )}
                <Link to='/leaderboard' className='text-xl text-purple-300 hover:text-cyan-500'>
                    <div className='flex gap-2 items-center'>
                        <GiTrophyCup className='text-[#dd784b] size-6' />
                        Leaderboard
                    </div>
                </Link>
                {!token && (
                    <Link to='/login' className='text-xl text-purple-300 hover:text-cyan-500'>
                        <div className='flex gap-2 items-center'>
                            <IoMdLogIn className='text-purple-600 size-6' />
                            Login
                        </div>
                    </Link>
                )}
                {token && (
                    <Link to='/account' className='text-xl text-purple-300 hover:text-cyan-500'>
                        <div className='flex gap-2 items-center'>
                            <BiSolidUserAccount className='text-green-600 size-6' />
                            Account
                        </div>
                    </Link>
                )}
                {token && (
                    <a onClick={() => logout()} href='/' className='text-xl text-purple-300 hover:text-cyan-500'>
                        <div className='flex gap-2 items-center'>
                            <IoMdLogOut className='text-purple-600 size-6' />
                            Logout
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}

export default Navbar;
