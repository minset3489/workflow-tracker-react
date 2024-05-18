import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';


const useStorage = () => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const storage = getStorage();

  const uploadImage = (file, folderName) => {
    return new Promise((resolve, reject) => {
      setFilePath(`${folderName}/${file.name}`);

      const storageRef = ref(storage, `${folderName}/${file.name}`);
      const metadata = {
        contentType: file.type,
      };

      try {
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            console.error('Error during upload:', error.message);
            setError(error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              setUrl(downloadURL);
              resolve(downloadURL); // Resolve with download URL
            } catch (err) {
              console.error('Error getting download URL:', err.message);
              setError(err);
              reject(err);
            }
          }
        );
      } catch (err) {
        console.error('Error during upload:', err.message);
        setError(err);
        reject(err);
      }
    });
  };

  const deleteImage = async (path) => {
    const storageRef = ref(storage, path);

    try {
      await deleteObject(storageRef);
    } catch (err) {
      console.error('Error during deletion:', err.message);
      setError(err);
    }
  };

  return { uploadImage, deleteImage, url, filePath, error };
};

export default useStorage;
