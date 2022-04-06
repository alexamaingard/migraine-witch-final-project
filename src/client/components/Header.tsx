import { Link, useNavigate } from 'react-router-dom';
import { LOCAL } from '../config/paths';
import '../styles/header.css';

export const Header = (props) => {
    const { isSignedIn, setIsSignedIn } = props;

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        setIsSignedIn(false);

        navigate(LOCAL.HOMEPAGE);
    }

    return (
        <header>
            <nav className='header'>
                <div className='logo-container'>
                    <Link to={LOCAL.HOMEPAGE}>
                        <img
                            src={process.env.PUBLIC_URL + `/images/logo.png`}
                            alt='logo'
                            id='logo'
                        />
                    </Link>
                </div>
                <div className='header-right'>
                    <ul>
                        {isSignedIn &&
                            <>
                                <li>
                                    <Link to={LOCAL.LOGS}>My Logs</Link>
                                </li>
                                <li>
                                    <Link to={LOCAL.SIGN_IN} onClick={handleSignOut}>Sign Out</Link>
                                </li>
                            </>
                        }
                        {!isSignedIn &&
                            <>
                                <li>
                                    <Link to={LOCAL.SIGN_IN}>Sign In</Link>
                                </li>
                                <li>
                                    <Link to={LOCAL.SIGN_UP}>Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};
