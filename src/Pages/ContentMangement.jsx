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

            <div className='grid grid-cols-2 gap-4 mt-10'>
                {
                    posts.map(post => <SinglePost post={post} posts={posts} setPosts={setPosts}/>)
                }
            </div>
        </div>
    );
};

export default ContentMangement;