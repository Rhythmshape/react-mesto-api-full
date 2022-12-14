import logo from '../images/header_logo.svg';
import { Link } from 'react-router-dom';

function Header({ title, email, onClick, route }) {
    return (
        <header className="header">
            <img src={logo} alt="логотип Mesto" className="header__logo" />
            <nav className="header__auth-nav">
                <p className="header__auth-nav-text">{email}</p>
                <Link to={route} className="header__auth-nav-link" type="button" onClick={onClick}>{title}</Link>
            </nav>
        </header>
    );
}

export default Header;
