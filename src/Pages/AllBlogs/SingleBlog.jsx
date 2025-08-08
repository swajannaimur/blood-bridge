import React from 'react';
import { Link } from 'react-router';

const SingleBlog = ({ blog }) => {
    const { _id, thumbnail, title, content } = blog

    return (
        <div>
            <div className="card bg-base-100 min-h-[200px] shadow-sm">
                <figure>
                    <img
                        src={thumbnail}
                        alt="" className='w-full h-60 object-cover rounded-t-xl' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Post Title: {title}</h2>
                    <div className="text-lg leading-relaxed line-clamp-3">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                    <div className="card-actions justify-end">
                        <Link to={`/all-blogs/${_id}`}><button className='btn btn-secondary'>View Full Post</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;