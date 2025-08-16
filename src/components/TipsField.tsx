import React from "react";

const TipsField: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="flex flex-row justify-around w-[316px] h-[32px] mt-4">
        <div className="flex flex-row mr-2">
          <img className="h-8" src="/assets/Cash.svg" alt="Cash" />
          <span className="font-bold text-2xl text-blue-50">5</span>
        </div>
        <div className="flex flex-row">
          <img className="h-8" src="/assets/FrameX2.svg" alt="FrameX2" />
          <span className="font-bold text-2xl text-blue-50">1</span>
        </div>
        <div className="flex flex-row">
          <img className="h-11" src="/assets/Zero.svg" alt="Zero" />
          <span className="font-bold text-2xl text-blue-50">1</span>
        </div>
        <div className="flex flex-row">
          <img className="h-8" src="/assets/Bomb.svg" alt="Bomb" />
          <span className="font-bold text-2xl text-blue-50">1</span>
        </div>
        <div className="flex flex-row">
          <img className="h-8" src="/assets/Stop.svg" alt="Stop" />
          <span className="font-bold text-2xl text-blue-50">1</span>
        </div>
      </div>
    </div>
  );
};

export default TipsField;
