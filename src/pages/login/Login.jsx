import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isPending, error} =useLogin()



    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    };

    

    return ( <>
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
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
    </> );
}
 
export default Login;