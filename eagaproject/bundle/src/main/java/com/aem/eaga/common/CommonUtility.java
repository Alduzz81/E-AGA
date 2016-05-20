package com.aem.eaga.common;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class CommonUtility {
    
    private static final Logger log = LoggerFactory.getLogger(CommonUtility.class);

 
    public static Property getProperty(Node currentNode, String propertyName) throws RepositoryException {
        if (currentNode.hasProperty(propertyName)) {
            return currentNode.getProperty(propertyName);
        }
        return null;
    }

    public static String getPropertyValue(Node currentNode, String propertyName) throws RepositoryException {
        if (currentNode.hasProperty(propertyName) && !currentNode.getProperty(propertyName).getString().isEmpty()) {
            return currentNode.getProperty(propertyName).getString();
        }
        return null;
    }

    public static String getFileExtension(String fileName) {
        String fileExtension = null;
        if (fileName != null && !fileName.isEmpty()) {
            fileExtension = fileName.substring(fileName.lastIndexOf("."), fileName.length());
        }
        return fileExtension;
    }

    public static boolean isValidFileExtension(String fileExtension) {
        MediaFileType mediaFileType = MediaFileType.getMediaFileType(fileExtension);
        log.info("Invalid file extension, media file type not found for extension " + fileExtension);
        return mediaFileType != null ? true : false;
    }

    public static MediaType checkMediaType(String fileExtension) {
        MediaType mediaType = null;
        MediaFileType mediaFileType = MediaFileType.getMediaFileType(fileExtension);
        if (mediaFileType != null) {
            switch (mediaFileType.getMediaType()) {
                case IMAGE:
                    mediaType = MediaType.IMAGE;
                    break;
                case VIDEO:
                    mediaType = MediaType.VIDEO;
                    break;
                default:
                    break;
            }
        }
        return mediaType;
    }

}