import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

function NewPostPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "", // Set a default category here if needed
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
  
    try {
      const response = await api.post(
        "/post/create",
        form, // Just pass the entire form object
      );
  
      // Assuming your backend sends back the created post data
      const createdPost = response.data;
  
      // Redirect to the newly created post or wherever you want
      navigate(`/posts/${createdPost._id}`);
    } catch (error) {
      console.error(error);
      alert("Error creating post. Please try again later.");
    }
  }
  
  

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default NewPostPage;
