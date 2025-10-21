
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class UsernameAlreadyExistsException extends RuntimeException {

public UsernameAlreadyExistsException(String message) {
    super(message);
}

}
