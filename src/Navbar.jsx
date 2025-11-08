import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='flex flex-col md:flex-row lg:flex-row items-center gap-5 lg:gap-0 md:gap-0 text-center p-5 justify-between md:max-w-[98%] max-w-full lg:max-w-[95%] mx-auto '>
            <h2 className='text-3xl font-bold text-orange-500'>Local Food Lovers Network</h2>

            <div className='flex  items-center font-bold gap-5'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/allreviews'>All Reviews</NavLink>
                <NavLink to='/addreview'>Add Review</NavLink>
            </div>

            <div className='flex flex-col items-center md:flex-row lg:flex-row gap-5'>
                <NavLink to='/login'><button className="btn btn-success font-bold">Login</button></NavLink>
                <NavLink to='/register'><button className="btn btn-success font-bold hidden  lg:block">Register</button></NavLink>
            </div>
        </div>
    );
};

export default Navbar;