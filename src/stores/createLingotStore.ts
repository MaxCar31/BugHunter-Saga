import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LingotSlice = {
  lingots: number;
  increaseLingots: (by: number) => void;
  setLingots: (value: number) => void;
};

// Cargar lingots desde localStorage (solo en el cliente)
const getInitialLingots = (): number => {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem("bh_lingots");
  return stored ? parseInt(stored, 10) : 0;
};

export const createLingotSlice: BoundStateCreator<LingotSlice> = (set) => ({
  lingots: getInitialLingots(),
  increaseLingots: (by: number) =>
    set(({ lingots }) => {
      const newValue = lingots + by;
      if (typeof window !== "undefined") {
        localStorage.setItem("bh_lingots", newValue.toString());
      }
      return { lingots: newValue };
    }),
  setLingots: (value: number) =>
    set(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("bh_lingots", value.toString());
      }
      return { lingots: value };
    }),
});
