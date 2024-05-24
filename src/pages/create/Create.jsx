import { useEffect, useState } from "react"
import Select from 'react-select'
import { useNavigate } from "react-router-dom"

import { useAuthContext } from '../../hooks/useAuthContext'
// import { useFirestore } from "../../hooks/useFirestore"
import useCollection from "../../hooks/useCollection"

import { db } from '../../firebase/config'
import { Timestamp , addDoc, collection } from 'firebase/firestore'


const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
];

const Create = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState(null)
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const { documents: userDocuments, error: userError } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()


  

  useEffect(() => {
    if (userDocuments) {
      setUsers(userDocuments.map(user => {
        return { value: { ...user, id: user.id }, label: user.displayName };
      }));
    }
  }, [userDocuments]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    setIsPending(true)
    if (!name || !details || !dueDate || !category || assignedUsers.length < 1) {
      setFormError('Please fill out all fields and assign the project to at least one user.');
      setIsPending(false)
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
        id: u.value.id
      };
    });


    try {

      if (assignedUsersList.length === 0) {
        throw new Error('Please assign the project to at least one user.');
      }
      
      await addDoc(collection(db, 'projects'), {
        name: name || '',
        details: details || '',
        createdBy,
        assignedUsersList,
        category: category?.value || '',
        dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : '',
        comments: ['No comments']
      });
      console.log('project added');
      navigate('/');
    } catch (error) {
      console.error('Error adding document: ', error);
      setFormError(error.message);
    } finally {
      setIsPending(false);
    }

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
        {isPending ? <button className="btn">Adding...</button> : <button className="btn">Add Project</button>}
        {formError && <p className="error">{formError}</p>}
        {userError && <p className="error">{userError}</p>}
      </form>
    </div>
  );
};

export default Create;
