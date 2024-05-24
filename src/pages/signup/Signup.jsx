import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [fileError, setFileError] = useState(null);

  const { signup, isPending, error } = useSignup();

  const types = ['image/png', 'image/jpeg'];

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      if (selected.size > 2000000) {
        setFileError('Image file size must be less than 200kb');
        return;
      }
      setThumbnail(selected);
      setFileError(null);
    } else {
      setThumbnail(null);
      setFileError('Please select an image file (png or jpeg)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <form className="max-w-[400px] my-16 mx-auto p-10 border border-gray-300 shadow-md bg-white" onSubmit={handleSubmit}>
      <h2 className="font-bold">Sign up</h2>
      <label>
        <span>Email :</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password :</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display Name :</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Thumbnail :</span>
        <input
          required
          type="file"
          onChange={handleFileChange}
        />
        {fileError && <div className="error">{fileError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;