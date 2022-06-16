import './App.scss';
import whatsapp from './images/whatsapp.png'
import { AuthProvider } from './context/authContext';
import { AppRouter } from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <a className='icon-whatsapp' href='https://web.whatsapp.com/send?phone=5554992026787' target='_blank' rel='noreferrer'>
        <img className='img-whatsapp' src={whatsapp} alt='Icone do Whatsapp' />
      </a>
    </AuthProvider>
  );
}

export default App;