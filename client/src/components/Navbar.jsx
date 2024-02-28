import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setToken, updatePlayer} from '../app/slice';
import {GiTrophyCup} from 'react-icons/gi';
import {SlGameController} from 'react-icons/sl';
import {BiSolidUserAccount} from 'react-icons/bi';
import {IoMdLogOut} from 'react-icons/io';
import {IoMdLogIn} from 'react-icons/io';
import {IoHome} from 'react-icons/io5';
import { useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";

function Navbar() {
    
    // token should be on the player object which is set on login
    const token = useSelector((it) => it.state?.token);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const dispatch = useDispatch();

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    // update player in state to be empty
    async function logout() {
        dispatch(updatePlayer(''));
        dispatch(setToken({token: ''}));
    }

    return (
              

    <header className='bg-indigo-950'>
        <div className='flex items-center justify-between px-8 py-2'>

           
            <div >
                    <Link to='/' className='flex items-center text-fuchsia-500 font-semibold hover:text-cyan-500'>
                        <img className='h-12' src={new URL(`../assets/images/icon.png`, import.meta.url).href} alt='Arcade Machine'/>
                        CTRL-ALT-DIVAS
                    </Link>
            </div>
            <div >
                <button type='button' className='text-purple-300 hover:text-cyan-600 focus:text-cyan-600 lg:hidden' onClick={toggleMenu}>
                    <CiMenuBurger className='h-6 w-6 fill-current'/>
                    {isMenuOpen ? '' : ''}
                </button>
            </div>
        <div className='hidden lg:flex'>
        <Link to='/' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'><IoHome className='text-fuchsia-500 size-6' />Home
            </Link>
            
            <Link to='/leaderboard' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                <GiTrophyCup className='text-[#dd784b] size-6'/>
                Leaderboard
            </Link>
            {!token && (
                    <Link to='/login' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                        
                            <IoMdLogIn className='text-purple-600 size-6'/>
                            Login
                        
            </Link>
            )}
            {token && (
            <Link to='/character-select' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                <SlGameController className='text-blue-600 size-6'/>
                Game
            </Link>
            )}
            {token && (
            <Link to='/account' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                        
                            <BiSolidUserAccount className='text-green-600 size-6'/>
                            Account
                        
            </Link>
            )}
            {token && (
            <a onClick={() => logout()} href='/' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                        
                            <IoMdLogOut className='text-purple-600 size-6'/>
                            Logout
                        
            </a>
            )}
        </div>
        </div>
        {isMenuOpen && (
        <div className='lg:hidden px-6 pt-2 pb-4'>
            <Link to='/' className='flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'><IoHome className='text-fuchsia-500 size-6'/>Home
            </Link>
            
            <Link to='/leaderboard' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                <GiTrophyCup className='text-[#dd784b] size-6'/>
                Leaderboard
            </Link>
            {!token && (
                    <Link to='/login' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                        
                            <IoMdLogIn className='text-purple-600 size-6'/>
                            Login
                        
            </Link>
            )}
            {token && (
            <Link to='/character-select' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                <SlGameController className='text-blue-600 size-6'/>
                Game
            </Link>
            )}
            {token && (
            <Link to='/account' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                        
                            <BiSolidUserAccount className='text-green-600 size-6'/>
                            Account
                        
            </Link>
            )}
            {token && (
            <a onClick={() => logout()} href='/' className='mt-1 flex items-center px-2 text-purple-300 rounded hover:bg-cyan-500 font-semibold'>
                        
                            <IoMdLogOut className='text-purple-600 size-6'/>
                            Logout
                        
            </a>
            )}
          
        </div>
        )}

    </header>
    );
}

export default Navbar;
