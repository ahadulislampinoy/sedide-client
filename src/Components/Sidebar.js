import { HomeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <nav class="flex flex-col items-center m-10">
      <ul class="w-60 space-y-1">
        <li>
          <Link
            to="/login"
            className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-md cursor-pointer"
          >
            <div class="flex items-center space-x-3">
              <span class="icon">
                <HomeIcon className="h-6 w-6" />
              </span>
              <h3>Home</h3>
            </div>
            <span class="badge-count text-center text-xs rounded-full px-3 py-1 bg-gray-600 font-semibold">
              4
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
