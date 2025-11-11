import { useBoundStore } from "~/hooks/useBoundStore";
import { useState, useEffect } from "react";
import { apiBase } from "~/utils/config";

// Tipos según el contrato API
type LeaderboardEntry = {
  rank: number;
  name: string;
  xp: number;
  isCurrentUser: boolean;
};

type LeaderboardData = {
  leagueName: string;
  timeUntilEnd: string;
  users: LeaderboardEntry[];
};

// Función para obtener el leaderboard desde la API
const fetchLeaderboard = async (token?: string): Promise<LeaderboardData> => {
  try {
    const response = await fetch(`${apiBase}/api/leaderboard`, {
      headers: {
        accept: "*/*",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} fetching leaderboard`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};

export const useLeaderboardUsers = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("bh_token");
        const data = await fetchLeaderboard(token || undefined);
        setLeaderboardData(data.users);
      } catch (err) {
        setError("Failed to load leaderboard");
        console.error("Leaderboard error:", err);
        // Fallback: usar datos vacíos en caso de error
        setLeaderboardData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return { users: leaderboardData, isLoading, error };
};

export const useLeaderboardRank = () => {
  const { users } = useLeaderboardUsers();
  const currentUser = users.find((user) => user.isCurrentUser);
  return currentUser?.rank || null;
};
