import React, { useState } from "react";
import { motion } from "framer-motion";
import { cardsData } from "../data/cardsData";
import type { FlipCardPropsType } from "../types/flipCard";
import ClaimSection from "./ClaimSection";

const GameField: React.FC<{
  onApply: (fn: (prev: number) => number) => void;
}> = ({ onApply }) => {
  // список відкритих за цей раунд карток (щоб зарахувати їх по Claim)
  const [openedCards, setOpenedCards] = useState<
    { id: number; value?: number; op?: string }[]
  >([]);

  const handleCardOpen = (card: {
    id: number;
    value?: number;
    op?: string;
  }) => {
    setOpenedCards((prev) =>
      prev.some((c) => c.id === card.id) ? prev : [...prev, card]
    );
  };

  // ⬇️ ПОВИНЕН ПОВЕРТАТИ number (дельту доданих балів)
  const handleClaim = (): number => {
    if (openedCards.length === 0) return 0;

    let delta = 0;

    onApply((prev) => {
      let result = prev;

      // відтворюємо точний порядок ефектів: додавання/множення в тій послідовності,
      // в якій карти були відкриті
      for (const card of openedCards) {
        if (card.op === "x2") {
          result *= 2;
        } else {
          result += card.value ?? 0;
        }
      }

      delta = result - prev; // скільки саме додали в цьому клеймі
      return result;
    });

    setOpenedCards([]); // після Claim очищаємо відкриті
    return delta;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Сітка карт */}
      <div className="w-[356px] h-[356px] grid grid-cols-3 mt-5">
        {cardsData.map((card) => (
          <FlipCard
            key={card.id}
            front={card.front}
            back={card.back}
            value={card.value}
            op={card.op === "x2" ? "x2" : undefined}
            onOpen={() =>
              handleCardOpen({ id: card.id, value: card.value, op: card.op })
            }
          />
        ))}
      </div>

      {/* ⬇️ Передаємо тільки те, що реально є у пропсах ClaimSection */}
      <ClaimSection disabled={openedCards.length === 0} onClaim={handleClaim} />
    </div>
  );
};

const FlipCard: React.FC<
  Omit<FlipCardPropsType, "onApply"> & { onOpen: () => void }
> = ({ front, back, onOpen }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (!flipped) onOpen();
    setFlipped(true);
  };

  return (
    <div
      className="w-full h-full cursor-pointer perspective"
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Передня */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={front} alt="Front" className="w-full h-full" />
        </div>

        {/* Задня */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <img src={back} alt="Back" className="w-full h-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default GameField;
