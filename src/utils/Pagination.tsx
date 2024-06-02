import React, { FC } from "react";
import { useEffect, Dispatch, SetStateAction } from "react";

import { CarsProps } from "../Routes/cars/Cars";
import { EventType } from "../Routes/events/Events";
import { FaqType } from "../Routes/faq/Faq";
import { RdvType } from "../Routes/Rdv/Rdv";
import { userType } from "../Routes/clients/components/AddClient";
import { PieceType } from "../Routes/piece/Piece";
interface PaginationProps {
  article_per_page: number;
  arr: (userType | CarsProps | EventType | FaqType | RdvType | PieceType)[];

  setShowList: Dispatch<
    SetStateAction<
      (userType | CarsProps | EventType | FaqType | RdvType | PieceType)[]
    >
  >;
  searchKey: string;
}

const Pagination: FC<PaginationProps> = ({
  article_per_page,
  arr,

  searchKey,
  setShowList,
}: PaginationProps) => {
  const [startIndex, setStartIndex] = React.useState(0); //ift needs to be fetched from api
  const [endIndex, setEndIndex] = React.useState(
    Math.min(article_per_page, arr.length)
  ); //ift needs to be fetched from api

  const [pages, SetPages] = React.useState(
    Array.from(Array(Math.ceil(arr.length / article_per_page)).keys())
  );

  const [filteredArr, setFilteredArr] =
    React.useState<
      (userType | CarsProps | EventType | FaqType | RdvType | PieceType)[]
    >(arr);

  useEffect(() => {
    const totalPages = Math.ceil(filteredArr.length / article_per_page);
    const newPages = Array.from(Array(totalPages).keys());
    SetPages(newPages);
    setStartIndex(0);
    setEndIndex(Math.min(article_per_page, filteredArr.length));
  }, [filteredArr, article_per_page]);

  useEffect(() => {
    setShowList(filteredArr.slice(startIndex, endIndex));
  }, [startIndex, endIndex, filteredArr, setShowList]);

  useEffect(() => {
    const filteredData = arr.filter((e) => {
      if ("Etat" in e) {
        return e.Name.toLowerCase().includes(searchKey);
      } else if ("Quantity" in e) {
        return e.Name.toLowerCase().includes(searchKey);
      } else if ("Name" in e) {
        return e.Name.toLowerCase().includes(searchKey);
      } else if ("Modele" in e) {
        return e.Modele.toLowerCase().includes(searchKey);
      } else if ("Title" in e) {
        return e.Title.toLowerCase().includes(searchKey);
      } else if ("Question" in e) {
        return e.Question.toLowerCase().includes(searchKey);
      }
    });
    setFilteredArr(filteredData);
  }, [searchKey, arr]);
  return (
    <div className="flex gap-[24px] font-[Manrope] cursor-pointer mt-[0px] ">
      {startIndex > 0 && (
        <button
          className="text-[#9F9F9F] font-semibold  text-[15px] font-[Manrope]"
          onClick={() => {
            setStartIndex((prev) => (prev > 0 ? prev - article_per_page : 0));
            setEndIndex((prev) =>
              prev > article_per_page - 1
                ? prev - article_per_page
                : article_per_page - 1
            );
          }}
        >
          Previous page
        </button>
      )}
      <div className="flex gap-[8px]">
        {" "}
        {pages.length > 1 &&
          pages.map((page, index) => (
            <div
              key={index}
              className={`w-[28px] h-[28px] rounded-[50%] flex justify-center items-center text-[15px] ${
                startIndex / article_per_page === page
                  ? "  bg-[#D12621]    text-white"
                  : "bg-white text-[#D12621] border-[1px] border-[#D12621]"
              }`}
              onClick={() => {
                setStartIndex(page * article_per_page);
                setEndIndex((page + 1) * article_per_page);
              }}
            >
              {page + 1}
            </div>
          ))}
      </div>
      {endIndex < arr.length && endIndex != 0 && (
        <button
          className="text-[#9F9F9F] font-semibold text-[15px] "
          onClick={() => {
            setStartIndex((prev) =>
              prev < arr.length - article_per_page - 1
                ? prev + article_per_page
                : arr.length - article_per_page
            );
            setEndIndex((prev) =>
              prev < arr.length ? prev + article_per_page : arr.length
            );
          }}
        >
          Next page
        </button>
      )}
    </div>
  );
};

export default Pagination;
