// app/components/ErrorBoundary.js
"use client";
import { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return error ? <p>Error: {error.message}</p> : children;
};

export default ErrorBoundary;
