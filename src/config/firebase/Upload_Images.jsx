import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config";
import { toastFNC } from "../toast";

export async function uploadImages(files) {
    const uploadPromises = files.map(async file => {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
            // Handle progress 
            console.log('uploading')
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  });

  return Promise.all(uploadPromises);
}
