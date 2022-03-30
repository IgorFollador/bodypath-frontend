import logo from '../images/logo.png';
import './Header.css';

function Header() {
  return (
    <div className="app">
      <header>
        <div className="app-header">
          <div className="center">
            <img src={logo} className="app-logo" alt="logo"/>
            <button className="button-enter">Entrar</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
