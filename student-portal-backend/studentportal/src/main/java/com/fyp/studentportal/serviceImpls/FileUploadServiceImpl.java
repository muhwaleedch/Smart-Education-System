package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.MimeTypeFileUploads;
import com.fyp.studentportal.services.IFileUploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileUploadServiceImpl implements IFileUploadService {
    @Override
    public List<MimeTypeFileUploads> uploadFilesGetData(List<MultipartFile> files) {
        return files.stream().map(this::uploadFileGetData).collect(Collectors.toList());
    }

    @Override
    public MimeTypeFileUploads uploadFileGetData(MultipartFile multipartFile) {
        String filePath = "src/main/resources/" + multipartFile.getOriginalFilename();
        File file = new File(filePath);
        if (file.exists()) {
            throw new RuntimeException("File already exists");
        }
        try (OutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
            return new MimeTypeFileUploads()
                .setUrlToFile(filePath)
                .setTitle(multipartFile.getName());
        } catch (Exception ex) {
            throw new RuntimeException("Exception Occurred while upload file to server");
        }
    }
}
