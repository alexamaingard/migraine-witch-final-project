import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '../config/emailJS'

import '../styles/contact.css';

export const Contact = () => {
    const form = useRef();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => {
        event.preventDefault();

        try {
            const result = await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_USER_ID);
            console.log(result.text);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className='contact'>
            <h2>Do you have questions or suggestions?</h2>
            <div className='contact-info'>
                <div className='contact-form-container'>
                    <form ref={form} className='contact-form' onSubmit={handleSubmit}>
                        <label htmlFor=''>
                            Name:
                            <input 
                                type='text' 
                                name='from_name'
                                required
                            />
                        </label>
                        <label htmlFor=''>
                            Email:
                            <input 
                                type='email' 
                                name='reply_to'
                                required
                            />
                        </label>
                        <label htmlFor=''>
                            Your message:
                            <textarea
                                name='message'
                                cols={30}
                                rows={5}
                                required
                            ></textarea>
                        </label>
                        <div className='button-container'>
                            <button type='submit' className='white-button'>Send!</button>
                        </div>
                    </form>
                </div>
                <div className='contact-right'>
                    <h3>Get in touch!</h3>
                    <h4>We will contact you as soon as we can!</h4>
                    <p>
                        Please remember, no app is a substitute for a treatment
                        plan made with your doctor and tailored to you. Speak
                        with your doctor if you aren't satisfied with your
                        current migraine treatment.
                    </p>
                </div>
            </div>
        </div>
    );
};
