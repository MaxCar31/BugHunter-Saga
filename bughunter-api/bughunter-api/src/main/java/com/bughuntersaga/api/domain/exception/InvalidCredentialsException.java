
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class InvalidCredentialsException extends RuntimeException {

public InvalidCredentialsException(String message) {
    super(message);
}

}
