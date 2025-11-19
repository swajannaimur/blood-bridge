import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';


const Header = () => {
    const { user, logOut } = use(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Great!",
                    text: "Successfully logged out",
                    icon: "success"
                });
            }).catch((error) => {
                console.log(error);
            });
    };

    const links = (
        <>
            <li><NavLink to="/" className="font-bold">Home</NavLink></li>
            <li><NavLink to="/donation-requests" className=" font-bold">Donation Requests</NavLink></li>
            <li><NavLink to="/all-blogs" className=" font-bold">Blog</NavLink></li>
            {user && (
                <li>
                    <NavLink to="/dashboard" className="font-bold">
                        Dashboard
                    </NavLink>
                </li>
            )}
            {user && (
                <li>
                    <button onClick={handleSignOut} className="font-bold">Logout</button>
                </li>
            )}
        </>
    );

    return (
        // <div className='sticky top-0 bg-primary z-50'>
        //     <div className='max-w-11/12 mx-auto px-4 '>
        //         <div className="navbar  lg:flex lg:justify-between lg:items-center">
        //             {/* Start Section (Mobile & Logo) */}
        //             <div className="flex justify-between items-center w-full lg:w-auto">

        //                 {/* Mobile Menu */}
        //                 <div className="dropdown lg:hidden">
        //                     <div tabIndex={0} role="button" className="btn btn-ghost">
        //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none"
        //                             viewBox="0 0 24 24" stroke="currentColor">
        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        //                                 d="M4 6h16M4 12h16M4 18h16" />
        //                         </svg>
        //                     </div>

        //                     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 text-primary rounded-box w-52">
        //                         {
        //                             user ? (
        //                                 <>
        //                                     {links}
        //                                 </>
        //                             ) : (
        //                                 <>
        //                                     <li><Link to="/login">Login</Link></li>
        //                                     <li><Link to="/register">Register</Link></li>
        //                                 </>
        //                             )
        //                         }
        //                     </ul>
        //                 </div>

        //                 {/* Logo */}
        //                 <Link to='/' className='flex items-center gap-2'>
        //                     <img src='https://img.icons8.com/?size=100&id=vurh7-um5eMM&format=png&color=FFFFFF' className='w-10' />
        //                     <span className='text-xl hidden lg:block text-white font-bold'>Blood-Bridge</span>
        //                 </Link>
        //             </div>

        //             {/* Center Menu */}
        //             <div className="hidden lg:flex lg:justify-center">
        //                 <ul className="menu menu-horizontal px-1">
        //                     {links}
        //                 </ul>
        //             </div>

        //             {/* End Section*/}
        //             <div className="hidden lg:flex lg:justify-end lg:items-center space-x-2">
        //                 {user ? (
        //                         <div className="dropdown dropdown-end">
        //                             <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
        //                                 <div tabIndex={0} role="button" className="avatar btn btn-ghost btn-circle">
        //                                     <div className="w-12 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
        //                                         <img src={user.photoURL} alt="User Avatar" className='object-center' referrerPolicy="no-referrer" />
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                             <ul
        //                                 tabIndex={0}
        //                                 className="mt-3 z-[1] p-2 border shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-64">

        //                                 <li><NavLink to="/dashboard" className="text-primary lg:text-lg font-bold">Dashboard</NavLink></li>
        //                                 <li>
        //                                     <button onClick={handleSignOut} className="btn btn-secondary text-white w-full mt-2">Logout</button>
        //                                 </li>

        //                             </ul>
        //                         </div>
        //                     ) : (
        //                         <>
        //                             <Link to="/login">
        //                                 <button className="btn btn-white text-primary font-bold transition-transform duration-300 hover:scale-110">Login</button>
        //                             </Link>
        //                             <Link to="/register">
        //                                 <button className="btn btn-white text-primary font-bold transition-transform duration-300 hover:scale-110">Register</button>
        //                             </Link>
        //                         </>
        //                     )
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className='sticky top-0 z-50 shadow-sm'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className="navbar bg-base-100 ">
                    <div className="flex-1">
                        <Link to='/' className='flex items-center gap-2'>
                            <img src='https://img.icons8.com/?size=100&id=26115&format=png&color=000000' className='w-10' />
                            <span className='text-xl hidden lg:block font-bold'>Blood-Bridge</span>
                        </Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1 space-x-2  items-center">
                            {links}
                            <div className="hidden lg:flex lg:justify-end lg:items-center space-x-2">
                                {user ? (
                                    <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                            <div tabIndex={0} role="button" className="avatar btn btn-ghost btn-circle">
                                                <div className="w-12 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                                                    <img src={user.photoURL} alt="User Avatar" className='object-center' referrerPolicy="no-referrer" />
                                                </div>
                                            </div>
                                        </div>
                                ) : (
                                    <>
                                        <Link to="/login">
                                            <button className="btn btn-white text-primary font-bold transition-transform duration-300 hover:scale-105">Login</button>
                                        </Link>
                                        <Link to="/register">
                                            <button className="btn btn-primary text-white font-bold transition-transform duration-300 hover:scale-105">Register</button>
                                        </Link>
                                    </>
                                )
                                }
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Header;