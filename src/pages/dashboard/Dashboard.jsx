import { useState } from 'react';

import ProjectList from '../../components/ProjectList';
import useCollection from '../../hooks/useCollection';
import ProjectFilter from './ProjectFilter';

import {useAuthContext} from '../../hooks/useAuthContext'

const Dashboard = () => {
    const { user } = useAuthContext();
    const { documents, error } = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState('all');

    const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
    };

    const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
            case 'all':
                return true;
            case 'mine':
                return document.assignedUsersList.some((u) => u.id === user.uid);
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                return document.category === currentFilter;
            default:
                return true;
        }
        })
    : [];

    return (
        <>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                {error && <p className="error">{error}</p>}
                {documents && (
                <>
                    <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />
                    <ProjectList projects={projects} />
                </>
                )}
            </div>
        </>
    );
}

export default Dashboard;
