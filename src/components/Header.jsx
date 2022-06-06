import './Header.scss';
import React, { useState } from 'react';
import logo from '../images/logo.png';
import logout from '../images/logout.png';
import ModalLogin from '../components/ModalLogin';

const ButtonEnter = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <button className="button-enter" onClick={ () => setIsModalVisible(true) }>Entrar</button>
      {isModalVisible && <ModalLogin onClose={ () => setIsModalVisible(false) }/>}
    </>
  );
}

const  HelloUser = props => {
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
