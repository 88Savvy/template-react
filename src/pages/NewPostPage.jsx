import React, { useState } from "react";
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
        form // Just pass the entire form object
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
    <div className="mx-auto max-w-2xl px-4">
      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Please insert a title..."
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full mt-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Content
          </label>
          <div className="mt-2">
            <textarea
              rows={8}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              required
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Tell us what's on your mind and share with the world!
          </p>
        </div>

        <div className="sm:col-span-3 mt-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2"></div>
          <select
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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

        <div className="mt-6 flex items-center justify-end gap-x-6"></div>

        <button
          type="submit"
          className="rounded-md bg-papyrus px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default NewPostPage;
