import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Topreviewproduct from './Topreviewproduct';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [lover, setLover] = useState([]);
    const [restaruant,setrestaruant]=useState([])


    useEffect(() => {
        fetch("https://food-lovers-backend.vercel.app/reviewproduct")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        fetch("https://food-lovers-backend.vercel.app/foodlover")
            .then(res => res.json())
            .then(data => {
                setLover(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(()=>{
        fetch("https://food-lovers-backend.vercel.app/toprestaurants")
        .then(res=>res.json())
        .then(data=>{
            setrestaruant(data)
             setLoading(false)
        })
       .catch(err=>console.log(err))
    },[])

   
     

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    const banners = [
        {
            img: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
            text: "Delicious Street Food"
        },
        {
            img: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",
            text: "Tasty Local Cuisine"
        },
        {
            img: "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
            text: "Fresh Homemade Meals"
        }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className='bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 pb-10'>

         
            <div className="max-w-full mb-10 relative">
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index} className="relative">
                            <img
                                src={banner.img}
                                alt={`banner-${index}`}
                                className="w-full h-96 sm:h-[28rem] lg:h-[32rem] object-cover rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold bg-black/40 px-4 py-2 rounded">
                                    {banner.text}
                                </h2>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

         
            <h2 className="text-3xl font-bold text-center text-black mb-10">
                Top Rated Reviews
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-[90%] max-w-[95%] mx-auto'>
                {products.map(product => (
                    <Topreviewproduct key={product._id} product={product} />
                ))}
            </div>

            <NavLink className='flex justify-center my-5' to='/allreviews'>
                <button className="btn-primary">
                    Show All
                </button>
            </NavLink>

         
            <div className='bg-white p-5 rounded-xl max-w-6xl mx-auto overflow-x-hidden'>
                <h2 className='my-5 text-3xl font-bold text-center'>Some Food Lovers</h2>
                <div className='my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

                    {lover.map(man => (
                        <div key={man._id} className='flex flex-col items-center'>
                            <div className='w-full max-w-[200px] h-[200px] overflow-hidden rounded-full'>
                                <img
                                    className='w-full h-full object-cover'
                                    src={man.photo}
                                    alt={man.name}
                                />
                            </div>
                            <h2 className='text-2xl font-bold text-center mt-4'>{man.name}</h2>
                            <p className='text-center mt-1'>Rating: {man.rating}</p>
                        </div>
                    ))}

                </div>
            </div>
            <div>
        </div>

<div className='bg-amber-100 max-w-full mx-auto p-10 my-10 w-full'>
    <h2 className='text-3xl font-bold text-center my-10'>Top Restaurants</h2>
    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center '>
    
    {
        restaruant.map(data=>
            <div className='p-2 bg-white rounded-xl w-2xs h-2xs'>
                <img className=' rounded-xl' src={data.image} alt="" />

                <h2 className='text-xl font-bold'>{data._id}</h2>
                <p >totalReviews:{data.totalReviews}</p>
                <p className='text-orange-300 font-bold'>averageRating:{data.averageRating}</p>
                <p>location:{data.location}</p>
            </div>
        )
    }
</div>
</div>

        </div>
    );
};

export default Home;
