import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Components/Contexts/AuthContext';
import useAxiosSecure from '../Hooks/axiosSecure';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/all-users').then((res) => setUsers(res.data))
    }, [axiosSecure])

    return (
        <div>
            {/* {
                users.map(user=>
                    <div><h2>{user.name}</h2></div>
                )
            } */}
        </div>
    );
};

export default AdminDashboard;