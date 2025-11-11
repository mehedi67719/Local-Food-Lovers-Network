import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Authcontext } from './Authcontext';
import { FaStar, FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

const Viewdetels = () => {
    const { user } = useContext(Authcontext);
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [favorite, setFavorite] = useState([]);
    const [loader, setLoader] = useState(true);

    const { id } = useParams();

    
    useEffect(() => {
        fetch(`http://localhost:3000/review/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoader(false);
            })
            .catch(err => console.log(err));
    }, [id]);

   
    useEffect(() => {
        fetch("http://localhost:3000/favorite")
            .then(res => res.json())
            .then(data => setFavorite(data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/review/${product._id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(() => {
                    Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                    navigate("/myreview");
                })
                .catch(err => Swal.fire({
                    title: 'Error!',
                    text: err.message || "Something went wrong",
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
            }
        });
    };

    const handelclick = (id, name, image) => {
        if (!user) return;

        const newobject = {
            productname: name,
            image: image,
            useremail: user.email,
            username: user.displayName,
            productid: id
        };

        fetch("http://localhost:3000/favoritepost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newobject)
        })
        .then(res => res.json())
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Added to Favorites',
                showConfirmButton: false,
                timer: 1500
            });
            setFavorite(prev => [...prev, newobject]);
        })
        .catch(err => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message || 'Something went wrong!'
        }));
    };

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    const filterfavorite = favorite.find(data => data.productid === product._id && data.useremail === user?.email);

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
                        <button
                            type='button'
                            disabled={!!filterfavorite}
                            onClick={() => handelclick(product._id, product.name, product.image)}
                        >
                            <FaHeart className={filterfavorite ? 'text-2xl text-red-600' : 'text-2xl'} />
                        </button>

                        {user && user.email === product.userEmail && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => navigate(`/editreview/${product._id}`)}
                                    className="flex items-center gap-1 btn btn-sm bg-blue-500 text-white border-0 hover:bg-blue-600"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={handleDelete}
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
