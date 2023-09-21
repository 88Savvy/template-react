import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h5 className="text-xl font-semibold text-gray-900">{post.title}</h5>
          <p className="text-base text-gray-500">{post.author.username}</p>
          <p className="text-base text-gray-700 mt-2">
            {post.content.substring(0, 300)}...
          </p>
          <Link to={`/posts/${post._id}`}>
            <button
              type="button"
              className="bg-black text-white py-2 px-4 mt-4 rounded-md hover:bg-papyrus transition duration-300 ease-in-out"
            >
              View Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
