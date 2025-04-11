"use client";
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { toast } from 'sonner';

const navItemStyle =
  "block text-center w-full md:w-auto px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 transition duration-300";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li className="w-full md:w-auto">
    <Link href={href}>
      <span className={navItemStyle}>{children}</span>
    </Link>
  </li>
);

export default function MainNavbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 px-6 md:px-10">
        {/* Logo and Menu Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
            <Link href="/dashboard">API Hub</Link>
          </h1>
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
        </div>

        {/* Navigation Links */}
        <nav
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96' : 'max-h-0'
          } md:max-h-full md:flex`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-4 md:mt-0">
            <NavLink href="/dashboard/allcustomapi">Your-Api</NavLink>
            <NavLink href="/dashboard/uploadjsondata">Upload-json</NavLink>
            <NavLink href="/dashboard/createapi">Create-Endpoint</NavLink>
            <li className="w-full md:w-auto">
              <button
                onClick={() => {
                  toast.success("Sign Out Successful");
                  signOut();
                }}
                aria-label="Logout"
                className={navItemStyle}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
