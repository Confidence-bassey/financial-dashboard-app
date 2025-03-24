// components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white text-black border-r border-gray-300 flex flex-col">
      <div className="px-6 py-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold"><span className="material-icons">stacked_line_chart</span> FinDash</h1>
      </div>

      <nav className="flex-grow px-1 py-1">
        <ul className="space-y-2">
          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">home</span>
            <span>Overview</span>
          </li>

          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">trending_up</span>
            <span>Stocks</span>
          </li>

          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">attach_money</span>
            <span>Cryptocurrencies</span>
          </li>

          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">work_outline</span>
            <span>Portfolio</span>
          </li>

          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">credit_card</span>
            <span>Transactions</span>
          </li>

          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">analytics</span>
            <span>Analytics</span>
          </li>

          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">description</span>
            <span>Reports</span>
          </li>

          <li className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded hover:cursor-pointer">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
