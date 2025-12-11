
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class InsufficientFundsException extends RuntimeException {

public InsufficientFundsException(String message) {
    super(message);
}

}
