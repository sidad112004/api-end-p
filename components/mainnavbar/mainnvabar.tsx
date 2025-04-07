"use client";
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { toast } from 'sonner';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href}>
      <span className="inline-block px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 transition-colors duration-300">
        {children}
      </span>
    </Link>
  </li>
);

export default function MainNavbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-4 px-6 md:px-10 bg-gray-800 shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider transition-colors duration-300">
        <Link href="/dashboard">API Hub</Link>
      </h1>

      {/* Hamburger menu for mobile mode */}
      <button 
        className="md:hidden text-white" 
        onClick={toggleDropdown} 
        aria-label="Toggle Navigation"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Navigation links for desktop and mobile */}
      <nav className={`${isOpen ? 'block' : 'hidden'} md:block transition-all duration-300 ease-in-out`}>
        <ul className="md:flex space-x-6">
          <NavLink href="/dashboard/allcustomapi">Your-Api</NavLink>
          <NavLink href="/dashboard/uploadjsondata">Upload-json</NavLink>
          <NavLink href="/dashboard/createapi">Create-Endpoint</NavLink>
          <li>
            <button 
              onClick={() => {
                toast.success("Sign Out Successful");
                signOut();
              }} 
              aria-label="Logout"
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 transition-colors duration-300">
                Logout
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
