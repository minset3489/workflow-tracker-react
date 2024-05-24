
const Avatar = ({ src }) => {
    return (
        <div className="inline-block w-12 h-12 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={src} alt="user avatar" />
        </div>
    );
}

export default Avatar;
