import React, { useEffect, useState, useMemo } from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import SingleBlog from './SingleBlog';
import Loader from '../../Components/Loader/Loader';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();

    // Fetch blogs once
    useEffect(() => {
        axiosPublic.get('/all-blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, [axiosPublic]);

    // Strip HTML from content for search
    const stripHTML = (html) => html ? html.replace(/<[^>]+>/g, ' ') : '';

    // Filtered blogs memoized to prevent unnecessary re-renders
    const filteredBlogs = useMemo(() => {
        const lowerSearch = search.toLowerCase();
        return blogs.filter(blog => 
            blog.title.toLowerCase().includes(lowerSearch) ||
            stripHTML(blog.content).toLowerCase().includes(lowerSearch)
        );
    }, [search, blogs]);

    if (loading) return <Loader />;

    return (
        <div className='min-h-screen my-10'>
            {/* Page Title */}
            <div className="my-10 text-center">
                <h2 className="text-3xl font-bold text-primary">The Blood Bridge Blog</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    Insights and stories from our community
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="input input-bordered w-full rounded-full px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-0">
                {filteredBlogs.length === 0 ? (
                    <p className="text-center col-span-3 text-gray-600 text-lg">
                        No matching blog posts found.
                    </p>
                ) : (
                    filteredBlogs.map(blog => (
                        <SingleBlog key={blog._id} blog={blog} />
                    ))
                )}
            </div>
        </div>
    );
};

export default AllBlogs;
