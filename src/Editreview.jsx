import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`https://food-lovers-backend.vercel.app/review/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviewData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching review:", err);
        setLoading(false);
      });
  }, [id]);

  
  if (loading) {
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

    fetch(`https://food-lovers-backend.vercel.app/review/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        
        if (data.matchedCount > 0 && data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Review updated successfully",
            showConfirmButton: false,
            timer: 1800,
          }).then(() => navigate("/myreview"));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Update failed or review not found",
          });
        }
      })
      .catch((err) => {
        console.error("Error updating review:", err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong",
        });
      });
  };

 
  const handleCancel = () => {
    navigate("/myreview");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Your Review
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Food Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={reviewData.name}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Restaurant
            </label>
            <input
              type="text"
              name="restaurant"
              defaultValue={reviewData.restaurant}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={reviewData.location}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              min={1}
              max={5}
              step={0.1}
              defaultValue={reviewData.rating}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Review
            </label>
            <textarea
              name="reviewText"
              defaultValue={reviewData.reviewText}
              className="textarea textarea-bordered w-full h-28"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
