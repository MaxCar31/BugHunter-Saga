package com.bughuntersaga.api.application.port.in;

/**
 * Caso de uso para reclamar un tesoro (lección de tipo 'treasure').
 */
public interface ClaimTreasureUseCase {

    /**
     * Permite a un usuario autenticado reclamar un tesoro.
     *
     * @param lessonId ID de la lección (debe ser tipo 'treasure')
     * @return Un objeto ClaimTreasureResult con los lingots ganados y el total actualizado.
     * @throws com.bughuntersaga.api.domain.exception.LessonNotFoundException si la lección no existe.
     * @throws com.bughuntersaga.api.domain.exception.TreasureAlreadyClaimedException si ya fue reclamado.
     * @throws com.bughuntersaga.api.domain.exception.UserNotFoundException si el usuario o perfil no se encuentra.
     */
    ClaimTreasureResult claimTreasure(Integer lessonId);
}