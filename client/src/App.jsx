import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Gameplay from './components/gameplay/Gameplay';
import Account from './components/Account';
import Leaderboard from './components/Leaderboard';
import Character from './components/Character';
import CharacterSelect from './components/gameplay/ChararacterSelect';

function App() {
    return (
        <div className='min-h-[100vh] m-0 p-0 flex flex-col justify-between'>
            <Navbar />
            <div id='container' className='mb-auto flex-1 bg-zinc-950'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/character-select' element={<CharacterSelect />} />
                    <Route path='/gameplay/:id' element={<Gameplay />} />
                    <Route path='/leaderboard' element={<Leaderboard />} />
                    <Route path='/characters/:id' element={<Character />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
