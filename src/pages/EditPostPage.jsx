import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/api";

function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
  });

  const categories = [
    "Culture",
    "Politics",
    "Technology",
    "Business",
    "Finance",
    "Food & Drink",
    "Sports",
    "Faith & Spirituality",
    "News",
    "Music",
    "Comics",
    "International",
    "Arts",
    "Climate & Environment",
    "Science",
    "Health & Wellness",
    "Literature",
    "Fiction",
    "Parenting",
    "Design",
    "Travel",
    "Education",
    "Philosophy",
    "History",
    "Humor",
    "Fashion & Beauty",
  ];

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(
          `https://papyrus-server.cyclic.app/post/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `https://papyrus-server.cyclic.app/post/edit/${postId}`,
        post,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the user's authentication token
          },
        }
      );

      // Assuming your backend sends back the updated post data
      const updatedPost = response.data;

      // Redirect to the view post page or wherever you want
      navigate(`/posts/${updatedPost._id}`);
    } catch (error) {
      console.error(error);
      alert("Error updating post. Please try again later.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            rows={8}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={post.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-papyrus text-white px-3 py-2 text-sm font-semibold rounded-md hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPostPage;
