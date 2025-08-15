export type FlipCardPropsType = {
  front: string;
  back: string;
  value?: number;
  op?: "x2" | undefined;
  onApply: (updater: (prev: number) => number) => void;
};
