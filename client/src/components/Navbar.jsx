import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {updatePlayer} from '../app/slice';

function Navbar() {
    // token should be on the player object which is set on login
    const token = useSelector((it) => it.state.player?.token);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // update player in state to be empty
    function logout() {
        dispatch(updatePlayer(''));
        navigate('/');
    }

    return (
        <div className='bg-purple-500 h-14 flex justify-between items-center pl-10 pr-10'>
            <div className='flex gap-2 items-center'>
                <img src='https://freepngtransparent.com/wp-content/uploads/2023/03/mario-png-62.png' width={30}></img>
                <p className='text-xl text-fuchsia-500'>CTRL-ALT-DIVAS</p>
            </div>
            <div className='flex gap-10'>
                <Link to='/'>Home</Link>
                <Link to='/gameplay'>Game</Link>
                {!token && <Link to='/register'>Register</Link>}
                {!token && <Link to='/login'>Login</Link>}
                {token && <Link to='/account'>Account</Link>}
                {token && (
                    <>
                        <a onClick={() => logout()} to='/'>
                            Logout
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
