import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LeagueSlice = {
    leagueRank: number | null;
    setLeagueRank: (rank: number | null) => void;
};

export const createLeagueSlice: BoundStateCreator<LeagueSlice> = (set) => ({
    leagueRank: null,
    setLeagueRank: (rank: number | null) => set({ leagueRank: rank }),
});
