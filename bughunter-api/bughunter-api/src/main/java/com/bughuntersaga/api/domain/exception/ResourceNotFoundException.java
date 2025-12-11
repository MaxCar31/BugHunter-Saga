
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceType, Object id) {
        super(String.format("%s con ID '%s' no encontrado", resourceType, id));
    }
}
