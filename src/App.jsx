import './App.css';
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
    </Router>
  );
}

export default App;