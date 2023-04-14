package com.fyp.studentportal.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseEntity {
    @JsonIgnore
    @Column(name = "created_timestamp")
    private Date createdTimestamp;

    @JsonIgnore
    @Column(name = "updated_timestamp")
    private Date updateTimestamp;

    @PreUpdate
    public void onUpdateObject() {
        this.updateTimestamp = new Date();
    }

    @PrePersist
    public void onCreateObject() {
        this.createdTimestamp = new Date();
    }

    @Override
    public String toString() {
        return "BaseEntity{" +
            "createdTimestamp=" + createdTimestamp +
            ", updateTimestamp=" + updateTimestamp +
            '}';
    }
}
