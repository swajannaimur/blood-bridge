import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../Hooks/axiosSecure';
import SinglePost from '../Components/SinglePost/SinglePost';

const ContentMangement = () => {
    const [posts, setPosts] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/all-posts')
            .then(res => {
                setPosts(res.data)
            }).catch(error => {
                console.log(error);
            })
    }, [axiosSecure])

    return (
        <div>
            <div className='flex justify-end'>
                <Link to='/dashboard/content-management/add-blog'> <button className='btn btn-primary'>Add Blog</button></Link>
            </div>
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-primary">Content Management</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    Manage all the blog posts from this section. You can view, update, or delete posts to ensure the platform’s content remains relevant and helpful for users.
                </p>
            </div>

            <div className='grid grid-cols-2 gap-4 mt-10'>
                {posts.length === 0 ?
                    <>
                        <p className="text-center col-span-2 text-gray-600 text-lg">
                            No Posts Have been found. Add a post first to control
                        </p>
                    </> : <>
                        {
                            posts.map(post => <SinglePost post={post} posts={posts} setPosts={setPosts} />)
                        }
                    </>}
            </div>
        </div>
    );
};

export default ContentMangement;