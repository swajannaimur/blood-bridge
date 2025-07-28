import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Components/Contexts/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import loginAnimation from '../../assets/Lotties/login animation.json'
import Lottie from 'lottie-react';

const Login = () => {
    const { signIn } = use(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(res => {
                navigate(`${location.state ? location.state : '/'}`)
                Swal.fire({
                    title: "Great!",
                    text: "Successfully logged In",
                    icon: "success"
                });
                form.reset();
            })
            .catch(error => {
                toast.error(error.message);
            });
    };
    return (
        <div>
            <div className="min-h-screen bg-base-200 flex flex-col items-center px-4 pt-10">

                <h2 className="text-4xl font-extrabold text-center text-primary mb-8">
                    Login Now
                </h2>

                <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 w-full max-w-6xl">
                    {/* Login Form */}
                    <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-md">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" className="input input-bordered w-full" placeholder="Enter your email" required />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" className="input input-bordered w-full" placeholder="Enter your password" required />
                            </div>

                            <div>
                                <h2>New to this site? <Link to='/register'><span className='text-blue-500 underline'>Register now</span></Link></h2>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button type="submit" className="btn btn-primary text-lg w-full">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="w-full lg:w-1/2 max-w-md">
                        <Lottie animationData={loginAnimation} loop={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;