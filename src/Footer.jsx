import React from 'react';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
 <footer className="bg-gray-100 text-gray-700 ">
            <div className="max-w-[95%] mx-auto py-10 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Logo / Site Name */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-orange-500">Local Food Lovers Network</h2>
                    <p className="text-gray-500 mt-2">Connecting food lovers with local flavors.</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row gap-4 text-center md:text-left font-semibold">
                    <NavLink to="/" className="hover:text-orange-500 transition-colors">Home</NavLink>
                    <NavLink to="/allreviews" className="hover:text-orange-500 transition-colors">All Reviews</NavLink>
                    <NavLink to="/addreview" className="hover:text-orange-500 transition-colors">Add Review</NavLink>
                    <NavLink to="/login" className="hover:text-orange-500 transition-colors">Login</NavLink>
                    <NavLink to="/register" className="hover:text-orange-500 transition-colors">Register</NavLink>
                </div>

                {/* Social / Contact Info */}
                <div className="text-center md:text-right">
                    <p className="font-semibold mb-2">Follow Us:</p>
                    <div className="flex justify-center md:justify-end gap-3">
                        <a href="#" className="hover:text-orange-500 transition-colors">Facebook</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Twitter</a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="bg-gray-200 text-gray-500 text-sm py-4 text-center mt-4">
                &copy; {new Date().getFullYear()} Local Food Lovers Network. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;