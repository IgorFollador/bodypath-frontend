import './Header.scss';
import logo from '../images/logo.png';
import logout from '../images/logout.png';

function ButtonEnter() {
  return (
    <a href="/professional/feed">
      <button className="button-enter">Entrar</button>
    </a>
  );
}

function HelloUser(props) {
  return <div className="hello-user">
    <span>Olá, {props.userName}</span>
    <a href="/">
      <img src={logout} className="img-logout" alt="Logout"/>
    </a>
  </div>
}

function EnterOrHello(props) {
  return window.location.pathname === '/' ? <ButtonEnter /> : <HelloUser userName={props.user.firstName} />;
}

const Header = () => {
  var user = {firstName: 'Jaisson', lastName:'Bassanesi'}; //Estático até termos os dados do usuário
  return (
    <header>
      <div className="app-header">
        <div className="center">
          <img src={logo} className="app-logo" alt="Logo"/>
          <EnterOrHello user={user}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
