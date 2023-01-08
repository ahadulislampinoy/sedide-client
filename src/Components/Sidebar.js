import { HomeIcon, PlusIcon, UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
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
      </ul>
    </nav>
  );
};

export default Sidebar;
