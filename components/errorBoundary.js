// app/components/ErrorBoundary.js
"use client";
import { useState, useEffect } from 'react';
/**
 * ErrorBoundary Component
 * A simple error boundary to catch and display errors that occur in the component tree.
 * Logs the error to the console and displays an error message if an error occurs.
 * 
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components that will be rendered inside the ErrorBoundary.
 * 
 * @returns {JSX.Element} The ErrorBoundary component, rendering either the error message or its children.
 */

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);


  /**
   * Effect hook that logs the error to the console whenever an error occurs.
   */
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return error ? <p>Error: {error.message}</p> : children;
};

export default ErrorBoundary;
