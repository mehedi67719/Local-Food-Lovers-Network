import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';

import { Authcontext } from './Authcontext';
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(Authcontext);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
           title: 'Success!',
           text: 'Login Successfully!',
           icon: 'success',
           confirmButtonText: 'OK'
                       
          })
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
    <div className='flex flex-col md:flex-row items-center gap-5 lg:gap-0 text-center p-5 justify-between md:max-w-[98%] max-w-full lg:max-w-[95%] mx-auto'>
      <h2 className='text-3xl font-bold text-orange-500'>Local Food Lovers Network</h2>

      <div className='flex items-center font-bold gap-5'>
        <NavLink to='/' className='hover:text-orange-500'>Home</NavLink>
        <NavLink to='/allreviews' className='hover:text-orange-500'>All Reviews</NavLink>
        <NavLink to='/addreview' className='hover:text-orange-500'>Add Review</NavLink>
       
      </div>

      {user ? (
        <div className='relative'>
         
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => setOpen(!open)}
          >
            <img
              className='h-10 w-10 rounded-full border-2 border-purple-400'
              src={user.photoURL}
              alt="profile"
            />
            <IoIosArrowDown
              className={`text-2xl text-gray-700 transition-transform duration-300 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </div>

         
          {open && (
            <div className='absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-xl py-3 animate-fadeIn z-50'>
              <p className="px-4 py-2 text-2xl text-green-500 font-bold"> {user.displayName}</p>
              <NavLink
                to="/addreview"
                className="block px-4 py-2 hover:bg-purple-100 rounded"
                onClick={() => setOpen(false)}
              >
                Add Review
              </NavLink>
              <NavLink
                to="/myreview"
                className="block px-4 py-2 hover:bg-purple-100 rounded"
                onClick={() => setOpen(false)}
              >
                My Reviews
              </NavLink>
              <NavLink
                to="/favorites"
                className="block px-4 py-2 hover:bg-purple-100 rounded"
                onClick={() => setOpen(false)}
              >
                My Favorites
              </NavLink>
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
        <div className='flex flex-col items-center md:flex-row lg:flex-row gap-5'>
          <NavLink to='/login'>
            <button className="btn-primary">Login</button>
          </NavLink>
          <NavLink to='/register'>
            <button className="btn-primary">Register</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
