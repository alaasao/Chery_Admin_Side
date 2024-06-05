import React, { useState } from "react";
import FormSec from "../../cars/components/FormSec";

import { FaArrowRight } from "react-icons/fa";
import ImageForm from "../../cars/components/ImageForm";
import { uploadImages } from "../../../config/firebase/Upload_Images";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../utils/Loading";

const AddPiece = () => {
  const [piece, setPiece] = useState({
    Name: "",
    Description: "",
    Price: 0,
    Quantity: 0,

    IsPromo: false,
  });
  const [loading, setLoading] = useState(false);
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const finalImages = images.length > 0 ? await uploadImages(images) : null;


    if (piece.Name === "") {
      toast.error("Veuillez ajouter le nom");
      return;
    }
    if (piece.Description === "") {
      toast.error("Veuillez ajouter la description");
      return;
    }
    if (piece.Price === 0) {
      toast.error("Veuillez ajouter le prix");
      return;
    }
    if (piece.Quantity === 0) {
      toast.error("Veuillez ajouter la quantité");
      return;
    }
    if (images.length === 0) {
      toast.error("Veuillez ajouté au moins une image")
      return
    }
  
    setLoading(true);
    axios
      .post(
        import.meta.env.VITE_Main_ENDPOINT + "piece",
        { ...piece, Image: { color: "black", images: finalImages } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Piece ajouté");
        setTimeout(() => {
          window.location.href = "/produits/pieces";
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
        setLoading(false)
      });
  }

  const [images, setImages] = useState([]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {" "}
      <form onSubmit={submit}>
        <FormSec
          data={piece}
          setData={setPiece}
          readonly={false}
          title="piece"
        />
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold max-md:text-xl">white Images</div>
          <ImageForm Images={images} setImages={setImages} />
        </div>
        <div className="flex items-center justify-center col-span-2">
          {" "}
          <button
            type="submit"
            className="w-[180px]  cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
          >
            {" "}
            envoyer
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPiece;
