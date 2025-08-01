import React, { useEffect } from 'react';
import useAxiosSecure from '../../Hooks/axiosSecure';
import Swal from 'sweetalert2';
import { MdOutlineDelete } from 'react-icons/md';
import UseRole from '../../Hooks/UseRole';
import { Link } from 'react-router';

const SinglePost = ({ post, posts, setPosts }) => {
    const axiosSecure = useAxiosSecure()
    const { role } = UseRole()
    const { _id, title, thumbnail, content, status } = post

    const handlePublish = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to publish this post.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Publish!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-blog-status/${id}`, { updatedStatus: 'publish' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Success!", "Post has been published.", "success");

                            setPosts(prevPosts =>
                                prevPosts.map(post =>
                                    post._id === id ? { ...post, status: 'publish' } : post
                                )
                            );

                        } else {
                            Swal.fire("No change", "User status was not modified.", "info");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire("Error", "Something went wrong.", "error");
                    });
            }
        });
    };
    const handleDraft = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to draft this post.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Draft!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-blog-status/${id}`, { updatedStatus: 'draft' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Success!", "Post has been drafted.", "success");

                            setPosts(prevPosts =>
                                prevPosts.map(post =>
                                    post._id === id ? { ...post, status: 'draft' } : post
                                )
                            );
                        } else {
                            Swal.fire("No change", "User status was not modified.", "info");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire("Error", "Something went wrong.", "error");
                    });
            }
        });
    };

    const handleDeletePost = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-post/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Post has been deleted.",
                                icon: "success"
                            });
                        }
                        const remainingPosts = posts.filter(myPost => myPost._id !== _id)
                        setPosts(remainingPosts)

                    })
                    .catch((error) => {
                        Swal.fire("Error", error.message, "error");
                    });
            }
        });
    };

    return (
        <div>
            <div className="card bg-base-100 min-h-[200px] shadow-sm">
                <figure>
                    <img
                        src={thumbnail}
                        alt="" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Post Title: {title}</h2>
                    <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
                    <div className="card-actions justify-end">
                        {
                            role === 'admin' ? <>
                                {
                                    status === 'draft' ?
                                        <button onClick={() => handlePublish(_id)} className="btn btn-secondary">Publish</button> :
                                        <button onClick={() => handleDraft(_id)} className="btn btn-secondary">Draft</button>
                                }
                                <button onClick={() => handleDeletePost(_id)} className='btn btn-primary'>
                                    <MdOutlineDelete size={20} />
                                </button>
                            </> : <>
                            <Link to={`all-blogs/${_id}`}><button className='btn btn-primary'>View</button></Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;