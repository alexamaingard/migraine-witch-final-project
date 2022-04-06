import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DATABASE, LOCAL } from '../config/paths'
import { LOCAL_STORAGE } from '../config/config'

import { SignUpForm, UserFromDB } from '../config/interfaces'

import '../styles/sign-in.css'

export const SignUp = (props) => {
    const { setIsSignedIn } = props;

    const [signUpForm, setSignUpForm] = useState<SignUpForm>();
    const [error, setError] = useState<string>(null);

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const { name, value } = event.target;

        setSignUpForm({
            ...signUpForm,
            [name]: value
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => { 
        event.preventDefault();

        const response = await fetch(DATABASE.USER.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpForm)
        });
        const createdUser: UserFromDB = await response.json();

        if(createdUser.error){
            setError(createdUser.error);
            return;
        }

        localStorage.setItem(LOCAL_STORAGE.USER_ID, createdUser.data.id.toString());
        localStorage.setItem(LOCAL_STORAGE.TOKEN, createdUser.token);

        setIsSignedIn(true);

        navigate(LOCAL.LOGS, { replace: true });
    }

    const handleSignInButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
        navigate(LOCAL.SIGN_IN, { replace: true });
    }

    return (
        <section className='sign-in-page'>
            <h2>Sign Up</h2>
            <div className='sign-in-container'>
                <div className='sign-in-form-container'>
                    <form className='sign-in-form' onSubmit={handleSubmit}>
                        <div className='input-box'>
                            <input
                                type='text'
                                name='username'
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor='username'>Username:</label>
                        </div>
                        <div className='input-box'>
                            <input
                                type='email'
                                name='email'
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor='password'>Email:</label>
                        </div>
                        <div className='input-box'>
                            <input
                                type='password'
                                name='password'
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor='password'>Password:</label>
                        </div>
                        {error && <p className='error'>{error}</p>}
                        <div className='button-container'>
                            <button type='submit' className='blue-button'>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                <div className='register-box-container'>
                    <div className='register-box extra-gap'>
                        <p>Already have an account?</p>
                        <button type='submit' className='blue-button' onClick={handleSignInButtonClick}>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};