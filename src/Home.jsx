import React from 'react';
import { useLoaderData } from 'react-router';
import Topreviewproduct from './Topreviewproduct';

const Home = () => {

    const products=useLoaderData();
    // console.log(products)




    return (
        <div className='min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 py-10'>

            <h2 className="text-3xl font-bold text-center text-white mb-10">
                Top Rated Reviews
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-[90%] max-w-[95%] mx-auto'>
                {
                    products.map(product => (
                        <Topreviewproduct key={product._id} product={product} />
                    ))
                }
            </div>


            <button className="bg-white/90 flex mx-auto mt-10 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-all duration-300">
                Show All
            </button>

        </div>
    );
};

export default Home;