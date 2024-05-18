import { useState } from "react";

const Signup = () => {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[displayName, setDisplayName] = useState('')
    const[thumbnail, setThumbnail] = useState(null)

    //allowed file types
    const types = ['image/png', 'image/jpeg']
    const [fileError, setFileError] = useState(null)

    const handleFileChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0];
        console.log(selected);
        if (selected && types.includes(selected.type)) {
            if(selected.size > 200000){
                setFileError('Image file size must be less than 200kb');
                return
            }
            setThumbnail(selected);
            setFileError(null);
            console.log('thumbnail updated');
        } else {
            setThumbnail(null);
            setFileError('Please select an image file (png or jpeg)');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email,password,displayName,thumbnail)
    }

    return ( <>
    <form className=" max-w-[400px] my-16 mx-auto p-10 border border-gray-300 shadow-md bg-white" onSubmit={handleSubmit}>
        <h2 className=" font-bold">Sign up</h2>
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
            {fileError && <div className="error">
                {fileError}
            </div>}
        </label>
        <button className="btn">Sign up</button>
    </form>
    </> );
}
 
export default Signup;