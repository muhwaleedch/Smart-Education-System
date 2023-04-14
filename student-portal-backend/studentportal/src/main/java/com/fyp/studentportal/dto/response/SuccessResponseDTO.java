package com.fyp.studentportal.dto.response;

import org.springframework.http.ResponseEntity;

public class SuccessResponseDTO extends BaseResponseDTO {
    private Object payload;

    public SuccessResponseDTO() {
        super();
    }

    public SuccessResponseDTO(Object payload) {
        this.payload = payload;
    }

    public SuccessResponseDTO(Boolean hasError, Integer status, Object payload) {
        super(hasError, status);
        this.payload = payload;
    }

    public SuccessResponseDTO(Object payload, Integer httpStatus) {
        this.payload = payload;
        super.setStatus(httpStatus);
    }

    public static ResponseEntity<BaseResponseDTO> getSuccessObject(Object payload, Integer httpStatus) {
        return ResponseEntity.status(httpStatus).body(new SuccessResponseDTO(payload, httpStatus));
    }

    public static ResponseEntity<Object> getNoContentResponse() {
        return ResponseEntity.noContent().build();
    }

    public Object getPayload() {
        return payload;
    }

    public void setPayload(Object payload) {
        this.payload = payload;
    }

    @Override
    public String toString() {
        return "SuccessResponseDTO{" +
            "payload=" + payload +
            '}';
    }
}
