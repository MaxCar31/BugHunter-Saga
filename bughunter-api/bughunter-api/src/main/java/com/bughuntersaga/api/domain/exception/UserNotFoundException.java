
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class UserNotFoundException extends RuntimeException {

public UserNotFoundException(String message) {
    super(message);
}

}
