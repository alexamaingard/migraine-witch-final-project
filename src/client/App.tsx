import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { LOCAL } from './config/paths';
import { HomePage } from './components/HomePage';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { MyProfile } from './components/MyProfile';
import { MyLogs } from './components/MyLogs';
import { RecordAttack } from './components/RecordAttack';
import { Header } from './components/Header';

import './styles/app.css'
import './styles/reset.css'
import { Footer } from './components/Footer';

export const App = () => {
    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route path={LOCAL.HOMEPAGE} element={<HomePage />} />
                <Route
                    path={LOCAL.SIGN_UP} element={<SignUp />}
                />
                <Route
                    path={LOCAL.SIGN_IN} element={<SignIn />}
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