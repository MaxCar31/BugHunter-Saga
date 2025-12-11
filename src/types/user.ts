/**
 * Tipos compartidos para la gestión de perfil de usuario
 * Estos tipos se usan en el servicio userService.ts y en los componentes
 */

// ==================== USER PROFILE ====================

/**
 * Badge obtenido por el usuario
 */
export interface BadgeDTO {
    itemCode: string;
    name: string;
    description: string;
    icon: string;
}

/**
 * Perfil completo del usuario (Response de GET /api/users/me/profile)
 */
export interface UserProfileDTO {
    userId: string;
    name: string;
    username: string;
    email: string;
    joinedAt: string;
    lingots: number;
    dailyXpGoal: number;
    soundEffectsEnabled: boolean;
    badges: BadgeDTO[];
}

// ==================== UPDATE ACCOUNT ====================

/**
 * Datos para actualizar la cuenta del usuario (Request de PUT /api/users/me/account)
 */
export interface UpdateUserAccountDTO {
    name?: string;
    username?: string;
}

/**
 * Response de actualizar cuenta (Response de PUT /api/users/me/account)
 */
export interface UpdateUserAccountResponse {
    id: string;
    username: string;
    name: string;
    email: string;
}

// ==================== UPDATE SETTINGS ====================

/**
 * Datos para actualizar configuraciones (Request de PUT /api/users/me/settings)
 */
export interface UpdateUserSettingsDTO {
    dailyXpGoal?: number;
    soundEffectsEnabled?: boolean;
    speakingExercises?: boolean;
    listeningExercises?: boolean;
}

// ==================== USER STATS ====================

/**
 * Estadísticas del usuario (Response de GET /api/users/me/stats)
 */
export interface UserStatsDTO {
    totalXp: number;
    totalLingots: number;
    currentStreak: number;
    xpToday: number;
    xpThisWeek: number;
    leagueRank: number | null;
    activeDays: string[];
}

// ==================== TREASURE CLAIM ====================

/**
 * Recompensa de tesoro (Response de POST /api/progress/treasure/{lessonId})
 */
export interface TreasureRewardDTO {
    lingotsEarned: number;
    totalLingots: number;
}

// ==================== ERROR HANDLING ====================

/**
 * Estructura de error del API
 */
export interface ApiErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
}
