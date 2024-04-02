
import React, { FC } from "react";
import { useEffect, Dispatch, SetStateAction } from "react";
import { userType } from "./Main";
import { CarsProps } from "../../cars/components/Main";
interface PaginationProps {
  article_per_page: number;
  arr: userType[]|CarsProps[] ;
  
  setShowList: Dispatch<SetStateAction<userType[]|CarsProps[] >>;
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

  const [filteredArr, setFilteredArr] = React.useState<userType[]|CarsProps[] >(arr);

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

      return e.Name.toLowerCase().includes(searchKey);
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
