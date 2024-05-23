import { useEffect, useState } from "react";
import Select from 'react-select';

import useCollection from '../../hooks/useCollection';
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from '../../hooks/useAuthContext';




const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
];

const Create = () => {
    // Form field values
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState(null);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);

    const { documents, error } = useCollection('users');
    const [users, setUsers] = useState([]);

    const { user } = useAuthContext();

    // Create user values for react-select
    useEffect(() => {
        if (documents) {
            setUsers(documents.map(user => {
                return { value: { ...user, id: user.id }, label: user.displayName };
            }));
        }
    }, [documents]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(null);

        if (!name || !details || !dueDate || !category || assignedUsers.length < 1) {
            setFormError('Please fill out all fields and assign the project to at least one user.');
            return;
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        };

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.uid
            };
        });

        const project = {
            name,
            details,
            category: category.value,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsers: assignedUsersList
        };

        console.log(project);

       
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="font-bold">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Set Due Date:</span>
                    <input
                        type="date"
                        required
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project Category:</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <button className="btn">Add Project</button>
                {formError && <p className="error">{formError}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Create;
