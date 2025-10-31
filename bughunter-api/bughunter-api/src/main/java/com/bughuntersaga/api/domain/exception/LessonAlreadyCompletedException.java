
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class LessonAlreadyCompletedException extends RuntimeException {
    public LessonAlreadyCompletedException(String message) {
        super(message);
    }
}
