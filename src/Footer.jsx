import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Authcontext } from './Authcontext';

const Footer = () => {
    const { user } = useContext(Authcontext);

    return (
        <footer className="bg-gray-100 text-gray-700">
            <div className="max-w-[95%] mx-auto py-10 flex flex-col md:flex-row justify-between items-center gap-6">
                
               
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-orange-500">Local Food Lovers Network</h2>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Connecting food lovers with local flavors.</p>
                </div>

             
                <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-center md:text-left font-semibold flex-1">
                    <NavLink to="/" className="hover:text-orange-500 transition-colors">Home</NavLink>
                    <NavLink to="/allreviews" className="hover:text-orange-500 transition-colors">All Reviews</NavLink>
                    <NavLink to="/addreview" className="hover:text-orange-500 transition-colors">Add Review</NavLink>
                    { !user && (
                        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                            <NavLink to="/login" className="btn-primary">Login</NavLink>
                            <NavLink to="/register" className="btn-primary">Register</NavLink>
                        </div>
                    )}
                </div>

              
                <div className="text-center md:text-right flex-1">
                    <p className="font-semibold mb-2">Follow Us:</p>
                    <div className="flex justify-center md:justify-end gap-5 text-2xl md:text-3xl">
                        <a href="https://www.facebook.com/mehedi.hasana.835189" className="hover:text-orange-500 transition-colors"><FaFacebook /></a>
                        <a href="https://www.instagram.com/mehedihassan67710/" className="hover:text-orange-500 transition-colors"><FaInstagramSquare /></a>
                        <a href="https://x.com/" className="hover:text-orange-500 transition-colors"><FaSquareXTwitter /></a>
                    </div>
                </div>
            </div>

           
            <div className="bg-gray-200 text-gray-500 text-sm py-4 text-center mt-4">
                &copy; {new Date().getFullYear()} Local Food Lovers Network. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
