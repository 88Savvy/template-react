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
    <div>
      <h1>{post.title}</h1>
      <p>Author: {post.author.username}</p>
      <p>Category: {post.category}</p>
      <p>{post.content}</p>
      <div>
        {/* Show Edit and Delete Buttons Condition */}
        {userId === post.author._id && (
          <div>
            <Link to={`/posts/edit/${postId}`}>
              <button> Edit Post</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>

      {/* Render Comment Data */}
      <div>
        <h2>Comments</h2>
        <form onSubmit={handleCommentCreate}>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.content}</p>
              <p>Author: {comment.userReference.username}</p>
              {userId === comment.userReference._id && (
                <button onClick={() => handleCommentDelete(comment._id)}>
                  Delete Comment
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewPostPage;
