// app/components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-600 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        
        <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
            <Link href="/signup" className="bg-green-500 px-4 py-2 rounded">
              Sign Up
            </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
