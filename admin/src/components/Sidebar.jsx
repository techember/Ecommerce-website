import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white">
      <div className="flex flex-col gap-4 pt-6 px-4">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg border transition-all 
            ${
              isActive
                ? "bg-blue-100 border-stone-500 shadow-sm"
                : "bg-gray-100 border-gray-400 hover:bg-gray-200"
            }`
          }
        >
          <img className="w-6 h-6" src={assets.add_icon} alt="" />
          <p className="text-lg font-semibold">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg border transition-all 
            ${
              isActive
                ? "bg-blue-100 border-stone-500 shadow-sm"
                : "bg-gray-100 border-gray-400 hover:bg-gray-200"
            }`
          }
        >
          <img className="w-6 h-6" src={assets.parcel_icon} alt="" />
          <p className="text-lg font-semibold">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg border transition-all 
            ${
              isActive
                ? "bg-blue-100 border-stone-500 shadow-sm"
                : "bg-gray-100 border-gray-400 hover:bg-gray-200"
            }`
          }
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="" />
          <p className="text-lg font-semibold">View Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
