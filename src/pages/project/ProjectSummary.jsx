import Avatar from "../../components/Avatar";

// import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";

const ProjectSummary = ({ project }) => {

  const { user } = useAuthContext();

  const handleClick = () => {
    // deleteDocument(project.id);
    // history.push('/');
  };

  return (<>

    <div>
      <div className="bg-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">{project.name}</h2>

        <p className="text-sm text-gray-500 mb-2">
          Project due by {new Date(project.dueDate?.toDate()).toDateString()}
        </p>
        <p className="text-base text-gray-700 mb-4">
          {project.details}
        </p>


        <h4 className="text-base font-semibold mb-2">Project assigned to:</h4>

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

    </>
  );
}


export default ProjectSummary