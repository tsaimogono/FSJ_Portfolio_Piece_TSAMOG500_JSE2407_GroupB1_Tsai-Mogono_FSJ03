// app/components/AuthForm.js
'use client';

import React, { useState } from 'react';
import { signUp, signIn } from '../../lib/auth';
import { useRouter } from 'next/navigation';

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'signup') {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">
        {mode === 'signup' ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
}
