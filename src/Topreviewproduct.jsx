import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { NavLink } from 'react-router';
import { Authcontext } from './Authcontext';
import Swal from 'sweetalert2';

const Topreviewproduct = ({product}) => {
    const {user}=useContext(Authcontext)
    const [favorite,setfavorite]=useState([])
    const [loader,setloader]=useState(true)

    useEffect(()=>{
        fetch("http://localhost:3000/favorite")
        .then(res=>res.json())
        .then(data=>{
            setfavorite(data)
            setloader(false)
        })
        .catch(err=>console.log(err))
    },[])

    const handelclick=(id,name,image)=>{
        if(!user) return;

        const newobject={
            productname:name,
            image:image,
            useremail:user.email,
            username:user.displayName,
            productid:id
        }

        fetch("http://localhost:3000/favoritepost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newobject)
        })
        .then(res=>res.json())
        .then(()=>{
          
            Swal.fire({
                icon: 'success',
                title: 'Added to Favorites',
                showConfirmButton: false,
                timer: 1500
            });

            
            setfavorite(prev => [...prev, newobject]);
        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        })
    }

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    const filterfavorite = favorite.find(data => data.productid === product._id && data.useremail === user?.email)

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
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
                <p className="text-yellow-500 mb-3 flex gap-1 items-center font-bold">
                    <FaStar className='text-xl'/> {product.rating}
                </p>
                <p className="text-gray-500 mb-1"><strong>Date:</strong> {new Date(product.date).toLocaleDateString()}</p>

                <div className="flex justify-between">
                    <NavLink to={`/viewdetels/${product._id}`}>
                        <button className="btn-primary">View Details</button>
                    </NavLink>
                    <button 
                        type='button'
                        disabled={!!filterfavorite}
                        onClick={()=>handelclick(product._id,product.name,product.image)}
                    >
                        <FaHeart className={filterfavorite ? 'text-2xl text-red-600' : 'text-2xl'} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Topreviewproduct;
