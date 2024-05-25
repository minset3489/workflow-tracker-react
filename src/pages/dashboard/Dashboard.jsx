import ProjectList from '../../components/ProjectList';
import useCollection from '../../hooks/useCollection';

const Dashboard = () => {
    const { documents, error } = useCollection('projects');

    return (
        <>
            <div>
                <h2>Dashboard</h2>
                {error && <p className='error'>{error}</p>}
                {documents && <ProjectList projects={documents} />}
            </div>
        </>
    );
}

export default Dashboard;
