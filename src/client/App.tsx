import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { LOCAL } from './config/paths';
import { HomePage } from './components/HomePage';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { MyProfile } from './components/MyProfile';
import { MyLogs } from './components/MyLogs';
import { RecordAttack } from './components/recordAttack/RecordAttack';
import { Header } from './components/Header';

import './styles/app.css'
import './styles/reset.css'
import { Footer } from './components/Footer';
import { LOCAL_STORAGE } from './config/config';

export const App = () => {
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

    useEffect(() => {
        localStorage.getItem(LOCAL_STORAGE.TOKEN) && localStorage.getItem(LOCAL_STORAGE.USER_ID) && setIsSignedIn(true);
        !(localStorage.getItem(LOCAL_STORAGE.TOKEN) && localStorage.getItem(LOCAL_STORAGE.USER_ID)) && setIsSignedIn(false);
    }, []);

    return (
        <div className='App'>
            <Header 
                isSignedIn={isSignedIn} 
                setIsSignedIn={setIsSignedIn}
            />
            <Routes>
                <Route path={LOCAL.HOMEPAGE} element={<HomePage />} />
                <Route
                    path={LOCAL.SIGN_UP} element={<SignUp setIsSignedIn={setIsSignedIn} />}
                />
                <Route
                    path={LOCAL.SIGN_IN} element={<SignIn setIsSignedIn={setIsSignedIn} />}
                />
                <Route
                    path={LOCAL.PROFILE} element={<MyProfile />}
                />
                <Route 
                    path={LOCAL.LOGS} element={<MyLogs />} 
                />
                <Route
                    path={LOCAL.RECORD_ATTACK} element={<RecordAttack />}
                />
            </Routes>
            <Footer />
        </div>
    );
}