import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type RewardCounterProps = {
  counter: number;
};

type ConfettiStripe = {
  id: number;
  angle: number;
  distance: number;
  color: string;
};

const colors = ["#FFD700", "#FF69B4", "#00CED1", "#7CFC00", "#FF4500"];

const RewardCounter = React.forwardRef<HTMLImageElement, RewardCounterProps>(
  ({ counter }, ref) => {
    const [stripes, setStripes] = useState<ConfettiStripe[]>([]);

    useEffect(() => {
      if (counter === 0) return;

      // Створюємо 6 смужок на кожне оновлення
      const newStripes: ConfettiStripe[] = Array.from({ length: 6 }).map(
        (_, i) => ({
          id: Date.now() + i,
          angle: Math.random() * 360, // напрямок польоту
          distance: 60 + Math.random() * 40, // відстань
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      );

      setStripes((prev) => [...prev, ...newStripes]);
    }, [counter]);

    return (
      <div className="relative flex items-center justify-center gap-2 mt-8">
        {/* Монетка */}
        <img
          ref={ref}
          src="/assets/Cash.svg"
          alt="Cash"
          className="w-10 h-10"
        />

        {/* Лічильник */}
        <span className="text-xl font-bold text-amber-50">{counter}</span>

        {/* Смуги-конфеті */}
        {stripes.map((stripe) => {
          const radians = (stripe.angle * Math.PI) / 180;
          const dx = Math.cos(radians) * stripe.distance;
          const dy = Math.sin(radians) * stripe.distance;

          return (
            <motion.div
              key={stripe.id}
              className="absolute w-1 h-6 rounded-full"
              style={{ backgroundColor: stripe.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: dx, y: dy, opacity: 0, scale: 0.5, rotate: 180 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onAnimationComplete={() =>
                setStripes((prev) => prev.filter((s) => s.id !== stripe.id))
              }
            />
          );
        })}
      </div>
    );
  }
);

export default RewardCounter;
