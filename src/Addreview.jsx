import React from 'react';

const Addreview = () => {
    return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Add Your Review
        </h2>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Food Name"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Food Image URL"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Restaurant Name"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            placeholder="Write your review"
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