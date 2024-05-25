import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Avatar from '../components/Avatar';

const  ProjectList =  ({ projects }) => {
  console.log(projects);

  return (
    <>
    <div className="project-list mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.length === 0 && <p className="text-center">No projects yet!</p>}
      {projects.map(project => (
        <NavLink to={`/project/${project.id}`} key={project.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
          <h4 className="text-lg font-semibold mb-2">{project.name}</h4>
          <p className="text-sm">Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to mt-4 pt-2 border-t border-gray-300">
            <p className="font-semibold">Assigned to:</p>
            <ul className="flex items-center mt-2">
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL} className="mr-2">
                  <Avatar src={user.photoURL} className="w-8 h-8" />
                </li>
              ))}
            </ul>
          </div>
        </NavLink>
      ))}
    </div>
    </>
  );
}


ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      // Add other required props if any
    })
  ).isRequired,
};

export default ProjectList;
