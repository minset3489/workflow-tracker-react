import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";

const ProjectComments = ({ project }) => {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: serverTimestamp(),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4 className="text-lg font-semibold">Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id} className="p-4 rounded border shadow-md">
              <div className="flex items-center mb-2">
                <Avatar src={comment.photoURL} />
                <p className="text-sm font-medium">{comment.displayName}</p>
              </div>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt?.toDate()).toLocaleString()}
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
    </div>
  );
}


export default ProjectComments