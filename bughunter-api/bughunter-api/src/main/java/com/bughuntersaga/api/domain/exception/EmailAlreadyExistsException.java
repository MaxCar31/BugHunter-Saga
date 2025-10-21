
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class EmailAlreadyExistsException extends RuntimeException {

public EmailAlreadyExistsException(String message) {
    super(message);
}

}
