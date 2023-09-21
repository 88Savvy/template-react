import api from "../axios/api";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UserPostsCard from "../components/UserPostCard.jsx";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [totalViews, setTotalViews] = useState(0);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get(
          "https://papyrus-server.cyclic.app/post/all"
        );
        // Filter the posts based on the author's ID
        const userPosts = response.data.filter(
          (post) => post.author._id === userId
        );
        const total = userPosts.reduce((acc, post) => acc + post.views, 0);
        setTotalViews(total);
        setUserPosts(userPosts);
        console.log(userPosts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, [userId]);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <header className="flex flex-wrap items-center p-4 md:py-8">
        <div className="md:w-3/12 md:ml-16">
          {/* Profile image */}
          <img
            className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-black p-1"
            src={user.profilePicture}
            alt="profile"
          />
        </div>

        {/* Profile meta */}
        <div className="w-8/12 md:w-7/12 ml-4">
          <div className="md:flex md:flex-wrap md:items-center mb-4">
            <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
              {user.username}
            </h2>

            {/* Follow button */}
          </div>

          {/* Post, following, followers list for medium screens */}

          <ul className="hidden md:flex space-x-8 mb-4">
            {user.posts && (
              <li className="mr-4">
                {/* Add margin to the left of the li element */}
                <span className="font-semibold mr-1">
                  {user.posts.length > 0 ? user.posts.length : "0"}
                </span>
                {user.posts.length === 1 ? "post" : "posts"}
              </li>
            )}
            {/* Display the total views */}
            <li className="mr-4">
              <span className="font-semibold mr-1">
                {totalViews === 0 ? "0" : totalViews}
              </span>
              {totalViews === 1 ? "posts views" : "posts views"}
            </li>
          </ul>

          <div className="hidden md:block mb-4">
            <h1 className="font-semibold">{user.fullName}</h1>
            <span>{user.bio}</span>
            <p>{user.description}</p>
          </div>

          <Link to="/new-post">
            <button className="bg-papyrus text-white py-2 px-4 rounded-lg cursor-pointer">
              + New Post
            </button>
          </Link>
        </div>
      </header>

      <main>
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Recent Posts
          </h3>
        </div>
        <div className="recent-posts">
          {userPosts.map((post) => (
            <UserPostsCard
              key={post._id} // Make sure to provide a unique key for each card
              post={post} // Pass the entire post object as a prop
              user={user} // Pass the user object as a prop
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
