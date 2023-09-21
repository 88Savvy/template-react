import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

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

function ProfileSettingsPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    bio: "",
    followedCategories: [],
  });

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = user.followedCategories.includes(category)
      ? user.followedCategories.filter((c) => c !== category)
      : [...user.followedCategories, category];

    setUser({ ...user, followedCategories: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/user/edit-profile", user);
      console.log(response.data);
      // Handle success and navigate to the user's profile page
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Error updating profile. Please try again later.");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await api.delete("/user/delete-profile");

      // After successful deletion, you can redirect the user to a different page or log them out
      // For example, log the user out and redirect to the login page
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error deleting profile. Please try again later.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username:
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name:
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  type="text"
                  id="username"
                  name="username"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              E-mail Address:
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  type="text"
                  id="username"
                  name="username"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full mt-6">
          <label
            htmlFor="bio"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Bio:
          </label>

          <div className="mt-2">
            <textarea
              rows={8}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="bio"
              name="bio"
              value={user.bio}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-span-full mt-6">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Followed Categories:
            </label>
          </div>

          {categories.map((category) => (
            <label key={category}>
              <div className="space-y-2">
                {" "}
                {/* Adjust this space-y value */}
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center mt-1">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      type="checkbox"
                      name="category"
                      value={category}
                      checked={user.followedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="ml-2">{category}</span>{" "}
                    {/* Add margin-left (ml) for space */}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-papyrus text-white px-4 py-2 mt-3 rounded-md hover:bg-black transition duration-300 ease-in-out mr-4"
        >
          Save Changes
        </button>
      </form>

      <button
        onClick={handleDeleteProfile}
        className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md"
      >
        Delete Profile
      </button>
    </div>
  );
}

export default ProfileSettingsPage;
