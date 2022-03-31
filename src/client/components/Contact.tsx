import '../styles/contact.css';

export const Contact = () => {
    return (
        <div className='contact'>
            <h2>Do you have questions or suggestions?</h2>
            <div className='contact-info'>
                <div className='contact-form-container'>
                    <form className='contact-form'>
                        <label htmlFor=''>
                            First name:
                            <input type='text' />
                        </label>
                        <label htmlFor=''>
                            Last name:
                            <input type='text' />
                        </label>
                        <label htmlFor=''>
                            Email:
                            <input type='text' />
                        </label>
                        <label htmlFor=''>
                            Your message:
                            <textarea
                                name=''
                                id=''
                                cols={30}
                                rows={5}
                            ></textarea>
                        </label>
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
