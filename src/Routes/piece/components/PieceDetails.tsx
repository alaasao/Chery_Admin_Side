import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PieceType } from "../Piece";
import axios from "axios";
import FormSec from "../../cars/components/FormSec";
import DelButt from "../../../utils/DelButt";
import EditButt from "../../../utils/EditButt";

const PieceDetails = () => {
  const { id } = useParams();
  const [Piece, setPiece] = useState<PieceType>({ _id: "", Name: "", Description: "", Price: 0, Quantity: 0, Image: [{color:"",images:[""]}], IsPromo: false, createdAt: "", updatedAt: "", __v: 0});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FormSec
        data={{
          Name: Piece?.Name,
          Description: Piece?.Description,
          Quantity: Piece?.Quantity,
          Price: Piece?.Price,
          Promo: Piece?.IsPromo,
        }}
        readonly={true}
        setData={()=> null}
        title={"piece"}
          />
             <div>
            {Piece?.Image.map((obj) => {
              return (
                <div key={obj.color}>
                
                  <div className="flex flex-wrap items-center justify-center gap-[20px] mb-[20px]">
                    {" "}
                    {obj.images.map((image) => {
                      return (
                          <img
                              key={image}
                          src={image}
                          alt=""
                          className="h-[200px] w-[200px]"
                        />
                      );
                    })}
                  </div>
                </div>
              )
            })}
          </div>
               
        <div className="flex justify-center w-full my-[50px] gap-[20px] col-span-2 ">
              <DelButt
                  id={id || ""} deleteRoute="piece" icon={false} back="/produits/piece" name="piece" />
   
        <EditButt id={id || ""} editRoute="/produits/pieces/editpiece" />
        
    </div>
    </div>
  );
};

export default PieceDetails;
