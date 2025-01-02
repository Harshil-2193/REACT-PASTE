import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 shadow-lg rounded-xl m-5">
      <div className="flex justify-center gap-16 items-center">
        {/* Home Link */}
        <NavLink
          to="/"
          className="text-white text-lg font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-indigo-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none border border-transparent hover:border-indigo-400"
          activeClassName="text-indigo-400"
        >
          Home
        </NavLink>

        {/* Pastes Link */}
        <NavLink
          to="/pastes"
          className="text-white text-lg font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-indigo-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none border border-transparent hover:border-indigo-400"
          activeClassName="text-indigo-400"
        >
          Pastes
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
