import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import Swal from 'sweetalert2';

const Myfavorite = () => {

    const [myfavorite,mysetfavorite]=useState([])
    const [loader,setloader]=useState(true);
    const {user}=useContext(Authcontext)

 

    useEffect(()=>{
        fetch("http://localhost:3000/favorite")
        .then(res=>res.json())
        .then(data=>{
            mysetfavorite(data)
            setloader(false)
        })
        .catch(err=>console.log(err))
    },[])

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }

const favorite=myfavorite.filter(data=>data.useremail==user?.email);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to remove this from favorites!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/favorite/${id}`, {
                    method: "DELETE",
                })
                .then(res => res.json())
                .then(() => {
                    Swal.fire('Deleted!', 'Removed from favorites.', 'success');
                    
                    mysetfavorite(p => p.filter(fav => fav._id !== id));
                })
                .catch(err => {
                    Swal.fire('Error!', 'Something went wrong!', 'error');
                    console.log(err);
                });
            }
        });
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 lg:max-w-[80%] mx-auto w-full max-w-full">
            <h2 className="text-2xl sm:text-3xl text-center font-bold mb-6">My Favorites</h2>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-3 sm:px-5 text-left">Food Image</th>
                            <th className="py-3 px-3 sm:px-5 text-left">Food Name</th>
                            <th className="py-3 px-3 sm:px-5 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorite.map((data, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-2 px-3 sm:py-3 sm:px-5">
                                    <img 
                                        className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-xl object-cover" 
                                        src={data.image} 
                                        alt={data.productname} 
                                    />
                                </td>
                                <td className="py-2 px-3 sm:py-3 sm:px-5 font-medium text-sm sm:text-base">{data.productname}</td>
                                <td className="py-2 px-3 sm:py-3 sm:px-5">
                                    <button 
                                    onClick={()=>handleDelete(data._id)}
                                        type="button" 
                                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600 border-0 rounded-md px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base"
                                    >
                                        Delete Favorite
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myfavorite;
