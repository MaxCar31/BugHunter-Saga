import { apiBase } from "~/utils/config";
import type {
    UserProfileDTO,
    UpdateUserAccountDTO,
    UpdateUserAccountResponse,
    UpdateUserSettingsDTO,
    UserStatsDTO,
    TreasureRewardDTO,
    ApiErrorResponse,
} from "~/types/user";

/**
 * UserService - Servicio para gestionar el perfil y configuración del usuario
 * Implementa las 3 features de la Fase 5:
 * 1. GET /users/me/profile - Obtener perfil completo
 * 2. PUT /users/me/account - Actualizar nombre y username
 * 3. PUT /users/me/settings - Actualizar configuraciones (meta XP, sonidos)
 */

// ==================== UTILIDADES ====================

/**
 * Obtiene el token de autenticación del localStorage
 */
const getAuthToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("bh_token");
};

/**
 * Crea los headers de autenticación para las peticiones
 */
const createAuthHeaders = (): HeadersInit => {
    const token = getAuthToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

/**
 * Maneja errores de las respuestas del API
 */
const handleApiError = async (response: Response): Promise<never> => {
    let errorMessage = "Error al comunicarse con el servidor";

    try {
        const errorData: ApiErrorResponse = await response.json();
        errorMessage = errorData.message || errorMessage;
    } catch {
        // Si no se puede parsear el JSON, usar mensaje por defecto
    }

    throw new Error(errorMessage);
};

// ==================== FEATURE 1: GET PROFILE ====================

/**
 * Feature 1: Obtener el perfil completo del usuario autenticado
 * Endpoint: GET /api/users/me/profile
 * 
 * @returns UserProfileDTO con todos los datos del usuario
 * @throws Error si no está autenticado o hay un error en el servidor
 */
export const getUserProfile = async (): Promise<UserProfileDTO> => {
    const token = getAuthToken();

    if (!token) {
        throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    const response = await fetch(`${apiBase}/api/users/me/profile`, {
        method: "GET",
        headers: createAuthHeaders(),
    });

    if (!response.ok) {
        await handleApiError(response);
    }

    const profile: UserProfileDTO = await response.json();
    return profile;
};

// ==================== FEATURE 2: UPDATE ACCOUNT ====================

/**
 * Feature 2: Actualizar la información de cuenta (nombre y username)
 * Endpoint: PUT /api/users/me/account
 * 
 * @param data - Objeto con los campos a actualizar (name y/o username)
 * @returns UpdateUserAccountResponse con los datos actualizados
 * @throws Error si el username ya está en uso o hay un error
 */
export const updateUserAccount = async (
    data: UpdateUserAccountDTO
): Promise<UpdateUserAccountResponse> => {
    const token = getAuthToken();

    if (!token) {
        throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    // Validaciones básicas del lado del cliente
    if (data.username && data.username.length < 3) {
        throw new Error("El username debe tener al menos 3 caracteres.");
    }

    if (data.name && data.name.length === 0) {
        throw new Error("El nombre no puede estar vacío.");
    }

    const response = await fetch(`${apiBase}/api/users/me/account`, {
        method: "PUT",
        headers: createAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        await handleApiError(response);
    }

    const updated: UpdateUserAccountResponse = await response.json();
    return updated;
};

// ==================== FEATURE 3: UPDATE SETTINGS ====================

/**
 * Feature 3: Actualizar las configuraciones del usuario
 * Endpoint: PUT /api/users/me/settings
 * 
 * @param data - Objeto con las configuraciones a actualizar
 * @returns UserProfileDTO con el perfil completo actualizado
 * @throws Error si hay un error en el servidor
 */
export const updateUserSettings = async (
    data: UpdateUserSettingsDTO
): Promise<UserProfileDTO> => {
    const token = getAuthToken();

    if (!token) {
        throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    // Validación de dailyXpGoal
    const validGoals = [1, 10, 20, 30, 50];
    if (data.dailyXpGoal !== undefined && !validGoals.includes(data.dailyXpGoal)) {
        throw new Error("Meta de XP diaria inválida. Valores permitidos: 1, 10, 20, 30, 50.");
    }

    const response = await fetch(`${apiBase}/api/users/me/settings`, {
        method: "PUT",
        headers: createAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        await handleApiError(response);
    }

    const updated: UserProfileDTO = await response.json();
    return updated;
};

// ==================== FEATURE 4: GET USER STATS ====================

/**
 * Feature 4 (Fase 4): Obtener estadísticas del usuario
 * Endpoint: GET /api/users/me/stats
 * 
 * @returns UserStatsDTO con todas las estadísticas de gamificación
 * @throws Error si no está autenticado o hay un error en el servidor
 */
export const getUserStats = async (): Promise<UserStatsDTO> => {
    const token = getAuthToken();

    if (!token) {
        throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    const response = await fetch(`${apiBase}/api/users/me/stats`, {
        method: "GET",
        headers: createAuthHeaders(),
    });

    if (!response.ok) {
        await handleApiError(response);
    }

    const stats: UserStatsDTO = await response.json();
    return stats;
};

// ==================== FEATURE 5: CLAIM TREASURE ====================

/**
 * Feature 5 (Fase 4): Reclamar un cofre de tesoro
 * Endpoint: POST /api/progress/treasure/{lessonId}
 * 
 * @param lessonId - ID de la lección que representa el tesoro
 * @returns TreasureRewardDTO con los lingots ganados y el total actualizado
 * @throws Error si el tesoro ya fue reclamado o hay un error
 */
export const claimTreasure = async (lessonId: number): Promise<TreasureRewardDTO> => {
    const token = getAuthToken();

    if (!token) {
        throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    const response = await fetch(`${apiBase}/api/progress/treasure/${lessonId}`, {
        method: "POST",
        headers: createAuthHeaders(),
    });

    if (!response.ok) {
        await handleApiError(response);
    }

    const reward: TreasureRewardDTO = await response.json();
    return reward;
};
