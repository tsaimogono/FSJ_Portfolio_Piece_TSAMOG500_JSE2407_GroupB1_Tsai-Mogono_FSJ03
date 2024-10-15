// app/components/Navbar.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Adjust this import based on your file structure
import { signOutUser } from '../lib/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOutUser();
  };

  return (
    <nav className="bg-gray-600 p-4 text-white">
      <div className="flex items-center justify-between">
        {/* Left side navigation */}
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
        </ul>

        {/*3Right side auth section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden sm:block">Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/Login" className="bg-blue-500 px-4 py-2 rounded">
                Login
              </Link>
              <Link href="/Signup" className="bg-purple-500 px-4 py-2 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
