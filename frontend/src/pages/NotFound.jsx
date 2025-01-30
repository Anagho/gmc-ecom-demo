import React from 'react'
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      {/* 404 Error Text */}
      <h1 className="text-6xl font-extrabold text-red-500 animate-bounce">
        404‼️😒
      </h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found!</h2>
      <p className="text-gray-600 mt-2 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound