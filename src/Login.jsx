import React from 'react';
import { NavLink } from 'react-router';

const Login = () => {

    const handellogin=(e)=>{
        e.preventDefault()
        const email=e.target.email.value;
        const password=e.target.password.value;
        console.log(email,password)
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            <div className="card w-96 bg-white shadow-xl rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

                <form onSubmit={handellogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            id="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-pink-500 hover:to-purple-500"
                        >
                            Login
                        </button>
                    </div>
                </form>

            

             <button className="btn my-3 bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-pink-500 hover:to-purple-500 text-black border-[#e5e5e5]">
                   <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                   Login with Google
             </button>

                 <p className="text-center text-gray-500 mt-4">
                    Don't have an account?{' '}
                    <NavLink to='/register' className="text-purple-500 font-semibold hover:underline">Sign Up</NavLink>
                </p>
            </div>

        </div>
    );
};

export default Login;
