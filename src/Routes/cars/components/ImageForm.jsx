import React, { useEffect, useState } from "react";
import "./ImageForm.css";

const ImageForm = ({ Images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState();
  const [track,setTrack]=useState(0)
  useEffect(() => {
if (track===0){setTrack(1)}
  }, [Images])
  useEffect(() => {
    setSelectedImages(Images)
  }, [track])

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;

    setImages(Array.from(event.target.files));
    
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
    console.log("hh",selectedFilesArray);
  };

  function deleteHandler(image) {
    // console.log(selectedImages.findIndex(image))
    let a = 0;
    setSelectedImages(
      selectedImages.filter((e, index) => {
        if (e === image) {
          a = index;
        } else {
          return e;
        }
      }),
    );

    Images.splice(a, 1);
    setImages(Images);
    console.log(Images);
    URL.revokeObjectURL(image);
  }

  return (
    <section>
      <label>
        + Add Images
        <br />
       
        <input
          type="file"
          name="images"
          className="hidden"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

      <input type="file" multiple className="hidden" />

    

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image+index} className="image">
                <img src={image} className="h-[300px] w-[300px]" alt="upload" />
                <button onClick={() => deleteHandler(image)} className="">
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
  
        
      </div>
    </section>
  );
};

export default ImageForm;
