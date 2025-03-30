'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
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
            <Link href="/" className="relative w-40 h-12">
              <Image
                src="/images/logo.png"
                alt="Nie rakovine logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/aktuality" className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Aktuality
            </Link>
            <Link href="/kto-sme" className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Kto sme
            </Link>
            
            {/* Dropdown for Pomoc pacientom */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('Pomoc pacientom')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Pomoc pacientom
              </button>
              <div 
                className="absolute w-full h-2 bottom-0 translate-y-full"
              ></div>
              <div
                className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 ${
                  activeDropdown === 'Pomoc pacientom' ? 'block' : 'hidden'
                }`}
              >
                {dropdownItems['Pomoc pacientom'].map((item) => (
                  <Link
                    key={item}
                    href={`/pomoc-pacientom/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown for Diagnózy */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('Diagnózy')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Diagnózy
              </button>
              <div 
                className="absolute w-full h-2 bottom-0 translate-y-full"
              ></div>
              <div
                className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 ${
                  activeDropdown === 'Diagnózy' ? 'block' : 'hidden'
                }`}
              >
                {dropdownItems['Diagnózy'].map((item) => (
                  <Link
                    key={item}
                    href={`/diagnozy/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('Podporte nás')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Podporte nás
              </button>
              <div 
                className="absolute w-full h-2 bottom-0 translate-y-full"
              ></div>
              <div
                className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 ${
                  activeDropdown === 'Podporte nás' ? 'block' : 'hidden'
                }`}
              >
                <Link
                  href="/podporte-nas"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Podporte nás
                </Link>
                <Link
                  href="/darcovia"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Darcovia
                </Link>
              </div>
            </div>
            <Link href="/" className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Domov
            </Link>

            {/* Auth Section */}
            {session ? (
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('user')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-1"
                >
                  <span>{session.user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className="absolute w-full h-2 bottom-0 translate-y-full"
                ></div>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 ${
                    activeDropdown === 'user' ? 'block' : 'hidden'
                  }`}
                >
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/darcovia"
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    Darcovia
                  </Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link
                      href="/admin/articles/new"
                      className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      Správa článkov
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    Odhlásiť sa
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth"
                className="text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Prihlásiť sa
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none"
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
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
            onClick={() => setIsOpen(false)}
          >
            Aktuality
          </Link>
          <Link
            href="/kto-sme"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
            onClick={() => setIsOpen(false)}
          >
            Kto sme
          </Link>
          
          {/* Mobile Dropdown for Pomoc pacientom */}
          <div>
            <button
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
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
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
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
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
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
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <button
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
              onClick={() => setActiveDropdown(
                activeDropdown === 'Podporte nás' ? null : 'Podporte nás'
              )}
            >
              Podporte nás
            </button>
            <div className={`pl-4 ${activeDropdown === 'Podporte nás' ? 'block' : 'hidden'}`}>
              <Link
                href="/podporte-nas"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Podporte nás
              </Link>
              <Link
                href="/darcovia"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Darcovia
              </Link>
            </div>
          </div>

          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
            onClick={() => setIsOpen(false)}
          >
            Domov
          </Link>

          {/* Mobile Auth Section */}
          {session ? (
            <>
              <div className="px-3 py-2 text-gray-700 font-medium border-t border-gray-200 mt-2 pt-2">
                {session.user?.name}
              </div>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/darcovia"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Darcovia
              </Link>
              {session.user?.role === 'ADMIN' && (
                <Link
                  href="/admin/articles/new"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  Správa článkov
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                Odhlásiť sa
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="block px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Prihlásiť sa
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 