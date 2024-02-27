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
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, {data, error, isSuccess, isError}] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {username, password} = player;
        const errors = [];
        if (username === '') {
            errors.push('Username is required');
        }

        if (password === '') {
            errors.push('Password is required');
        } else if (password.length <= 7) {
            errors.push('Password must be at least 8 characters');
        }

        if (errors.length > 0) {
            setErrors(errors);
            return;
        } else {
            setErrors([]);
        }

        await register({
            username,
            password,
        });
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCredentials(data));
            navigate('/account');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            const newErrors = [...errors];
            newErrors.push(error.data.error);
            setErrors(newErrors);
        }
    }, [isError]);

    function displayErrors() {
        const rows = [];
        for (const error of errors) {
            rows.push(
                <p key={error} className='text-red-600'>
                    {error}
                </p>
            );
        }
        return rows;
    }

    return (
        <>
            <form className='flex flex-col gap-5 items-center justify-center mt-20' onSubmit={handleSubmit}>
                <h2 className='text-indigo-400 text-4xl'>Register</h2>

                <div className='flex gap-5'>
                    <label className='text-indigo-300 text-xl'>Username:</label>
                    <input
                        maxLength={20}
                        autoFocus
                        value={player.username}
                        onChange={(e) => setPlayer({...player, username: e.target.value})}
                    />
                </div>

                <div className='flex gap-5'>
                    <label className='text-indigo-300 text-xl'>Password:</label>
                    <input
                        type='password'
                        value={player.password}
                        onChange={(e) => setPlayer({...player, password: e.target.value})}
                    />
                </div>
                <div className='flex flex-col gap-2'>{displayErrors()}</div>

                <button className='bg-indigo-900 w-26 p-2 rounded-md text-lg mb-10 text-indigo-300 font-semibold'>
                    Register
                </button>
            </form>
        </>
    );
}

export default Register;
