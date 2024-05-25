import { useState } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { db } from "../../firebase/config";
import Avatar from "../../components/Avatar";
import { formatDistanceToNow } from "date-fns";

const ProjectComments = ({ project }) => {
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error state

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    console.log(commentToAdd)

    const projectRef = doc(db, "projects", project.id);

    try {
      await updateDoc(projectRef, {
        comments: arrayUnion(commentToAdd),
      });
      setNewComment("");
    } catch (err) {
      console.log(err.message)
      setError("Could not add comment");
    }
  };

  return (
    <div >
      <h4 className="text-lg font-semibold">Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id} className="p-4 bg-white my-2 rounded border shadow-md">
              <div className="flex items-center mb-2">
                <Avatar src={comment.photoURL} />
                <p className="text-sm font-medium ml-2">{comment.displayName}</p>
              </div>
              <p className="text-xs text-gray-500">
                {comment.createdAt ? formatDistanceToNow(comment.createdAt.toDate(),{addSuffix:true}) : "Loading..."}
              </p>
              <p className="mt-2 text-sm">{comment.content}</p>
            </li>
          ))}
      </ul>

      <form className="add-comment mt-4" onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span>Add new comment:</span>
          <textarea
            className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button type="submit" className="btn mt-2">
          Add Comment
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default ProjectComments;
