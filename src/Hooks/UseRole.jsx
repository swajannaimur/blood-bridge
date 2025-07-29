import { useEffect, useState } from "react";
import useAxiosSecure from "./axiosSecure";


export default function UseRole() {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure("/get-user-role").then((res) => {
            setRole(res.data.role);
            setLoading(false);
        });
    });
    return { role, loading };
}