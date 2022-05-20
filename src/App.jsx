import './App.scss';
import whatsapp from './images/whatsapp.png'
import Header from './components/Header';
import Main from './pages/Main/Main';
import Professional from "./pages/Professional/Professional";
import SectionPhysicEval from './pages/Professional/SectionPhysicEval';
import SectionStudents from './pages/Professional/SectionStudents';
import SectionFeed from './pages/Professional/SectionFeed';
import SectionFoodPlan from './pages/Professional/SectionFoodPlan';
import SectionCadastre from './pages/Professional/SectionCadastre';
import CrudStudents from './pages/Professional/CrudUser';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
			<Header />
      <Routes>
			  <Route path='/' element={ <Main /> }/>
			  <Route path='/professional' element={ <Professional /> }>
            <Route path='feed' element= { <SectionFeed /> }/>
            <Route path='evaluation' element= { <SectionPhysicEval /> }/>
            <Route path='students' element= { <SectionStudents /> }/>
              <Route path='students/create' element= { <CrudStudents /> }/>
              <Route path='students/update/:id' element= { <CrudStudents /> }/>
            <Route path='plan' element= { <SectionFoodPlan /> }/>
            <Route path='cadastre' element= { <SectionCadastre /> }/>
        </Route>
      </Routes>
      <a className='icon-whatsapp' href='https://web.whatsapp.com/send?phone=5554992026787' target='_blank' rel='noreferrer'>
        <img className='img-whatsapp' src={whatsapp} alt='Icone do Whatsapp' />
      </a>
    </Router>
  );
}

export default App;