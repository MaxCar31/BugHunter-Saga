import { apiBase } from "~/utils/config";

// Tipos basados en tu contrato
export interface LessonCompletionRequest {
  lessonId: number;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  timeTakenMs: number;
  isPractice: boolean;
}

export interface LessonCompletionResponse {
  xpEarned: number;
  lingotsEarned: number;
  newTotalLingots: number;
  newStreak: number;
}

export const completeLessonAPI = async (
  request: LessonCompletionRequest
): Promise<LessonCompletionResponse> => {
  const token = localStorage.getItem("bh_token");
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${apiBase}/api/progress/lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to complete lesson: ${errorText}`);
  }

  return response.json();
};