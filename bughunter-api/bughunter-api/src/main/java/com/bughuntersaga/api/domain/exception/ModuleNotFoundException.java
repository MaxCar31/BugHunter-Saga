
package com.bughuntersaga.api.domain.exception;

import java.lang.RuntimeException;



public class ModuleNotFoundException extends RuntimeException {

public ModuleNotFoundException(String message) {
    super(message);
}

}
