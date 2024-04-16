import React, { useState } from "react";
import "./ImageForm.css";

const ImageForm = ({ Images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);

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
    console.log(selectedFilesArray);
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
      })
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
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

      <input type="file" multiple />

      {/* {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))} */}

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} className="h-[300px] w-[300px]" alt="upload" />
                <button onClick={() => deleteHandler(image)}>
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
