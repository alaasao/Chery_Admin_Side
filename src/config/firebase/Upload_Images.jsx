async function uploadImages(files) {
    if (!Array.isArray(files)) {
      files = [files];
    }
  
    const uploadPromises = files.map(file => {
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Handle the upload progress
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