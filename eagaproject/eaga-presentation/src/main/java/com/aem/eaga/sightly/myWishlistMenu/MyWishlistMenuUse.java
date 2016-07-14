package com.aem.eaga.sightly.myWishlistMenu;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.commons.json.JSONObject;

import com.aem.eaga.common.CommonUse;

public class MyWishlistMenuUse extends CommonUse {
	private Node currentNode;
	private final Map<String, String> menuLinks = new LinkedHashMap<>(new HashMap<String, String>());

	@Override
	public void activate() throws Exception {
		super.activate();	
		currentNode = get("currentNode", Node.class);
        if (currentNode == null) {
            return;
        }

        Value[] values;
        Property links = getProperty(currentNode, "myWishListMenu");
   
        if (links != null) {
            JSONObject json;
            String url;

            if (links.isMultiple()) {
                values = links.getValues();
            } else {
                values = new Value[] { links.getValue() };
            }
            for (Value value : values) {
                json = new JSONObject(value.getString());
                url = json.getString("url");
                menuLinks.put(json.getString("label"), getValidLink(url));
            }
        }
	}
	
	public static Property getProperty(Node currentNode, String propertyName) throws RepositoryException {
        if (currentNode.hasProperty(propertyName)) {
            return currentNode.getProperty(propertyName);
        }
        return null;
    }
	
	public Map<String, String> getMap() {
		return menuLinks;
	}

	public boolean isMenuEmpty() {
		return menuLinks.isEmpty();
	}
}
