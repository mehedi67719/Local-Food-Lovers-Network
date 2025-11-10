import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';

const Myreview = () => {

    const { user } = useContext(Authcontext);
    const [loader, setLoader] = useState(true);
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/myreview?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyReviews(data);
                    setLoader(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false);
                });
        }
    }, [user]);

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/review/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => {
                 Swal.fire({
                title: 'Success!',
                text: 'Review deleted Successfully!',
                icon: 'success',
                confirmButtonText: 'OK'})
                window.location.reload(); 
            })
            .catch(err =>             Swal.fire({
                title: 'Error!',
                text: 'somthing wrong!',
                icon:err.massage|| 'error',
                confirmButtonText: 'OK'
            }));
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                My Reviews
            </h2>

            {myReviews.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">
                    You haven’t added any reviews yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-2xl rounded-2xl">
                        <thead className="bg-purple-500 text-white">
                            <tr>
                                <th className="text-left p-3">Image</th>
                                <th className="text-left p-3">Food Name</th>
                                <th className="text-left p-3">Restaurant</th>
                                <th className="text-left p-3">Date</th>
                                <th className="text-center p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myReviews.map((item) => (
                                <tr key={item._id} className="hover:bg-purple-50 transition-all">
                                    <td className="p-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="p-3 font-semibold">{item.name}</td>
                                    <td className="p-3">{item.restaurant}</td>
                                    <td className="p-3 text-gray-600">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <NavLink to={`/editreview/${item._id}`}>
                                            <button className="btn-primary">
                                                Edit
                                            </button>
                                        </NavLink>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-sm bg-red-500 text-white hover:bg-red-600 border-0"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Myreview;
