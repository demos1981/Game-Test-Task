import React from "react";

const GameField: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="w-[356px] h-[356px] grid grid-cols-3
         mt-5"
        >
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Office" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Resources" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Materias" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Goods" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Stock" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Office" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Resources" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Materias" />
          </div>
          <div className="  cursor-pointer">
            <img src="src/assets/CubFront.svg" alt="Goods" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameField;
