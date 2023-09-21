import { Link } from "react-router-dom";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export default function UserPostsCard({ post, user }) {
  return (
    <div className="bg-white px-4 py-5 sm:px-6 mb-6">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 object-cover rounded-full border-black"
            src={user.profilePicture}
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            {post.author.username}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {/* Format your date here, e.g., post.createdAt */}
            {formatDate(post.createdAt)} - {post.category.join(", ")}
          </p>
          <p className="text-sm font-semibold text-gray-900">{post.title}</p>
          <p className="text-sm text-gray-700 mt-2">
            {truncateText(post.content, 300)}
          </p>
          <Link to={`/posts/${post._id}`}>
            <button
              type="button"
              className="bg-black text-white px-4 py-2 mt-3 rounded-md hover:bg-papyrus transition duration-300 ease-in-out"
            >
              View Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
