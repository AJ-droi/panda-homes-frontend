/*eslint-disable */
import React from "react";
import Image from "next/image";

const TableHeader = ({ headertitle, ascending, descending }: any) => {
  return (
    <th
      className="text-left text-md leading-[145%] py-2 px-6 text-[#785DBA] font-normal"
      style={{ fontFamily: "Plus Jakarta Sans" }}
    >
      <div className="flex justify-between items-center">
        <span>{headertitle}</span>
        <div className="flex flex-col justify-between ml-2 space-y-2">
          <Image
            src="/ascending.svg"
            alt="Sort ascending"
            width={10}
            height={10}
            onClick={ascending}
            className="cursor-pointer"
          />
          <Image
            src="/descending.svg"
            alt="Sort descending"
            width={10}
            height={10}
            onClick={descending}
            className="cursor-pointer"
          />
        </div>
      </div>
    </th>
  );
};


export default TableHeader;
