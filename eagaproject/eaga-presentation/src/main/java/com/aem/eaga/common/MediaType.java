package com.aem.eaga.common;

public enum MediaType {
    UNKNOWN (0),
    IMAGE (1),
    VIDEO (2);
    
    private final int value;
    
    private MediaType(int value) {
        this.value = value;
    }
    
    public int getValue() {
        return value;
    }

}
