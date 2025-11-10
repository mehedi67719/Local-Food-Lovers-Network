import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { NavLink } from 'react-router';

const Topreviewproduct = ({product}) => {

    return (
       
          
            
                
                    <div  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-100 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                            <p className="text-gray-600 mb-1"><strong>Restaurant:</strong> {product.restaurant}</p>
                            <p className="text-gray-600 mb-1"><strong>Location:</strong> {product.location}</p>
                            <p className="text-gray-600 mb-1"><strong>Reviewer:</strong> {product.userEmail}</p>
                            <p className="text-yellow-500 mb-3 flex gap-1 items-center font-bold"><FaStar  className='text-xl'/> {product.rating}</p>
                            <p className="text-gray-500 mb-1"><strong>Date:</strong> {new Date(product.date).toLocaleDateString()}</p>

                            <div className="flex justify-between">
                               <NavLink to={`/viewdetels/${product._id}`}>
                                 <button className="btn-primary">
                                    View Details
                                </button>
                               </NavLink>
                             <FaHeart  className='text-2xl'/>
                            </div>
                        </div>
                    </div>
     

    );
};

export default Topreviewproduct;