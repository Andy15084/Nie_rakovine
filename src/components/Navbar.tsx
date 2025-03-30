'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownItems = {
    'Pomoc pacientom': [
      'Online poradňa',
      'Pacientske poradne',
      'Bezplatná telefonická linka',
      'Pacientske príručky',
      'Mapa pomoci',
      'Klinické skúšania'
    ],
    'Diagnózy': [
      'Online poradňa',
      'Pacientske poradne',
      'Bezplatná telefonická linka',
      'Pacientske príručky',
      'Mapa pomoci',
      'Klinické skúšania'
    ]
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              Nie rakovine
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/aktuality" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Aktuality
            </Link>
            <Link href="/kto-sme" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Kto sme
            </Link>
            
            {/* Dropdown for Pomoc pacientom */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                onMouseEnter={() => setActiveDropdown('Pomoc pacientom')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Pomoc pacientom
              </button>
              <div
                className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 ${
                  activeDropdown === 'Pomoc pacientom' ? 'block' : 'hidden'
                }`}
              >
                {dropdownItems['Pomoc pacientom'].map((item) => (
                  <Link
                    key={item}
                    href={`/pomoc-pacientom/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown for Diagnózy */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                onMouseEnter={() => setActiveDropdown('Diagnózy')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Diagnózy
              </button>
              <div
                className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 ${
                  activeDropdown === 'Diagnózy' ? 'block' : 'hidden'
                }`}
              >
                {dropdownItems['Diagnózy'].map((item) => (
                  <Link
                    key={item}
                    href={`/diagnozy/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/podporte-nas" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Podporte nás
            </Link>
            <Link href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Domov
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          <Link
            href="/aktuality"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            Aktuality
          </Link>
          <Link
            href="/kto-sme"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            Kto sme
          </Link>
          
          {/* Mobile Dropdown for Pomoc pacientom */}
          <div>
            <button
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => setActiveDropdown(
                activeDropdown === 'Pomoc pacientom' ? null : 'Pomoc pacientom'
              )}
            >
              Pomoc pacientom
            </button>
            <div className={`pl-4 ${activeDropdown === 'Pomoc pacientom' ? 'block' : 'hidden'}`}>
              {dropdownItems['Pomoc pacientom'].map((item) => (
                <Link
                  key={item}
                  href={`/pomoc-pacientom/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Dropdown for Diagnózy */}
          <div>
            <button
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => setActiveDropdown(
                activeDropdown === 'Diagnózy' ? null : 'Diagnózy'
              )}
            >
              Diagnózy
            </button>
            <div className={`pl-4 ${activeDropdown === 'Diagnózy' ? 'block' : 'hidden'}`}>
              {dropdownItems['Diagnózy'].map((item) => (
                <Link
                  key={item}
                  href={`/diagnozy/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/podporte-nas"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            Podporte nás
          </Link>
          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            Domov
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 