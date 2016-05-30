package com.aem.eaga.request;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;

public class Resources {
    private Resources() {
        // no instance allowed for this utility class
    }

    /**
     * Check if a resource exists and is adaptable to the requested {@code type}
     * .
     *
     * @param resource
     *            the resource, can be <code>null</code>
     * @param type
     *            the type to adapt to
     * @return <code>true</code> only if the resource exists (see
     *         {@link #isExistingResource(org.apache.sling.api.resource.Resource)}
     *         ) and is adatable to the requested {@code type}
     */
    public static boolean isAdaptableTo(Resource resource, Class<?> type) {
        return isExistingResource(resource) && (resource.adaptTo(type) != null);
    }

    /**
     * Opposite of {@link #isNonExistingResource(Resource)} for better
     * readability.
     */
    public static boolean isExistingResource(Resource resource) {
        return !isNonExistingResource(resource);
    }

    /**
     * Check if a resource does not exist. Same as what's done by
     * {@code ResourceUtil#isNonExistingResource(Resource)} but handle null
     * gracefully.
     *
     * @param resource
     *            the resource, can be null
     * @return <code>true</code> only if the resource is not null and not of
     *         type {@code Resource.RESOURCE_TYPE_NON_EXISTING}.
     * @see org.apache.sling.api.resource.ResourceUtil#isNonExistingResource(Resource)
     */
    public static boolean isNonExistingResource(Resource resource) {
        return (resource == null) || ResourceUtil.isNonExistingResource(resource);
    }

    public static <T> T getResourceProperty(Resource resource, String key, Class<T> type) {
        String path = extractPath(key);
        String property = extractProperty(key);
        Resource childResource = getResourceChild(resource, path);
        ValueMap valueMap = org.apache.sling.api.resource.ResourceUtil.getValueMap(childResource);
        return valueMap.get(property, type);
    }

    public static <T> T getInheritedProperty(Resource resource, String key, T defaultValue) {
        Object inheritedProperty = getInheritedProperty(resource, key, defaultValue.getClass());
        if (inheritedProperty == null) {
            return defaultValue;
        }
        return (T) inheritedProperty;
    }

    public static <T> T getInheritedProperty(Resource resource, String key, Class<T> type) {
        String path = extractPath(key);
        String property = extractProperty(key);
        Resource childResource;
        if (path == null || path.isEmpty()) {
            childResource = getResourceChild(resource, path);
        } else {
            childResource = resource.getChild(path);
        }
        InheritanceValueMap inheritanceValueMap = new HierarchyNodeInheritanceValueMap(childResource);
        return inheritanceValueMap.getInherited(property, type);

    }

    public static Resource getResourceChild(Resource resource, String key) {
        if (key == null || key.isEmpty()) {
            return resource;
        }

        String currentKey;
        if (key.startsWith("./")) {
            currentKey = key.substring(2);
        } else {
            currentKey = key;
        }
        int slashIndex = currentKey.indexOf('/');
        String childKey;
        String keyTail;
        if (slashIndex == -1) {
            childKey = currentKey;
            keyTail = null;
        } else {
            childKey = currentKey.substring(0, slashIndex);
            keyTail = currentKey.substring(slashIndex + 1);
        }

        return getResourceChild(resource.getChild(childKey), keyTail);
    }

    static String extractProperty(String path) {
        int start = path.lastIndexOf('/') + 1;
        return path.substring(start, path.length());
    }

    static String extractPath(String path) {
        int lastSlash = path.lastIndexOf('/');
        if (lastSlash < 0) {
            return "";
        }
        return path.substring(0, lastSlash);
    }
}
