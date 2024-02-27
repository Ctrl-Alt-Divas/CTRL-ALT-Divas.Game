import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Footer() {
    const token = useSelector((it) => it.state?.token);
    const year = new Date().getFullYear();
    return (
        <>
        <div className='bg-indigo-950 text-purple-300'>
        <div className='flex items-center justify-evenly'>
                    <Link className='text-purple-500 hover:text-cyan-500' to='/'>Home</Link>
                    <Link className='text-purple-500 hover:text-cyan-500' to='/leaderboard'>Leaderboard</Link>
                     {token && <Link className='text-purple-500 hover:text-cyan-500' to='/character-select'>Game</Link>} 
                    {token && <Link className='text-purple-500 hover:text-cyan-500' to='/character-select'>Game</Link>} 
                    {token && <Link className='text-purple-500 hover:text-cyan-500' to='/account'>Account</Link>}
           
            </div>
            <div className='flex ml-5 items-center'>
                            <img src={new URL(`../assets/images/icon.png`, import.meta.url).href} width={40} />
                            <h1 className='text-2xl text-fuchsia-500'>CTRL-ALT-DIVAS</h1>
            </div>
            <div className='ml-5'>

                <h3 >Thanks for playing our game!</h3>
                <h5>Developed by Fancy, Liliana, Elizabeth and Xolani</h5>
                <p>Any suggestions send, an email to ctrlaltdivas@gmail.com</p>
                <p>{`Copyright © 2023-${year} CTRL_ALT_DIVAS.com`}</p>
            </div>

        </div>
        
        
        </>
    );
}

export default Footer;
