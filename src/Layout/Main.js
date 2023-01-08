import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Pages/Navbar/Navbar";

const Main = () => {
  return (
    <section>
      <Navbar />
      <div
        className="container md:grid justify-center min-h-screen mx-auto py-10"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
        <Sidebar />
        <div className="bg-gray-700 sm:m-10 md:ml-0 md:mt-0 rounded">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Main;
