import AuthMenu from '../../auth/authMenu/AuthMenu';
import './Header.css';

function Header(): JSX.Element {
    return (
        <div className='Header'>
            <h1>Over The Rainbow Tours</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;