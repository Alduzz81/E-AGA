package com.aem.eaga.common;

import static com.aem.eaga.common.MediaType.*;

public enum MediaFileType {
    JPEG (0, ".jpeg", IMAGE),
    JPG (1, ".jpg", IMAGE),
    PNG (2, ".png", IMAGE),
    GIF (3, ".gif", IMAGE),
    MPEG (4, ".mpeg", VIDEO),
    MKV (5, ".mkv", VIDEO),
    MP4 (6, ".mp4", VIDEO),
    _3GP (7, ".3gp", VIDEO),
    MOV (8, ".mov", VIDEO),
    WEBM (9, ".webm", VIDEO);

    private final int value;
    private final String name;
    private final MediaType mediaType;

    private MediaFileType(int value, String name) {
        this.value = value;
        this.name = name;
        this.mediaType = UNKNOWN;
    }

    private MediaFileType(int value, String name, MediaType mediaType) {
        this.value = value;
        this.name = name;
        this.mediaType = mediaType;
    }

    public int getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

    public MediaType getMediaType() {
        return mediaType;
    }

    public static MediaFileType getMediaFileType(String fileExtension) {
        for (MediaFileType type : MediaFileType.values()) {
            if (type.getName().equalsIgnoreCase(fileExtension)) {
                return type;
            }
        }
        return null;
    }
}
