// components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white text-black border-r border-gray-300 flex flex-col">
      {/* App Title */}
      <div className="px-6 py-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold">FinDash</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-4 py-6">
        <ul className="space-y-4">
          {/* Overview */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">home</span>
            <span>Overview</span>
          </li>

          {/* Stocks */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">trending_up</span>
            <span>Stocks</span>
          </li>

          {/* Cryptocurrencies */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">attach_money</span>
            <span>Cryptocurrencies</span>
          </li>

          {/* Portfolio */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">work_outline</span>
            <span>Portfolio</span>
          </li>

          {/* Transactions */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">credit_card</span>
            <span>Transactions</span>
          </li>

          {/* Analytics */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">analytics</span>
            <span>Analytics</span>
          </li>

          {/* Reports */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">description</span>
            <span>Reports</span>
          </li>

          {/* Settings */}
          <li className="flex items-center space-x-3 hover:text-gray-300">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
