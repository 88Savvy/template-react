import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../axios/api";

function ViewPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { userId } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // Track new comment text

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

  // Function to fetch post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(
          `https://papyrus-server.cyclic.app/post/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();
  }, [postId]);

  // Function to fetch comments data
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get(
          `https://papyrus-server.cyclic.app/comment/post/comments-thread/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // Function to handle post deletion
  const handleDelete = async () => {
    try {
      await api.delete(
        `https://papyrus-server.cyclic.app/post/delete/${postId}`
      );
      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      console.error(error);
      alert("Error deleting post. Please try again later.");
    }
  };

  // Function to handle comment creation
  const handleCommentCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `https://papyrus-server.cyclic.app/comment/create`,
        {
          postReference: postId,
          content: newComment,
        }
      );
      setComments([...comments, response.data]);
      setNewComment(""); // Clear the comment input
    } catch (error) {
      console.error(error);
      alert("Error creating comment. Please try again later.");
    }
  };

  // Function to handle comment deletion
  const handleCommentDelete = async (commentId) => {
    try {
      // Make an API request to delete the comment
      await api.delete(
        `https://papyrus-server.cyclic.app/comment/delete/${commentId}`
      );

      // Update the comments state to remove the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error);
      alert("Error deleting comment. Please try again later.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <h1 className="text-lg font-semibold text-gray-900 mt-8">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{post.author.username}</p>
      <p className="text-sm text-gray-500">Category: {post.category}</p>
      <p className="text-sm text-gray-500 mb-4">
        {/* Format your date here, e.g., post.createdAt */}
        {formatDate(post.createdAt)}
      </p>
      <p className="text-lg text-gray-900 mb-4">{post.content}</p>
      <div className="mb-20">
        {/* Show Edit and Delete Buttons Condition */}

        {userId === post.author._id && (
          <div className="mb-4">
            <Link to={`/posts/edit/${postId}`}>
              <button className="bg-papyrus text-white px-4 py-2 mt-3 rounded-md hover:bg-black transition duration-300 ease-in-out mr-4">
                {" "}
                Edit Post
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Comments
        </h3>
      </div>

      {/* Render Comment Data */}
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <form onSubmit={handleCommentCreate} className="relative mb-8">
            <div className="relative mb-8">
              <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-papyrus">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  rows={8}
                  className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Add your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pr-2">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </form>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id} className="text-sm text-gray-500">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {comment.userReference.username}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                <p className="prose prose-sm mt-2 mb-2 max-w-none text-gray-500">
                  {comment.content}
                </p>
                {userId === comment.userReference._id && (
                  <button
                    onClick={() => handleCommentDelete(comment._id)}
                    className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md hover:bg-red-400 transition duration-300 ease-in-out"
                  >
                    Delete Comment
                  </button>
                )}
                <div className="border-t border-gray-200 py-2 mt-8"></div>{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewPostPage;
