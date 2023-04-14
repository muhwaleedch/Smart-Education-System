package com.fyp.studentportal.dto.response;

import org.springframework.http.ResponseEntity;

public class ErrorResponseDTO extends BaseResponseDTO {
    private String message;
    private String error;

    public ErrorResponseDTO() {
        super();
    }

    public ErrorResponseDTO(Boolean hasError, Integer status, String message, String error) {
        super(hasError, status);
        this.message = message;
        this.error = error;
    }

    public ErrorResponseDTO(String message, String error, Integer httpStatus) {
        super(true, httpStatus);
        this.message = message;
        this.error = error;
    }

    public static ResponseEntity<ErrorResponseDTO> getErrorObject(String message, String error, Integer httpStatus) {
        return ResponseEntity.status(httpStatus).body(new ErrorResponseDTO(message, error, httpStatus));
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    @Override
    public String toString() {
        return "ErrorResponseDTO{" +
            "message='" + message + '\'' +
            ", error='" + error + '\'' +
            '}';
    }
}
