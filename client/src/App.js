import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './helpers/setAuthToken';
import { loadUser } from './actions/auth';


// run setAuthToken
if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {

    // replacement for componentDidMount, componentDidUpdate, componentWillUnmount
    // blank array for second param to prevent looping - runs only once
    useEffect(() => {
        store.dispatch(loadUser())
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='App'>
                    <Navbar />
                    <div class="container">

                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    </div>

                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;