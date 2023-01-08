import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
const Sidebar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser()
      .then((result) => {
        toast.success("Logout successful");
        localStorage.removeItem("sedide-token");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <nav className="flex flex-col items-center m-10 mt-0">
      <ul className="w-60 space-y-3">
        <li>
          <NavLink
            to="/home"
            className={`flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-md cursor-pointer ${(
              isActive
            ) => isActive && `activeStyle`}`}
          >
            <div className="flex items-center space-x-3">
              <span className="icon">
                <HomeIcon className="h-6 w-6" />
              </span>
              <h3>Home</h3>
            </div>
          </NavLink>
        </li>
        {user?.email && (
          <>
            <li>
              <NavLink
                to="/myposts"
                className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-md cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="icon">
                    <UserIcon className="h-6 w-6" />
                  </span>
                  <h3>My Posts</h3>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addpost"
                className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-md cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="icon">
                    <PlusIcon className="h-6 w-6" />
                  </span>
                  <h3>Add Post</h3>
                </div>
              </NavLink>
            </li>
          </>
        )}
        <li>
          {user?.email ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 w-full px-4 py-3 rounded-md cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="icon">
                  <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                </span>
                <h3>Logout</h3>
              </div>
            </button>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-md cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="icon">
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </span>
                <h3>Login</h3>
              </div>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
