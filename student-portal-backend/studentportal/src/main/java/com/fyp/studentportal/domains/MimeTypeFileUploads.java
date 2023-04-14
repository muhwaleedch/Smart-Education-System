package com.fyp.studentportal.domains;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "mime_type_file_uploads")
public class MimeTypeFileUploads extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "file_id")
    private Long fileId;

    private String title;
    private String urlToFile;

    public MimeTypeFileUploads() {
    }

    public MimeTypeFileUploads(Long fileId, String title, String urlToFile) {
        this.fileId = fileId;
        this.title = title;
        this.urlToFile = urlToFile;
    }

    public Long getFileId() {
        return fileId;
    }

    public MimeTypeFileUploads setFileId(Long fileId) {
        this.fileId = fileId;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public MimeTypeFileUploads setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getUrlToFile() {
        return urlToFile;
    }

    public MimeTypeFileUploads setUrlToFile(String urlToFile) {
        this.urlToFile = urlToFile;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MimeTypeFileUploads that = (MimeTypeFileUploads) o;

        return Objects.equals(fileId, that.fileId);
    }

    @Override
    public int hashCode() {
        return fileId != null ? fileId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "MimeTypeFileUploads{" +
            "fileId=" + fileId +
            ", title='" + title + '\'' +
            ", urlToFile='" + urlToFile + '\'' +
            '}';
    }
}
