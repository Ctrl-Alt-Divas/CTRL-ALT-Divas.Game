import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {useGetCharacterByIdQuery} from '../../api/divasApi';

function Character() {
    const {id} = useParams();
    const {data = {}} = useGetCharacterByIdQuery(id);

    return (
        <>
            {data && (
                <div className='flex flex-col items-center gap-10 p-10'>
                    <p className='text-purple-400 text-3xl'>{data.name}</p>
                    <div className='flex gap-20'>
                        <img src={new URL(`../assets/images/${data.image}`, import.meta.url).href} width={200} />
                        <div className='flex flex-col gap-10 justify-center'>
                            <p className='text-purple-300 text-2xl'>Character Stats</p>
                            <p className='text-purple-300 text-xl'>Speed: {data.speed * -1}</p>
                            <p className='text-purple-300 text-xl'>Jump: {data.jump}</p>
                        </div>
                    </div>
                    <p className='text-purple-400 text-lg w-[600px]'>{data.description}</p>
                    <Link to='/' className='text-xl text-fuchsia-600 hover:text-cyan-500'>
                        Back
                    </Link>
                </div>
            )}
        </>
    );
}

export default Character;
