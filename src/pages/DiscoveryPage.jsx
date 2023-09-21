import React, { useState, useEffect } from "react";
import api from "../axios/api";
import PostCard from "../components/PostCard.jsx";

function DiscoveryPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get(
          "https://papyrus-server.cyclic.app/post/all"
        );
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <div key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default DiscoveryPage;
