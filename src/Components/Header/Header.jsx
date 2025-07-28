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

    return (
        <div className='shadow-sm'>
            <div className="navbar max-w-11/12 mx-auto py-4">
                <div className="flex-1">
                    <NavLink to='/'>
                        <img src='https://img.icons8.com/?size=100&id=vurh7-um5eMM&format=png&color=e63946' className='h-12 w-auto' />
                    </NavLink>
                </div>
                <div className="">
                    {
                        user ? (
                            <div className="dropdown dropdown-end">
                                <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                    <div tabIndex={0} role="button" className="avatar btn btn-ghost btn-circle">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user.photoURL} alt="User Avatar" className='object-center' referrerPolicy="no-referrer" />
                                        </div>
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-[1] p-2 border shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                                    <li>
                                        <button onClick={handleSignOut} className="btn btn-secondary text-white w-full mt-2">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="btn btn-primary font-bold mx-4">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-secondary font-bold">Register</button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;