import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/axiosSecure';
import Swal from 'sweetalert2';

const AddBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const axiosSecure = useAxiosSecure()

    const handleAddBlog = e => {
        e.preventDefault()

        const form = e.target
        const title = form.title.value
        const thumbnail = form.thumbnail.value

        const blogData = {
            title,
            thumbnail,
            content,
            status: 'draft'
        }

        axiosSecure.post('/add-blog', blogData)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Great!",
                        text: "Post Added Successfully",
                        icon: "success"
                    });
                }
                form.reset();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className='text-center'>
                <h1 className="text-2xl md:text-3xl  font-bold text-gray-800">
                    📝 Add a New <span className="text-primary">Blog Post</span>
                </h1>
                <p className="text-gray-600 mt-2"> Fill in the blog details below to share insights, stories, or updates with your readers!</p>
            </div>

            <div className='mt-10'>
                <form onSubmit={handleAddBlog}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <fieldset>
                            <legend className="text-sm font-bold text-secondary mb-1">Title</legend>
                            <input
                                type="text"
                                name="title"
                                className="input w-full border-primary border-2"
                                placeholder='Title of your blog'
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <legend className="text-sm font-bold text-secondary mb-1">Requester Name</legend>
                            <input type="text" name="thumbnail" className="input input-bordered w-full" placeholder="Enter your photo URL" required />
                        </fieldset>

                        <fieldset className="col-span-1 md:col-span-2">
                            <legend className="text-sm font-bold text-secondary mb-1">Content</legend>
                            <div className="border border-primary rounded-md overflow-hidden shadow-sm">
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    tabIndex={1}
                                    onBlur={(newContent) => setContent(newContent)}
                                />
                            </div>
                        </fieldset>


                    </div>
                    <button className="btn btn-primary mt-6 w-full text-lg font-bold">Create Post</button>

                </form>
            </div>

        </div>
    );
};

export default AddBlog;