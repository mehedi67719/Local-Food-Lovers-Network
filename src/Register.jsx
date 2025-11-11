import React, { useContext } from 'react';
import { Authcontext } from './Authcontext';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();
    const { singinwithgoogle, createuser } = useContext(Authcontext);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const photo = e.target.photo.value;

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Password not match',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            Swal.fire({
                title: 'Error!',
                text: 'Password must be at least 6 characters long and include uppercase and lowercase letters.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        createuser(email, password)
            .then((userCredential) => {
                const createdUser = userCredential.user;
                updateProfile(createdUser, { displayName: name, photoURL: photo })
                    .then(() => {
                        navigate('/'); 
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Error!',
                            text: err.message || 'Something went wrong',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
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

        e.target.reset();
    }

    const registerWithGoogle = () => {
        singinwithgoogle()
            .then(() => {
                navigate('/'); 
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
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input type="text" name="name" placeholder="Enter your name" className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                    </div>

                    <div>
                        <label htmlFor="photo" className="block text-gray-700 font-semibold mb-1">Photo URL</label>
                        <input type="text" name="photo" placeholder="Enter your photo URL" className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm your password" className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                    </div>

                    <div>
                        <button type="submit" className="btn-primary !w-full">Register</button>
                    </div>

                    <button onClick={registerWithGoogle} className="btn-primary !w-full my-5 flex items-center justify-center gap-2">
                        Register with Google
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-purple-500 font-semibold hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
