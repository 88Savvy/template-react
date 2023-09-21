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
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={user.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Followed Categories:</label>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                name="category"
                value={category}
                checked={user.followedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
}

export default ProfileSettingsPage;
