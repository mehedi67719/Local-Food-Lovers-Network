import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { Authcontext } from './Authcontext';
import { IoIosArrowDown } from "react-icons/io";

import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from 'react-router';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(Authcontext);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Logout Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: err.message || 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      );
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-5 py-4 max-w-[95%] mx-auto">

        <h2 className="text-2xl md:text-3xl font-bold text-orange-500">
          Local Food Lovers Network
        </h2>

  
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-gray-700">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div className="hidden md:flex items-center font-bold gap-5">
          <NavLink to='/' className='hover:text-orange-500'>Home</NavLink>
          <NavLink to='/allreviews' className='hover:text-orange-500'>All Reviews</NavLink>
          <NavLink to='/addreview' className='hover:text-orange-500'>Add Review</NavLink>
        </div>


        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className='relative'>
              <div
                className='flex items-center gap-2 cursor-pointer'
                onClick={() => setOpen(!open)}
              >
                <img
                  className='h-10 w-10 rounded-full border-2 border-orange-400'
                  src={user.photoURL}
                  alt="profile"
                />
                <IoIosArrowDown
                  className={`text-2xl text-gray-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
              </div>

              {open && (
                <div className='absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-xl py-3 z-50'>
                  <p className="px-4 py-2 text-lg text-green-500 font-bold">{user.displayName}</p>
                  <NavLink to="/addreview" className="block px-4 py-2 hover:bg-orange-100 rounded">Add Review</NavLink>
                  <NavLink to="/myreview" className="block px-4 py-2 hover:bg-orange-100 rounded">My Reviews</NavLink>
                  <NavLink to="/favorites" className="block px-4 py-2 hover:bg-orange-100 rounded">My Favorites</NavLink>
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex gap-4'>
              <NavLink to='/login'>
                <button className="text-white bg-orange-500 px-4 py-1 rounded-md btn-primary">Login</button>
              </NavLink>
              <NavLink to='/register'>
                <button className="text-white bg-orange-500 px-4 py-1 rounded-md btn-primary">Register</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>


      {menuOpen && (
        <div className="flex flex-col md:hidden bg-gray-50 px-5 py-4 space-y-4 font-semibold text-center border-t border-gray-200">
          <NavLink onClick={() => setMenuOpen(false)} to='/' className='hover:text-orange-500'>Home</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to='/allreviews' className='hover:text-orange-500'>All Reviews</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to='/addreview' className='hover:text-orange-500'>Add Review</NavLink>

          {user ? (
            <>
              <NavLink onClick={() => setMenuOpen(false)} to='/myreview' className='hover:text-orange-500'>My Reviews</NavLink>
              <NavLink onClick={() => setMenuOpen(false)} to='/favorites' className='hover:text-orange-500'>My Favorites</NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-500 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to='/login' onClick={() => setMenuOpen(false)}>
                <button className="text-white bg-orange-500 !w-full py-2 rounded-md btn-primary">Login</button>
              </NavLink>
              <NavLink to='/register' onClick={() => setMenuOpen(false)}>
                <button className="text-white bg-orange-500 !w-full py-2 rounded-md btn-primary">Register</button>
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
