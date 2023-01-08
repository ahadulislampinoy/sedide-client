import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Pages/Navbar/Navbar";

const Main = () => {
  return (
    <section>
      <Navbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </section>
  );
};

export default Main;
