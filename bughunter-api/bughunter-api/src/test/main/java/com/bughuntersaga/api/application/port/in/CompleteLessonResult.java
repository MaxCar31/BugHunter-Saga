package com.bughuntersaga.api.application.port.in;

/**
 * Objeto de dominio que representa el resultado de completar una lección.
 * Es 'public' para ser accesible desde el servicio.
 */
public record CompleteLessonResult(
        int xpEarned,
        int lingotsEarned,
        int newTotalLingots,
        int newStreak
) {}