import {useGetCharactersMutation} from '../../../api/divasApi';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateCharacters} from '../../app/slice';

const CharacterSelect = () => {
    const [getCharacters] = useGetCharactersMutation();
    let [characters, setCharacters] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const characters = await getCharacters();
            setCharacters(characters.data);
            dispatch(updateCharacters(characters.data));
        };

        fetchData().catch(console.error);
    }, []);

    function createCharacters() {
        const rows = [];
        for (const char of characters) {
            rows.push(
                <Link
                    key={char.id}
                    to={`/gameplay/${char.id}`}
                    className='flex flex-col hover:bg-indigo-950 rounded-md p-1'
                >
                    <img src={new URL(`../../assets/images/${char.image}`, import.meta.url).href} className='h-auto w-32 lg:w-64'/>
                    <p className='text-purple-300 text-md'>{char.name}</p>
                    <p className='text-purple-300 text-md'>Run Speed: {char.speed * -1}</p>
                    <p className='text-purple-300 text-md'>Jump Height: {char.jump}</p>
                </Link>
            );
        }
        return rows;
    }

    return (
    <div>
        <div className='text-center lg:hidden'>
        <p className='text-fuchsia-500'>please turn screen to landscape for a better experience</p>
            <h1 className='text-purple-400 text-xl'>Select your Character</h1>
            <h2 className='text-md text-purple-300'>Game will begin once you chose your character.</h2>  
            <p className='text-md text-purple-300'>Controls: Left click to jump, Spacebar to shoot</p>
            <div className='flex flex-wrap gap-5 justify-center items-center mb-auto'>
                {characters && characters.length > 0 && createCharacters()}
            </div>
        </div>
        <div className='hidden lg:flex flex-column text-center'>
            <h1 className='text-purple-400 text-4xl mt-5 pb-5'>Select your Character</h1>
            <h2 className='text-2xl text-purple-300 p-2'>Game will begin once you chose your character.</h2>  
            <p className='text-xl text-purple-300'>Controls: Left click to jump, Spacebar to shoot</p>
            <div className='flex gap-5 justify-center items-center mb-auto h-[70vh] text-2xl'>
                {characters && characters.length > 0 && createCharacters()}
            </div>
        </div>
    </div>
    );
};

export default CharacterSelect;
