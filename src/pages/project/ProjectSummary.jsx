import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { db } from "../../firebase/config";
import Avatar from "../../components/Avatar";

const ProjectSummary = ({ project }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    const projectRef = doc(db, "projects", project.id);

    try {
      await deleteDoc(projectRef);
      navigate('/');
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  };

  return (
    <div className="rounded">
      <div className="bg-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
        <p className="text-sm text-gray-500 mb-2">
          Project due by {new Date(project.dueDate?.toDate()).toDateString()}
        </p>
        <p className="text-base text-gray-700 mb-4">
          {project.details}
        </p>
        <h4 className="text-base text-gray-500 font-semibold mb-2">Project assigned to:</h4>
        <div className="flex items-center">
          {project.assignedUsersList.map(user => (
            <div key={user.id} className="mr-2">
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button onClick={handleClick} className="btn mt-4">Mark as Complete</button>
      )}
    </div>
  );
};

export default ProjectSummary;
