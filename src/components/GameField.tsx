import React from "react";

const GameField: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[356px] h-[356px] grid grid-cols-3 gap-2 mt-5">
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
          <div className="bg-gray-200 h-[112px]"></div>
        </div>
      </div>
    </>
  );
};

export default GameField;
