import {useParams} from 'react-router';
import {useGetCharacterByIdQuery} from '../../api/divasApi';

function Character() {
    const {id} = useParams();
    const {data = {}} = useGetCharacterByIdQuery(id);
    return (
        <>
            {data && (
                <div className='flex flex-col items-center gap-10 p-10'>
                    <p className='text-white text-3xl'>{data.name}</p>
                    <div className='flex gap-20'>
                        <img
                            src='https://freepngtransparent.com/wp-content/uploads/2023/03/mario-png-62.png'
                            width={200}
                        />
                        <div className='flex flex-col gap-10 justify-center'>
                            <p className='text-white text-2xl'>Character Stats</p>
                            <p className='text-white text-xl'>Speed: {data.speed}</p>
                            <p className='text-white text-xl'>Jump: {data.jump}</p>
                        </div>
                    </div>
                    <p className='text-white text-lg w-[600px]'>{data.description}</p>
                </div>
            )}
        </>
    );
}

export default Character;