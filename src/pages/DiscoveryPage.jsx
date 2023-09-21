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
    <div>
      <div className="mx-auto max-w-2xl lg:text-center mt-12 mb-12">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Discover the Features of Papyrus
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post) => (
            <div key={post._id} className="col-span-1">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoveryPage;
