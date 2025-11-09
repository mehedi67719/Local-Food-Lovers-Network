import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Authcontext } from './Authcontext';
import { FaStar, FaHeart, FaEdit, FaTrash } from "react-icons/fa";

const Viewdetels = () => {

    const {user}=useContext(Authcontext)
    const navigate=useNavigate()

    const [products,setproducts]=useState(null)
    const [loading,setloading]=useState(true)

    const {id}=useParams();
    // console.log(id)
    useEffect(()=>{
        fetch("http://localhost:3000/product")
        .then(res=>res.json())
        .then(data=>{
            setproducts(data)
            setloading(false)
        })
        .catch(err=>console.log(err))
    },[])

    // console.log(products)

            if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }


     const product=products.find(data=>data._id==id)

    //  console.log(product)



    return (
 <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
                    <p className="text-gray-700 mb-1"><strong>Restaurant:</strong> {product.restaurant}</p>
                    <p className="text-gray-700 mb-1"><strong>Location:</strong> {product.location}</p>
                    <p className="text-gray-700 mb-1"><strong>Reviewer:</strong> {product.userEmail}</p>
                    <p className="text-gray-500 mb-1"><strong>Date:</strong> {new Date(product.date).toLocaleDateString()}</p>
                    <p className="text-yellow-500 mb-3 flex items-center gap-2 font-bold">
                        <FaStar className="text-xl" /> {product.rating}
                    </p>
                    <p className="text-gray-800 mb-5">{product.reviewText}</p>

                    <div className="flex items-center justify-between">
                        <FaHeart className="text-2xl text-red-500 cursor-pointer" title="Add to Favorites" />
                        {user && user.email === product.userEmail && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => navigate(`/editreview/${product._id}`)}
                                    className="flex items-center gap-1 btn btn-sm bg-blue-500 text-white border-0 hover:bg-blue-600"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => alert("Delete functionality")}
                                    className="flex items-center gap-1 btn btn-sm bg-red-500 text-white border-0 hover:bg-red-600"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewdetels;