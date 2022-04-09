import './App.scss';
import whatsapp from './images/whatsapp.png'
import Header from './components/Header';
import Main from './pages/Main';
import Professional from "./pages/Professional";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
			<Header />
      <Routes>
			  <Route path='/' element={ <Main /> }/>
			  <Route path='/professional' element={ <Professional /> }/>
      </Routes>
      <a className='icon-whatsapp' href='https://web.whatsapp.com/send?phone=5554992026787' target='_blank' rel='noreferrer'>
        <img className='img-whatsapp' src={whatsapp} alt='Icone do Whatsapp' />
      </a>
    </Router>
  );
}

export default App;