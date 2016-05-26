package com.aem.eaga.sightly.cookiepolicy;
import javax.jcr.Node;
import com.aem.eaga.common.CommonUse;

public class CookiePolicyUse extends CommonUse {
    private Node currentNode;
    private String text = "";

    @Override
    public void activate() throws Exception {
        currentNode = get("currentNode", Node.class);
        if (currentNode == null) {
            return;
        }
        
        if (!currentNode.hasProperty("cookie-policy")) {
            return;
        }
        text = currentNode.getProperty("cookie-policy").getString();
    }

    public String getText() {
        if (text == null) {
            return "";
        }

        text = text.replace("<a ", "<a class='text-underline' ");
        return text;
    }
}
