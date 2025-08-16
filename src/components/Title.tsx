import React from "react";

const Title: React.FC = () => {
  return (
    <section>
      <div className="mt-[65px] flex justify-center">
        <div className="flex justify-center flex-row w-[396px] h-6">
          <img className="w-[127px]" src="/assets/Line.svg" alt="Logo" />
          <img
            className="w-[111px] mr-[2rem] ml-[2rem]"
            src="/assets/RollCraft.svg"
            alt="rollcraft"
          />
          <img className="w-[127px]" src="/assets/Line.svg" alt="Logo" />
        </div>
      </div>
    </section>
  );
};

export default Title;
