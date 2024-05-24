import useCollection from '../hooks/useCollection';
import Avatar from './Avatar';

const OnlineUsers = () => {
  const { documents, error } = useCollection('users');

  return (<> 
    <div className="w-64 min-w-64 bg-gray-50 box-border text-heading">
        <div className="w-64">
            <div className="text-right py-10 px-3 border-b border-solid border-gray-300 text-xl">
                <h2>All Users</h2>
            </div>
                {error && <div className='error'>{error}</div>}

                {documents && documents.map(user => (
                    <div key={user.id} className='flex justify-end items-center my-5 pr-3 mx-auto'>
                        {user.online ? <span className=' inline-block mr-3 w-3 h-3 bg-green-500 rounded-full '></span> : <span className=' inline-block mr-3 w-3 h-3 bg-red-500 rounded-full '></span>}
                        <span className='mr-3'>{user.displayName}</span>
                        <Avatar src={user.photoURL} />
                    </div>
                ))}
        </div>
    </div>
    </>
  );
};

export default OnlineUsers;
