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
    // не додаємо дубль, якщо картка вже є у списку відкритих
    setOpenedCards((prev) =>
      prev.some((c) => c.id === card.id) ? prev : [...prev, card]
    );
  };

  const handleClaim = () => {
    if (openedCards.length === 0) return;

    onApply((prev) => {
      let result = prev;
      for (const card of openedCards) {
        if (card.op === "x2") {
          result *= 2; // множимо за кожну "x2" у відкритих
        } else {
          result += card.value ?? 0; // додаємо значення
        }
      }
      return result;
    });

    // після Claim очищаємо відкриті (щоб кнопка знову стала сірою)
    setOpenedCards([]);
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

      {/* Кнопка Claim + модалка у окремому блоці */}
      <ClaimSection
        // старі пропси для сумісності, не використовуються:
        allOpened={false}
        onRevealAll={() => {}}
        // нова логіка:
        disabled={openedCards.length === 0}
        onClaim={handleClaim}
      />
    </div>
  );
};

const FlipCard: React.FC<
  Omit<FlipCardPropsType, "onApply"> & { onOpen: () => void }
> = ({ front, back, onOpen }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (!flipped) {
      onOpen(); // реєструємо картку як відкриту для поточного "раунду"
    }
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
