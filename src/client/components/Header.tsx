import { Link } from 'react-router-dom';
import { LOCAL } from '../config/paths';
import '../styles/header.css';

export const Header = () => {
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
                        <li>
                            <Link to={LOCAL.LOGS}>My Logs</Link>
                        </li>
                        <li>
                            <Link to={LOCAL.SIGN_IN}>Sign In/Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};
