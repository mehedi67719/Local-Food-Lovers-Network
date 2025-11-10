import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { Authcontext } from './Authcontext';
import Swal from 'sweetalert2';

const Login = () => {
    const { singinwithgoogle, signInWithEmailAndPass } = useContext(Authcontext);
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPass(email, password)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Login Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate(from, { replace: true }); 
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    const loginWithGoogle = () => {
        singinwithgoogle()
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Login Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                .then(() => {
                    navigate(from, { replace: true });
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            <div className="card w-96 bg-white shadow-xl rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
                        <input type="email" name='email' id="email" placeholder="Enter your email" className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Password</label>
                        <input type="password" name='password' id="password" placeholder="Enter your password" className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                    </div>

                    <div>
                        <button type="submit" className="btn-primary !w-full">Login</button>
                    </div>
                </form>

                <button onClick={loginWithGoogle} className="btn-primary w-full my-5 flex items-center justify-center gap-2">
                    Continue with Google
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
