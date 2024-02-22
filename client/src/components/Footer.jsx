import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Footer() {
    const token = useSelector((it) => it.state?.token);
    const year = new Date().getFullYear();
    return (
        <>
            <div className='flex bg-indigo-950 text-purple-300 pt-10 pb-10 pl-32 pr-32 gap-24'>
                <div className='flex flex-col'>
                    <div className='flex items-center'>
                        <img src={new URL(`../assets/images/icon.png`, import.meta.url).href} width={40} />
                        <h1 className='text-2xl text-fuchsia-500'>CTRL-ALT-DIVAS</h1>
                    </div>
                    <h3>Thanks for playing our game!</h3>
                    <h5>Developed by Fancy, Liliana, Elizabeth and Xolani</h5>
                    <p>Any suggestions send, an email to ctrlaltdivas@gmail.com</p>
                    <p>{`Copyright © 2023-${year} CTRL_ALT_DIVAS.com`}</p>
                </div>
                <div className='text-xl hover:text-cyan-500'>
                    <Link to='/home'>Home</Link>
                </div>
                <div className='text-xl hover:text-cyan-500'>
                    <Link to='/leaderboard'>Leaderboard</Link>
                </div>
                <div className='text-xl hover:text-cyan-500'>{token && <Link to='/character-select'>Game</Link>}</div>
                <div className='text-xl hover:text-cyan-500'>{token && <Link to='/account'>Account</Link>}</div>
            </div>
        </>
    );
}

export default Footer;
