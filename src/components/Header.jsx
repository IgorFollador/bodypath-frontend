import './Header.scss';
import React, { useState } from 'react';
import logo from '../images/logo.png';
import logout from '../images/logout.png';
import ModalLogin from '../components/ModalLogin';
import { api } from "../services/api";

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
    <a href="/" onClick={Logout}>
      <img src={logout} className="img-logout" alt="Logout"/>
    </a>
  </div>
}

function Logout() {
  console.log("Goodbye")
  localStorage.removeItem("@Auth:token");
  localStorage.removeItem("@Auth:username");
  localStorage.removeItem("@Auth:userId");
}

function EnterOrHello(props) {
  return window.location.pathname === '/' ? <ButtonEnter /> : <HelloUser userName={props.user.username} />;
}

const Header = () => {
  var user = {username: localStorage.getItem("@Auth:username")}; //Estático até LOGIN
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
