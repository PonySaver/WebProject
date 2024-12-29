import React from 'react';
import { Link } from 'react-router-dom';


export const Landing = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-300">
      {/* Main Content Container */}
      <div className="relative text-center p-8 bg-white rounded-3xl shadow-2xl max-w-4xl">
        {/* Floating Grocery Bag Image */}


        <img
          src="src/assets/81TSYJqZ6KL._AC_UF894,1000_QL80_.jpg"
          alt="logo"
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 drop-shadow-lg rounded-full"
        />

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-800 mt-12 mb-4">
          Welcome to{' '}
          <span className="text-purple-500">Maghaza.tn</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-8 leading-relaxed">



          Welcome to Maghaza.tn, your gateway to a seamless online shopping experience. Explore fresh groceries, exclusive deals, and easy-to-use features that make shopping effortless. With a clean design, interactive buttons, and engaging visuals, starting your hassle-free journey has never been easier!        </p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mb-8">x
          <Link
            to="/login"
            className="px-8 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 hover:shadow-lg transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-8 py-3 border-2 border-blue-500 text-blue-500 font-bold rounded-lg hover:bg-yellow-100 transition duration-300"
          >
            Sign Up          </Link>
        </div>


      </div>
    </div>
  );
};