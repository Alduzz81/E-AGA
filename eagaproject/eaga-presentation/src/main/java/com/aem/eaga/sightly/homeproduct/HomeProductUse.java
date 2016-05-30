package com.aem.eaga.sightly.homeproduct;

import com.aem.eaga.common.CommonUse;
import java.util.LinkedList;
import java.util.List;
import javax.jcr.Node;
import javax.jcr.Value;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HomeProductUse extends CommonUse {
    
    private static final String PROPERTY_HOMEPRODUCT_ITEMS = "homeproductitems";
    private static final String PROPERTY_TIMING = "timing";
    private static final String HOMEPRODUCT_DEFAULT_TIMING = "3000";
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final List<HomeProductItem> items = new LinkedList<HomeProductItem>();
    private String timing;
    private Node currentNode;
    
    @Override
    public void activate() throws Exception {
        currentNode = get("currentNode", Node.class);
        if (currentNode == null) {
            return;
        }
        JSONObject json;
        HomeProductItem homeproductItem;
        Value[] values;
        
        if (!currentNode.hasProperty(PROPERTY_HOMEPRODUCT_ITEMS) || !currentNode.hasProperty(PROPERTY_TIMING)) {
            return;
        }
        
        timing = currentNode.getProperty(PROPERTY_TIMING).getString();

        if (currentNode.getProperty(PROPERTY_HOMEPRODUCT_ITEMS).isMultiple()) {
            values = currentNode.getProperty(PROPERTY_HOMEPRODUCT_ITEMS).getValues();
        } else {
            values = new Value[]{currentNode.getProperty(PROPERTY_HOMEPRODUCT_ITEMS).getValue()};
        }
        
        for (Value value : values) {
            json = new JSONObject(value.getString());
            homeproductItem = new HomeProductItem(json.getString("image"), 
                                            getValidLink(json.getString("imageHref")), 
                                            json.getString("imageAlt"), 
                                            json.getString("name"));
            items.add(homeproductItem);
        }
        
        log.info("====================== CarouselUse Activate Start ======================");
        log.info("                       Current Name: " + currentNode.getName());
        log.info("====================== CarouselUse Activate End ======================");
    }
    
    public List<HomeProductItem> getHomeProductItems() {
        return items;
    }
    
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    public String getTiming() {
        if (timing == null || timing.isEmpty()) {
            return HOMEPRODUCT_DEFAULT_TIMING;
    	}
        return timing;
    }
}
