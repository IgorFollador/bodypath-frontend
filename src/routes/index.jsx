import Header from '../components/Header';
import Main from '../pages/Main/Main';
import Professional from '../pages/Professional/Professional';
import SectionPhysicEval from '../pages/Professional/SectionPhysicEval';
import SectionStudents from '../pages/Professional/SectionStudents';
import SectionFeed from '../pages/Professional/SectionFeed';
import SectionFoodPlan from '../pages/Professional/SectionFoodPlan';
import CrudMyCadastre from '../pages/Professional/CrudMyCadastre';
import CrudStudents from '../pages/Professional/CrudUser';
import CrudPhysicEval from '../pages/Professional/CrudPhysicEval';
import CrudPlans from '../pages/Professional/CrudFoodPlan';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Routes>
            <Route path='/' element={ <Main /> }/>
            <Route path='/professional' element={ <Professional /> }>
                <Route path='feed' element= { <SectionFeed /> }/>
                <Route path='evaluations' element= { <SectionPhysicEval /> }/>
                    <Route path='evaluations/create' element= { <CrudPhysicEval /> }/>
                    <Route path='evaluations/update/:id' element= { <CrudPhysicEval /> }/>
                <Route path='students' element= { <SectionStudents /> }/>
                    <Route path='students/create' element= { <CrudStudents /> }/>
                    <Route path='students/update/:id' element= { <CrudStudents /> }/>
                <Route path='plans' element= { <SectionFoodPlan /> }/>
                    <Route path='plans/create' element= { <CrudPlans /> }/>
                    <Route path='plans/update/:id' element= { <CrudPlans /> }/>
                <Route path='cadastre' element= { <CrudMyCadastre /> }/>
            </Route>
            </Routes>
        </Router>
    );
};