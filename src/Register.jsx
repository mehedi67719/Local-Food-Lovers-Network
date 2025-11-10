import React, {   useContext } from 'react';
import { Authcontext } from './Authcontext';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const Register = () => {

 
    const navigate=useNavigate()

    const{singinwithgoogle}=useContext(Authcontext)
    const {createuser}=useContext(Authcontext)

    const handleRegister=(e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        const confirmPassword=e.target.confirmPassword.value;
        const photo=e.target.photo.value;


        if(password !==confirmPassword){
                 Swal.fire({
            title: 'Error!',
            text: 'Password not match',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
        }


         if(password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)){
        Swal.fire({
            title: 'Error!',
            text: 'Password must be at least 6 characters long and include uppercase and lowercase letters.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }


        createuser(email,password)
        .then((userCredential)=>{
             const createdUser = userCredential.user; 
            updateProfile(createdUser,{displayName: name, photoURL: photo})
            
            .then(() =>  Swal.fire({
                title: 'Success!',
                text: 'Registation Successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }))
            
            
    
        })

        .catch(err=>{
           Swal.fire({
               title: 'Error!',
               text: err.message || 'Something went wrong',
               icon: 'error',
               confirmButtonText: 'OK'
           });
        })
        e.target.reset()

        navigate('/')
       
    }

     const registerWithGoogle = () => {
            singinwithgoogle()
                .then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    .then(() => {
                        navigate('/');
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
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                  
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            
                            placeholder="Enter your email"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                   
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="photo">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            
                            placeholder="Enter your photo URL"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                  
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            
                            placeholder="Enter your password"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                   
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                        
                            placeholder="Confirm your password"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    
                    <div>
                        <button
                            type="submit"
                            className="btn-primary !w-full "
                        >
                            Register
                        </button>
                    </div>
                    
                <button
                    onClick={registerWithGoogle}
                    className="btn-primary w-full my-5 flex items-center justify-center gap-2 !w-full"
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Register with Google
                </button>
                </form>

              

                <p className="text-center text-gray-500 mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-purple-500 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;