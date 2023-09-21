import api from "../axios/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProfilePage() {
  const [user, setUser] = useState({});

  const id_user = localStorage.getItem("userId");

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);

  return (
    <div>
      <h1>PROFILE</h1>
      <h2>{user.username}</h2>
      <h1>{user.bio}</h1>
      <Link to="/new-post">
        <button
          style={{
            backgroundColor: "#DCBF85",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + New Post
        </button>
      </Link>
    </div>
  );
}

export default ProfilePage;
