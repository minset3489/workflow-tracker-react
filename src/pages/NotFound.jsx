import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="my-28 flex flex-col justify-center items-center ">
      <div className=" bg-white rounded-md text-center p-10">
      <h2 className="text-3xl font-bold mb-4">Sorry</h2>
      <p className="text-lg mb-8">That page cannot be found</p>
      <Link to="/" className="text-lg underline hover:text-gray-800">Back to the homepage...</Link>
      </div>
    </div>
  );
}
 
export default NotFound;