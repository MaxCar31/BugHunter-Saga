
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class TreasureAlreadyClaimedException extends RuntimeException {

public TreasureAlreadyClaimedException(String message) {
    super(message);
}

}
