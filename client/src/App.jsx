import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Gameplay from './components/Gameplay';
import Account from './components/Account';

function App() {
    return (
        <div className='min-h-[100vh] m-0 p-0 flex flex-col justify-between'>
            <Navbar />
            <div className='mb-auto flex-1 bg-zinc-950'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/gameplay' element={<Gameplay />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
