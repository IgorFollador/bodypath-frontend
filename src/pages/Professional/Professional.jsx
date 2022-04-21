import './Professional.scss';
import { Outlet } from "react-router-dom";
import SideBar from '../../components/SideBar';

const Professional = () => {
  return (
    <>
      <SideBar />
      <section className='sections'>
        <Outlet />
      </section>
    </>
  );
}

export default Professional;
