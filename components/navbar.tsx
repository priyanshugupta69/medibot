'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const NavLinks = ({ isMobile}:any) => (
    <div className={`${isMobile ? 'flex flex-col items-start mt-4 space-y-2 ml-2' : 'hidden md:flex flex-1 justify-center items-center space-x-8'}`}>
      <Link href="/">
        <span className="block text-white p-2 transition-colors duration-300 ease-in-out hover:text-[#B1D4E0]">
          Home
        </span>
      </Link>
      <Link href="/about">
        <span className="block text-white p-2 transition-colors duration-300 ease-in-out hover:text-[#B1D4E0]">
          About
        </span>
      </Link>
      <Link href="/services">
        <span className="block text-white p-2 transition-colors duration-300 ease-in-out hover:text-[#B1D4E0]">
          Services
        </span>
      </Link>
      <Link href="/contact">
        <span className="block text-white p-2 transition-colors duration-300 ease-in-out hover:text-[#B1D4E0]">
          Contact
        </span>
      </Link>
    </div>
  );

  return (
    <nav className="bg-gray-800 p-2 fixed top-0 left-0 right-0 z-50">
      <div className='container mx-auto flex justify-between items-center w-11/12'>
        <div className={`flex items-center ${isOpen ? 'w-full justify-center' : 'inline-block'}`}>
          <span className='text-[#B1D4E0] font-serif text-lg transition-transform duration-300 ease-in-out transform hover:scale-110 '>
            Huego
          </span>
        </div>
        <NavLinks isMobile={false} />
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6 transition-transform duration-300 ease-in-out transform hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && <NavLinks isMobile={true} />}
    </nav>
  );
};

export default Navigation;




