import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { FaStar, FaHeart } from "react-icons/fa";
import { Authcontext } from './Authcontext';
import Swal from 'sweetalert2';

const Allreviews = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { user } = useContext(Authcontext);
  const [favorite, setFavorite] = useState([]);


  useEffect(() => {
    fetch("https://food-lovers-backend.vercel.app/favorite")
      .then(res => res.json())
      .then(data => {
        setFavorite(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);


  const handleClick = (id, name, image) => {
    if (!user) return;

    const newObject = {
      productname: name,
      image: image,
      useremail: user.email,
      username: user.displayName,
      productid: id
    };

    fetch("https://food-lovers-backend.vercel.app/favoritepost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObject)
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Added to Favorites',
          showConfirmButton: false,
          timer: 1500
        });
        setFavorite(prev => [...prev, newObject]);
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      });
  };


  const fetchData = (query = "") => {
    setLoading(true);
    const url = query
      ? `https://food-lovers-backend.vercel.app/search?name=${query}`
      : "https://food-lovers-backend.vercel.app/review";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductsData(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(searchText);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-5">All Reviews</h2>

      <form onSubmit={handleSearch} className="text-center mb-6 flex justify-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by food name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border p-2 rounded-lg w-64"
          />
          <button type="submit" className="ml-2 btn-primary !btn-md">Search</button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-[90%] max-w-[95%] mx-auto">
        {productsData.map((product) => {
          const filterFavorite = favorite.find(
            data => data.productid === product._id && data.useremail === user?.email
          );

          return (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
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
                  <FaStar className="text-xl" /> {product.rating}
                </p>
                <p className="text-gray-500 mb-1"><strong>Date:</strong> {new Date(product.date).toLocaleDateString()}</p>

                <div className="flex justify-between">
                  <NavLink to={`/viewdetels/${product._id}`}>
                    <button className="btn-primary">View Details</button>
                  </NavLink>
                  <button
                    type="button"
                    disabled={!!filterFavorite}
                    onClick={() => handleClick(product._id, product.name, product.image)}
                  >
                    <FaHeart className={filterFavorite ? 'text-2xl text-red-600' : 'text-2xl'} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Allreviews;
