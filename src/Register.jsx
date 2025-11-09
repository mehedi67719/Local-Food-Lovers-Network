import React, {   useContext } from 'react';
import { Authcontext } from './Authcontext';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Register = () => {

 
    const navigate=useNavigate()

    const {createuser}=useContext(Authcontext)
    const handleRegister=(e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        const confirmPassword=e.target.confirmPassword.value;
        const photo=e.target.photo.value;


        if(password !==confirmPassword){
            alert("Passwords do not match!")
            return;
        }

        createuser(email,password)
        .then((userCredential)=>{
             const createdUser = userCredential.user; 
            updateProfile(createdUser,{displayName: name, photoURL: photo})
            
            .then(() => console.log("Profile updated"))
            console.log('profile updated')
            alert("registation succussfull")
    
        })

        .catch(err=>{
            console.log(err)
        })
        e.target.reset()

        navigate('/')
       
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
                            className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-pink-500 hover:to-purple-500"
                        >
                            Register
                        </button>
                    </div>
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