import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
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
     
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
    </> );
}
 
export default Login;