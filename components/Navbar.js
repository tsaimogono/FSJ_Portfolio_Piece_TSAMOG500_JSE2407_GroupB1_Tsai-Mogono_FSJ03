// components/Navbar.js
//import { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ wishlistCount, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center">
            SwiftCart
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">Products</Link>
          <Link href="/wishlist">Wishlist ({wishlistCount})</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          <Link href="/login">Login</Link>
        </div>
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col bg-gray-800 p-4 space-y-2">
          <Link href="/">Products</Link>
          <Link href="/wishlist">Wishlist ({wishlistCount})</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          <Link href="/login">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
