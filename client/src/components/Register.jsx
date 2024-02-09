import {useState, useEffect} from 'react';
import {useRegisterMutation} from '../../api/divasApi';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setCredentials} from '../app/slice';

function Register() {
    const [player, setPlayer] = useState({
        username: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, {data, isSuccess}] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {username, password} = player;
        await register({
            username,
            password,
        }).unwrap();
        setPlayer({username: '', password: ''});
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCredentials(data));
            navigate('/account');
        }
    }, [isSuccess]);

    return (
        <>
            <form className='flex flex-col gap-5 items-center justify-center mt-20' onSubmit={handleSubmit}>
                <h2 className='text-fuchsia-500 text-4xl'>Register</h2>

                <div className='flex gap-5'>
                    <label className='text-fuchsia-500 text-xl'>Username:</label>
                    <input
                        value={player.username}
                        onChange={(e) => setPlayer({...player, username: e.target.value})}
                        required
                    />
                </div>

                <div className='flex gap-5'>
                    <label className='text-fuchsia-500 text-xl'>Password:</label>
                    <input
                        value={player.password}
                        onChange={(e) => setPlayer({...player, password: e.target.value})}
                        required
                    />
                </div>

                <button className='text-white text-xl bg-fuchsia-500 p-1 rounded-lg'>Register</button>
            </form>
        </>
    );
}

export default Register;
