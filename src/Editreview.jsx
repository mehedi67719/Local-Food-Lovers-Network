import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

const Editreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [product, setproduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/review/${id}`)
      .then(res => res.json())
      .then(data => {
        setproduct(data);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  }, []);


  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
      </div>
    );
  }

 

  const handleSave = (e) => {
     e.preventDefault(); 

    const updatedReview = {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    location: e.target.location.value,
    rating: Number(e.target.rating.value),
    reviewText: e.target.reviewText.value,
  };

  fetch(`http://localhost:3000/review/${id}`,{
    method:"PUT",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(updatedReview)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Review updated successfully!");
        navigate("/myreview");
      } else {
        alert("Update failed!");
      }
    })
    .catch(err => console.log(err));

  };

  
  const handleCancel = () => {
    navigate("/myreview"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Review
        </h2>

        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Food Name</label>
            <input
              type="text"
              name='name'
              defaultValue={product.name}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Restaurant</label>
            <input
              type="text"
              name='restaurant'
              defaultValue={product.restaurant}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name='location'
              defaultValue={product.location}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Rating</label>
            <input
              type="number"
              name='rating'
              defaultValue={product.rating}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Review</label>
            <textarea
              defaultValue={product.reviewText}
              name='reviewText'
              className="textarea textarea-bordered w-full h-28"
            ></textarea>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleSave}
              type='button'
              className="btn-primary "
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="btn btn-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editreview;
