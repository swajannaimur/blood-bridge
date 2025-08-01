import React, { use, useState } from 'react';
import registration from '../../assets/Lotties/Registration animation.json';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router';
import districts from '../../../public/districts.json'
import upozilas from '../../../public/upozilas.json'
import { AuthContext } from '../../Components/Contexts/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosPublic from '../../Hooks/axiosPublic';

const Register = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedUpozila, setSelectedUpozila] = useState('')
    const { createUser } = use(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const filteredUpozilas = upozilas.filter((upozila) => {
        const district = districts.find(district => district.name === selectedDistrict);
        return district ? upozila.district_id === district.id : true;
    });

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value
        const name = form.name.value
        const avatar = form.avatar.value
        const bloodGroup = form.bloodGroup.value
        const district = form.district.value
        const upozila = form.upozila.value
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value

        const newUser = {
            email,
            name,
            avatar,
            bloodGroup,
            district,
            upozila,
            role: "donor",
            status: "active"
        }
        
        const passValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passValidation.test(password)) {
            toast.error('Password must contain an uppercase, a lowercase, and be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords did not matched');
            return;
        }
        createUser(email, password, name, avatar)
            .then(() => {
                return axiosPublic.post('/all-users', newUser);
            })
            .then(() => {
                Swal.fire({
                    title: "Great!",
                    text: "Account has been created",
                    icon: "success"
                });
                form.reset();
                setSelectedDistrict('');
                setSelectedUpozila('');
                navigate(location.state ? location.state : '/');
            })
            .catch((error) => {
                toast.error(error.message || "Failed to create account");
            });
    };

    return (
        <div className="">
            <div className='min-h-screen bg-base-200 flex flex-col items-center px-4 pt-10'>
                <h2 className="text-4xl font-extrabold text-center text-primary my">
                Register Now
            </h2>
            <div className=' flex items-center justify-center '>
                <div className="flex flex-col lg:flex-row-reverse items-center gap-10 max-w-6xl w-full py-10">

                    <div className="">
                        <Lottie animationData={registration} loop={true} />
                    </div>

                    {/* Registration Form */}
                    <div className="w-full lg:w-1/2 max-w-md bg-base-100 p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleRegister} className="space-y-4">

                            <div>
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" className="input input-bordered w-full" placeholder="Enter your email" required />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" className="input input-bordered w-full" placeholder="Enter your name" required />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Avatar</span>
                                </label>
                                <input type="text" name="avatar" className="input input-bordered w-full" placeholder="Enter your photo URL" required />
                            </div>

                            <fieldset>
                                <legend className="text-sm mb-1">Blood Group</legend>
                                <select name="bloodGroup" className="select select-bordered w-full  border-2" defaultValue="" required>
                                    <option value="" disabled>Select a category</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </fieldset>

                            {/* District */}
                            <div>
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select
                                    name="district"
                                    className="select select-bordered w-full border-2"
                                    value={selectedDistrict}
                                    onChange={(e) => {
                                        setSelectedDistrict(e.target.value);
                                        setSelectedUpozila('')
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select a district</option>
                                    {districts
                                        .slice()
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((district) => (
                                            <option key={district.id} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                </select>

                            </div>

                            {/*Upozila  */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Upozila</span>
                                </label>
                                <select
                                    name="upozila"
                                    className="select select-bordered w-full border-2"
                                    value={selectedUpozila}
                                    onChange={(e) => setSelectedUpozila(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select a Upozila</option>
                                    {filteredUpozilas
                                        .slice()
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((upozila) => (
                                            <option key={upozila.id} value={upozila.name}>
                                                {upozila.name}
                                            </option>
                                        ))}

                                </select>

                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" className="input input-bordered w-full" placeholder="Enter your password" required />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name="confirmPassword" className="input input-bordered w-full" placeholder="Enter your password" required />
                            </div>

                            <div className="text-sm text-center">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 underline">
                                    Login now
                                </Link>
                            </div>


                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary w-full text-lg">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;
