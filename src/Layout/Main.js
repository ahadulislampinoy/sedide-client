import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Pages/Navbar/Navbar";

const Main = () => {
  return (
    <section>
      <Navbar />
      <div
        className="container md:grid justify-center mx-auto p-4 pt-10 md:py-10"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
        <Sidebar />
        <div className="bg-gray-700 min-h-screen rounded">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Main;
