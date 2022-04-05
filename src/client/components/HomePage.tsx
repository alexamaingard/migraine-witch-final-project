import { useNavigate } from 'react-router-dom';
import { LOCAL } from '../config/paths';
import '../styles/homepage.css';
import { Contact } from './Contact';

export const HomePage = () => {

    const navigate = useNavigate();

    const handleSignUpButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
        navigate(LOCAL.SIGN_UP, { replace: true });
    }

    return (
        <section className='homepage'>
            <div className='landing-page'>
                <div className='landing-container'>
                    <div className='landing-left'>
                        <h1>Learn from your pain.</h1>
                        <h4>
                            Track your migraine episodes and identify what's
                            going on with your body.
                        </h4>
                        <div className='button-container'>
                            <button className='white-button' onClick={handleSignUpButtonClick}>
                                Register Now
                            </button>
                        </div>
                    </div>
                    <div className='landing-image-container'>
                        <img
                            src={
                                process.env.PUBLIC_URL + `/images/migraine.jpg`
                            }
                            alt='woman-with-migraine'
                        />
                    </div>
                </div>
            </div>
            <div className='homepage-info'>
                <div className='landing-image-container'>
                    <img
                        src={process.env.PUBLIC_URL + `/images/laughing.jpg`}
                        alt='happy-woman'
                    />
                </div>
                <div className='homepage-info-right'>
                    <h2>Listen to your body</h2>
                    <h4>
                        Don't let chronic pain stop you from living your life
                        and doing the things you love.
                    </h4>
                    <h4>
                        Becoming aware of your symptoms and triggers can help
                        you manage migraine pain before it's too late to be
                        stopped.
                    </h4>
                    <div className='button-container'>
                        <button className='white-button' onClick={handleSignUpButtonClick}>Join Us</button>
                    </div>
                </div>
            </div>
            <div className='homepage-features'>
                <h2>Track with us</h2>
                <div className='features-container'>
                    <div className='feature'>
                        {/* here image */}
                        <h4>Symptoms</h4>
                        <p>
                            Migraines can involve many symptoms that vary
                            greatly from patient to patient.
                        </p>
                    </div>
                    <div className='feature'>
                        {/* here image */}
                        <h4>Triggers</h4>
                        <p>
                            Recognize those things that set your migraines off
                            to try to avoid them.
                        </p>
                    </div>
                    <div className='feature'>
                        {/* here image */}
                        <h4>Treatments</h4>
                        <p>
                            Keep log on stopping symptoms and preventing future
                            attacks.
                        </p>
                    </div>
                </div>
                <p>and more.</p>
            </div>
            <Contact />
        </section>
    );
};
