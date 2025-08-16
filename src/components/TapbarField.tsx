import React from "react";
import HomeIndicator from "./HomeIndicator";

const TapbarField: React.FC = () => {
  return (
    <>
      <nav className="flex flex-row justify-around mt-[4rem]  ">
        <ul className="flex flex-row">
          <li className="mr-4">
            <img className="h-14 " src="/assets/Office2.svg" alt="Office" />
          </li>
          <li className="mr-4">
            <img className="h-14" src="/assets/Resources.svg" alt="Resources" />
          </li>
          <li className="mr-4">
            <img className="h-14" src="/assets/Materias.svg" alt="Materias" />
          </li>
          <li className="mr-4">
            <img className="h-14" src="/assets/Goods.svg" alt="Goods" />
          </li>
          <li className="mr-4">
            <img className="h-14" src="/assets/Stock.svg" alt="Stock" />
          </li>
        </ul>
      </nav>
      <HomeIndicator />
    </>
  );
};

export default TapbarField;
