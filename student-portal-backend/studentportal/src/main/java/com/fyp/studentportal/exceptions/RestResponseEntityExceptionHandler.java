package com.fyp.studentportal.exceptions;

import com.fyp.studentportal.dto.response.ErrorResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

import static com.fyp.studentportal.dto.response.ErrorResponseDTO.getErrorObject;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    private final Logger loggerFactory = LoggerFactory.getLogger(RestResponseEntityExceptionHandler.class);

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponseDTO> handleEntityNotFoundException(EntityNotFoundException e, WebRequest webRequest) {
        this.loggerFactory.error("handleEntityNotFoundException in RestResponseEntityExceptionHandler");
        return getErrorObject("Resource not found", e.getMessage(), HttpStatus.NOT_FOUND.value());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponseDTO> handleDataIntegrityViolationException(DataIntegrityViolationException e, WebRequest webRequest) {
        this.loggerFactory.error("handleDataIntegrityViolationException in RestResponseEntityExceptionHandler");
        return getErrorObject("Conflict", e.getMessage(), HttpStatus.CONFLICT.value());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponseDTO> handleRuntimeException(RuntimeException e, WebRequest webRequest) {
        this.loggerFactory.error("handleRuntimeException in RestResponseEntityExceptionHandler");
        return getErrorObject("Runtime Exception", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseDTO> handleAllExceptions(Exception e, WebRequest webRequest) {
        this.loggerFactory.error("handleAllExceptions in RestResponseEntityExceptionHandler");
        return getErrorObject("Runtime Exception", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}
