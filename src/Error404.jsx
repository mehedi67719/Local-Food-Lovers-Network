import React from 'react';
import { useNavigate } from 'react-router';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 p-5">
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="404 Not Found"
        className="w-80 sm:w-96 mb-8"
      />
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page Not Found</p>
      <button
        onClick={() => navigate('/')}
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Error404;
