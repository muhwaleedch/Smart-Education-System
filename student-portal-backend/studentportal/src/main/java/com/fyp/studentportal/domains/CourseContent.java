package com.fyp.studentportal.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collections;
import java.util.Set;

@Entity
@Table(name = "course_content")
public class CourseContent extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "course_content_id")
    private Long courseContentId;

    private Integer lectureNumber;
    private String topic;

    @OneToMany(cascade = {CascadeType.ALL})
    private Set<MimeTypeFileUploads> mimeTypeFileUploads = new java.util.LinkedHashSet<>();

    @ManyToOne
    private Course course;

    public CourseContent() {
    }

    public CourseContent(Long courseContentId, Integer lectureNumber, String topic, Set<MimeTypeFileUploads> mimeTypeFileUploads, Course course) {
        this.courseContentId = courseContentId;
        this.lectureNumber = lectureNumber;
        this.topic = topic;
        this.mimeTypeFileUploads = mimeTypeFileUploads;
        this.course = course;
    }

    public Long getCourseContentId() {
        return courseContentId;
    }

    public void setCourseContentId(Long courseContentId) {
        this.courseContentId = courseContentId;
    }

    public Integer getLectureNumber() {
        return lectureNumber;
    }

    public void setLectureNumber(Integer lectureNumber) {
        this.lectureNumber = lectureNumber;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Set<MimeTypeFileUploads> getMimeTypeFileUploads() {
        return mimeTypeFileUploads;
    }

    public void setMimeTypeFileUploads(Set<MimeTypeFileUploads> mimeTypeFileUploads) {
        this.mimeTypeFileUploads = mimeTypeFileUploads;
    }

    public void addMimeTypeFile(MimeTypeFileUploads mimeTypeFileUploads) {
        if (null == this.mimeTypeFileUploads) {
            this.mimeTypeFileUploads = Collections.emptySet();
        }
        this.mimeTypeFileUploads.add(mimeTypeFileUploads);
    }

    public Course getCourse() {
        return course;
    }

    @JsonIgnore
    public void setCourse(Course course) {
        this.course = course;
    }

    @Override
    public String toString() {
        return "CourseContent{" +
            "courseContentId=" + courseContentId +
            ", lectureNumber=" + lectureNumber +
            ", topic='" + topic + '\'' +
            ", mimeTypeFileUploads=" + mimeTypeFileUploads +
            '}';
    }
}
