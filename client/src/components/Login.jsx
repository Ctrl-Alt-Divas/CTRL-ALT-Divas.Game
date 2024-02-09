import {useEffect, useState} from 'react';
import {useLoginMutation} from '../../api/divasApi';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setCredentials} from '../app/slice';

function Login() {
    const [user, setUser] = useState({username: '', password: ''});

    const [login, {data, isSuccess}] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({...user})
        .unwrap()
        .then((res) => console.log(res))
        .catch((rejected) => console.error(rejected));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCredentials(data));
            navigate('/account');
        }
    }, [isSuccess]);

    return (
        <div>
            <form className='flex flex-col gap-5 items-center justify-center mt-20' onSubmit={handleSubmit}>
                <h2 className='text-fuchsia-500 text-4xl'>Login</h2>

                <div className='flex gap-5'>
                    <label className='text-fuchsia-500 text-xl'>Username:</label>
                    <input onChange={(e) => setUser({...user, username: e.target.value})} />
                </div>
                <div className='flex gap-5'>
                    <label className='text-fuchsia-500 text-xl'>Password:</label>
                    <input type='password' onChange={(e) => setUser({...user, password: e.target.value})} />
                </div>
                <button className='text-white text-xl bg-fuchsia-500 p-1 rounded-lg'>Login</button>
            </form>
        </div>
    );
}

export default Login;
