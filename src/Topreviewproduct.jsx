import React from 'react';
import { FaStar } from "react-icons/fa";

const Topreviewproduct = ({product}) => {
    return (
       
          
            
                
                    <div  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                            <p className="text-gray-600 mb-1"><strong>Restaurant:</strong> {product.restaurant}</p>
                            <p className="text-gray-600 mb-1"><strong>Location:</strong> {product.location}</p>
                            <p className="text-gray-600 mb-1"><strong>Reviewer:</strong> {product.userEmail}</p>
                            <p className="text-yellow-500 mb-3 flex gap-1 items-center font-bold"><FaStar  className='text-xl'/> {product.rating}</p>

                            <div className="flex justify-between">
                                <button className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 border-0">
                                    View Details
                                </button>
                                <button className="btn btn-sm bg-gray-200 text-gray-800 hover:bg-gray-300 border-0">
                                    Show All
                                </button>
                            </div>
                        </div>
                    </div>
     

    );
};

export default Topreviewproduct;