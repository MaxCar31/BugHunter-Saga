package com.bughuntersaga.api.domain.exception;

/**
 * Excepción para cuando el score de una lección es insuficiente para
 * completarla.
 */
public class InsufficientScoreException extends RuntimeException {
    public InsufficientScoreException(String message) {
        super(message);
    }
}