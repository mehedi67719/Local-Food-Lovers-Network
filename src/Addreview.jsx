import React, { useContext, useState } from 'react';
import { Authcontext } from './Authcontext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Addreview = () => {
    const { user } = useContext(Authcontext);
    const navigate = useNavigate();
    const [loader, setloader] = useState(false);

    const handlesubmit = (e) => {
        e.preventDefault();
        setloader(true);

        const name = e.target.name.value;
        const image = e.target.img.value;
        const restaurant = e.target.restaurantname.value;
        const location = e.target.location.value;
        const rating = e.target.rating.value;
        const reviewText = e.target.writereview.value;
        const userEmail = user?.email;
        const date = new Date().toISOString();
        const category = e.target.category.value;

        if (!name || !image || !restaurant || !location || !rating || !reviewText || !userEmail || !date || !category) {
            Swal.fire({
                title: 'Error!',
                text: 'All fields are required!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setloader(false);
            return;
        }

        const newreview = {
            name,
            image,
            restaurant,
            location,
            rating,
            reviewText,
            userEmail,
            date,
            category
        };

        fetch("http://localhost:3000/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newreview)
        })
        .then(res => res.json())
        .then(data => {
            e.target.reset();
            Swal.fire({
                title: 'Success!',
                text: 'Review Added Successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/allreviews'); // OK click করলে navigate হবে
            });
        })
        .catch(err => {
            console.error(err);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add review!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        })
        .finally(() => setloader(false));
    }

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-5">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
                    Add Your Review
                </h2>

                <form onSubmit={handlesubmit} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Food Name"
                        name='name'
                        className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name='img'
                        placeholder="Food Image URL"
                        className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name='restaurantname'
                        placeholder="Restaurant Name"
                        className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <select
                        name="category"
                        required
                        className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <option value="">Select Food Category</option>
                        <option value="Street Food">Street Food</option>
                        <option value="Restaurant Food">Restaurant Food</option>
                        <option value="Homemade Food">Homemade Food</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Location"
                        name='location'
                        className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        name='rating'
                        placeholder="Rating (1-5)"
                        className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <textarea
                        placeholder="Write your review"
                        name='writereview'
                        className="input input-bordered w-full rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                        type="submit"
                        className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold border-0 hover:from-pink-500 hover:to-purple-500"
                    >
                        Add Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addreview;
