import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DATABASE, LOCAL } from '../config/paths'
import { LOCAL_STORAGE } from '../config/config'

import { SignInForm, UserFromDB } from '../config/interfaces'

import '../styles/sign-in.css'

export const SignIn = () => {
    const [signInForm, setSignInForm] = useState<SignInForm>();
    const [error, setError] = useState<string>(null);

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const { name, value } = event.target;

        setSignInForm({
            ...signInForm,
            [name]: value
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => { 
        event.preventDefault();

        const response = await fetch(DATABASE.USER.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signInForm)
        });
        const foundUser: UserFromDB = await response.json();

        if(foundUser.error){
            setError(foundUser.error);
            return;
        }

        localStorage.setItem(LOCAL_STORAGE.USER_ID, foundUser.data.id.toString());
        localStorage.setItem(LOCAL_STORAGE.TOKEN, foundUser.token);

        navigate(LOCAL.LOGS, { replace: true });
    }

    const handleSignUpButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
        navigate(LOCAL.SIGN_UP, { replace: true });
    }

    return (
        <section className='sign-in-page'>
            <h2>Sign In</h2>
            <div className='sign-in-container'>
                <div className='sign-in-form-container'>
                    <form className='sign-in-form' onSubmit={handleSubmit}>
                        <label htmlFor='username'>
                        Username:
                            <input
                                type='text'
                                name='username'
                                placeholder="Your Username"
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor='password'>Password:
                            <input
                                type='password'
                                name='password'
                                placeholder="Your Password"
                                onChange={handleChange}
                                required
                            />
                        </label>
                        {error && <p className='error'>{error}</p>}
                        <button type='submit' className='white-button'>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className='register-box'>
                    <p>No account yet? Let's go!</p>
                    <button type='submit' className='white-button' onClick={handleSignUpButtonClick}>
                        Register Now
                    </button>
                </div>
            </div>
        </section>
    );
};