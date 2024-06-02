import React, { useEffect, useState } from "react";
import { PieceType } from "../Piece";
import axios from "axios";
import { useParams } from "react-router-dom";
import FormSec from "../../cars/components/FormSec";
import ImageForm from "../../cars/components/ImageForm";
import toast from "react-hot-toast";
import { uploadImages } from "../../../config/firebase/Upload_Images";
import DelButt from "../../../utils/DelButt";
import { FaArrowRight } from "react-icons/fa";

const EditPiece = () => {
  const { id } = useParams();
  const [Piece, setPiece] = useState<PieceType>({
    _id: "",
    Name: "",
    Description: "",
    Price: 0,
    Quantity: 0,
    Image: [{ color: "", images: [""] }],
    IsPromo: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const [pieceWithout, setPieceWithout] = useState({
    Name: "",
    Description: "",
    Price: 0,
    Quantity: 0,

    IsPromo: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [track, setTrack] = useState(0);
  useEffect(() => {
    if (track === 0) {
      setTrack(1);
    }
  }, [track]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setImages(Piece.Image[0].images);
  }, [track, Piece]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        import.meta.env.VITE_Main_ENDPOINT + "piece/" + id
      );
      setPiece(response.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    setTrack(1);
    setPieceWithout({
      Name: Piece.Name,
      Description: Piece.Description,
      Price: Piece.Price,
      Quantity: Piece.Quantity,
      IsPromo: Piece.IsPromo,
    });

    setOriginalImages(Piece.Image[0].images);
  }, [Piece]);
  useEffect(() => {

  }, [images]);
  if (loading) {
    return <div>Loading...</div>;
  }
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();

      const final: string[] = [];
      if (images.length > 0 && originalImages !== images) {

      Array.from(await uploadImages(images)).map((e) => {
        final.push(e);
      });
      }
      if (originalImages.length > 0) {
        Array.from(originalImages).map((e) => {
          final.push(e);
        });
      }
    axios
      .put(
        import.meta.env.VITE_Main_ENDPOINT + "piece/" + id,
        { ...pieceWithout, Image: [{color:"black",images:final}] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Piece updated");
        setTimeout(() => {
          window.location.href = "/pieces";
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
  }

  return (
    <form onSubmit={submit}>
      <FormSec
        data={pieceWithout}
        readonly={false}
        setData={setPieceWithout}
        title={"piece"}
      />
      <div>
        {" "}
        <div className="w-full pl-[20px]">
          <ImageForm Images={images} setImages={setImages} />
        </div>
      </div>
      <div className="flex items-end justify-center gap-[20px] col-span-2 my-[50px]">
        <DelButt
          id={id || ""}
          deleteRoute="faq"
          icon={false}
          back="faq"
          name="question"
        />
        <button
          type="submit"
          className="w-[140px] cursor-pointer bg-green-600 flex justify-center items-center h-[50px] text-white  gap-[10px] rounded-xl"
        >
          {" "}
          envoyer
          <FaArrowRight />
        </button>
      </div>
    </form>
  );
};

export default EditPiece;
