import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import SingleBlog from './SingleBlog';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        axiosPublic.get('/all-blogs')
            .then(res => {
                setBlogs(res.data)
            }).catch(error => {
                console.log(error);

            })
    }, [])


    return (
        <div className='min-h-screen'>
            <div className="my-10 text-center">
                <h2 className="text-3xl font-bold text-primary">All Blog Articles</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    Explore insightful articles and stories shared by our community. These blogs cover topics related to blood donation, healthcare awareness, and inspiring real-life experiences.
                </p>
            </div>
            <div>
                <div className='grid grid-cols-2 gap-4 mt-10'>
                    {blogs.length === 0 ? <>
                        <p className="text-center col-span-2 text-gray-600 text-lg">
                            No Posts Have been found. Add a post first to control
                        </p>
                    </> : <>
                        {
                            blogs.map(blog => <SingleBlog key={blog._id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)
                        }
                    </>}
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;