import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import RewardCounter from "../components/RewardCounter";
import GameField from "../components/GameField";
import TipsField from "../components/TipsField";
import ClaimButton from "../components/ClaimButton";
import TapbarField from "../components/TapbarField";
import HomeIndicator from "../components/HomeIndicator";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Title />
      <RewardCounter />
      <GameField />
      <TipsField />
      <ClaimButton />
      <TapbarField />
      <HomeIndicator />
    </>
  );
};

export default HomePage;
