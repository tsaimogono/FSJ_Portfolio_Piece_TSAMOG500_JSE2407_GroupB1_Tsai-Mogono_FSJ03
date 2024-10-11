'use client'; // Enable client-side rendering

import { useState } from 'react';
import { auth } from '@/lib/firebase'; // Ensure the correct path based on your project structure
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home after successful signup
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image or Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-purple-500 to-indigo-600 items-center justify-center p-10">
        <img
          src="/signup-illustration.svg" // Replace with your own image
          alt="Signup Illustration"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12 bg-gray-50">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Join Us Today</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-purple-600 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-200"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Redirect to Login */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 font-medium hover:underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
