import React from "react";
import { Link } from "react-router";

const SingleBlog = ({ blog }) => {
  const { _id, thumbnail, title, content } = blog;

  return (
    <div className="group">
      <div className="bg-white h-[500px] rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">

        {/* Image */}
        <figure className="overflow-hidden">
          <img
            src={thumbnail}
            alt=""
            className="w-full h-60 object-cover rounded-t-2xl transition-all duration-300 group-hover:scale-105"
          />
        </figure>

        {/* Body */}
        <div className="p-5 flex flex-col gap-3">

          <h2 className="text-xl font-bold text-gray-800 leading-snug">
            {title}
          </h2>

          <div className="text-gray-600 text-base leading-relaxed line-clamp-3">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <Link to={`/all-blogs/${_id}`}>
              <button className="btn btn-primary px-5 font-semibold rounded-lg transition-all duration-300 hover:shadow-md">
                Read More
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
