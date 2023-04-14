package com.fyp.studentportal.services;

import com.fyp.studentportal.domains.MimeTypeFileUploads;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IFileUploadService {
    List<MimeTypeFileUploads> uploadFilesGetData(List<MultipartFile> files);
    MimeTypeFileUploads uploadFileGetData(MultipartFile file);
}
