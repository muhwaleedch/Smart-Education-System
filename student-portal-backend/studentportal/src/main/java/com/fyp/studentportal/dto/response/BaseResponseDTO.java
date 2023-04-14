package com.fyp.studentportal.dto.response;


public class BaseResponseDTO {
    private Boolean hasError;
    private Integer status;

    public BaseResponseDTO() {
    }

    public BaseResponseDTO(Boolean hasError, Integer status) {
        this.hasError = true;
        this.status = status;
    }

    public Boolean getHasError() {
        return hasError;
    }

    public void setHasError(Boolean hasError) {
        this.hasError = hasError;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "BaseResponseDTO{" +
            "hasError=" + hasError +
            ", status=" + status +
            '}';
    }
}
