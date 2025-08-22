import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {NavLink} from 'react-router';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Feature', href: '#features' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="text-white shadow-lg sticky top-0 bg-primaryPurple border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">EduTrack</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  style={{
                    ':hover': { backgroundColor: '#4a0066' },
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#4a0066')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = 'transparent')
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Sign In Button - Desktop */}
          <div className="hidden md:block">
            <NavLink to ="/Login"
              className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
              style={{ backgroundColor: '#4a0066' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#3d0052')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#4a0066')}
            >
              Sign in
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-200 hover:text-white p-2 rounded-md transition-colors duration-200"
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#4a0066')}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = 'transparent')
              }
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 rounded-lg mt-2"
              style={{ backgroundColor: '#4a0066' }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#3d0052')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = 'transparent')
                  }
                >
                  {item.name}
                </a>
              ))}
              {/* Sign In Button - Mobile */}
<NavLink
  to="/Login"

                className="w-full text-left text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mt-2"
                style={{ backgroundColor: '#3d0052' }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#330044')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#3d0052')
                }
              >
                Sign in
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
