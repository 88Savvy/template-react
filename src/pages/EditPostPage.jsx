import React, { useState, useEffect } from "react";
import axios from "axios";
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
        const response = await axios.get(
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
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={post.category}
            onChange={handleChange}
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
        <button
          type="submit"
          style={{
            backgroundColor: "#DCBF85",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
