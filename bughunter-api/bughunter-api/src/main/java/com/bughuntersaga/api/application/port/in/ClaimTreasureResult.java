package com.bughuntersaga.api.application.port.in;

/**
 * Objeto de dominio que representa el resultado de reclamar un tesoro.
 * Usamos un 'record' de Java para un DTO inmutable simple.
 *
 * Debe estar en su propio archivo .java ya que es 'public'.
 */
public record ClaimTreasureResult(int lingotsEarned, int totalLingots) {}