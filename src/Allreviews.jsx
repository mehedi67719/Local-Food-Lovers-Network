import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Allreviews = () => {

    const[ productsData,setproductsData]=useState(null)
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        fetch("http://localhost:3000/product")
        .then(res=>res.json())
        .then(data=>{
            setproductsData(data)
            setloading(false)
        })
        .catch(errr=>console.log(errr))
    },[])

    
           if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    // console.log(productsData)


        const products = productsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
<div className='bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10'>

    <h2 className='text-3xl font-bold text-center mb-5'>All Reviews</h2>
    <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-[90%] max-w-[95%] mx-auto'>
            {
                products.map(product=><div  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
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
                                                    <button className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 border-0">
                                                    View Details
                                                </button>
                                                </NavLink>
                                             <FaHeart  className='text-2xl'/>
                                            </div>
                                        </div>
                                    </div>)
            }
    </div>
</div>
    );
};

export default Allreviews;