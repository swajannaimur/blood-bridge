import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import { useParams } from 'react-router';

const BlogsDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const [blog, setBlog] = useState('')
    useEffect(() => {
        axiosPublic.get(`all-blogs/${id}`)
            .then(res => {
                setBlog(res.data)
            }).catch(error => {
                console.log(error);

            })
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-primary mb-4">{blog.title}</h1>
            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-auto rounded-lg mb-6"
                />
            )}
            <div
                className="prose lg:prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </div>
    )
};


export default BlogsDetails;