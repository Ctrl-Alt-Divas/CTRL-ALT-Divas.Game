import {useSelector, useDispatch} from 'react-redux';
import {RiImageEditLine} from 'react-icons/ri';
import {useState, Fragment} from 'react';
import {Dialog, Transition, RadioGroup} from '@headlessui/react';
import {useUpdateImageMutation} from '../../api/divasApi';
import { updatePlayer } from "../app/slice";

const images = ['hotdog.png', 'evee.png', 'default.png', 'jesse.png', 'lifeline.png'];

function Account() {
    const player = useSelector((it) => it.state.player);
    const token = useSelector((it) => it.state.token);
    const leaderboard = useSelector((it) => it.state.leaderboard);
    let [isOpen, setIsOpen] = useState(false);
    const [updateImage] = useUpdateImageMutation();
    const dispatch = useDispatch();

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    async function handleImage(image) {
        const updatedUser = await updateImage({
            id: player.id,
            image: image,
            token: token,
        });
        dispatch(updatePlayer(updatedUser.data));
        closeModal();
    }

    return (
        <>
            <div className='p-10 flex items-center gap-20'>
                {/* Maybe add logic to change our profile picture? */}
                <div>
                    <img
                        className='rounded-full h-[250px] border-2'
                        src={
                            new URL(
                              `../assets/images/profile/${player.image}`,
                              import.meta.url
                            ).href
                          }
                        width={250}
                    />
                    <RiImageEditLine
                        className='text-fuchsia-600 text-2xl bg-gray-800 hover:text-cyan-600'
                        onClick={() => openModal()}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <h1 className='text-4xl text-slate-300'>{player.username}</h1>
                    {/* <p className='text-slate-400'>Rank: {leaderboard.findIndex(it => it.username === player.username) + 1 }</p> */}
                    <p className='text-slate-400'>Score: {player.score} </p>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-8xl transform overflow-hidden rounded-2xl bg-black text-center align-middle shadow-xl transition-all'>
                                    <Dialog.Title as='h3' className='text-xl font-medium leading-6 text-purple-200'>
                                        Choose your image
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <RadioGroup className='flex flex-wrap gap-5 pl-5 pt-5'>
                                            {images.map((image) => (
                                                <RadioGroup.Option
                                                    onClick={() => handleImage(image)}
                                                    key={image}
                                                    value={image}
                                                >
                                                    {({active, checked}) => (
                                                        <>
                                                            <img
                                                                width={200}
                                                                height={200}
                                                                className={`${
                                                                    active
                                                                        ? 'ring-2 ring-white/60 ring-offset-4 ring-offset-sky-300'
                                                                        : ''
                                                                }
                                      ${checked ? 'border-purple-900/75 text-white' : 'border-pink-900'}
                                      relative flex cursor-pointer rounded-full shadow-md focus:outline-none ring-2 ring-indigo-950 ring-offset-2 ring-offset-indigo-600`}
                                                                src={
                                                                    new URL(
                                                                        `../assets/images/profile/${image}`,
                                                                        import.meta.url
                                                                    ).href
                                                                }
                                                            ></img>
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Account;
