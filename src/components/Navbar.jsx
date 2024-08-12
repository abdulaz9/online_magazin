import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuLink } from '../constants/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-10 top-0">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <Link to="/">MyBrand</Link>
        </div>
        <div className="hidden md:flex text-center space-x-8">
          <ul className="flex space-x-4">
            {menuLink.map((element) => (
              <li key={element.id}>
                <Link to={element.slug} className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                  {element.linkName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2">
          {menuLink.map((element) => (
            <Link
              key={element.id}
              to={element.slug}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              {element.linkName}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
