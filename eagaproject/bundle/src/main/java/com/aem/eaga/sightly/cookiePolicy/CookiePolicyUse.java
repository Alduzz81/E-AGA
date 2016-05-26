package com.aem.eaga.sightly.cookiePolicy;
import javax.jcr.Node;
import com.aem.eaga.common.CommonUse;

public class CookiePolicyUse extends CommonUse {
    private Node currentNode;
    private String text = "";

    @Override
    public void activate() throws Exception {
    	super.activate();
    	
        currentNode = get("currentNode", Node.class);
        if (currentNode == null) {
            return;
        }
        
        if (!currentNode.hasProperty("cookiePolicy")) {
            return;
        }
        text = currentNode.getProperty("cookiePolicy").getString();
    }

    public String getText() {
        if (text == null) {
            return "";
        }
        return text;
    }
    
    public boolean isEmpty() {   	
    	return (text == null) ? true : false;
    }
}
