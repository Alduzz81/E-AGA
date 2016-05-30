package com.aem.eaga.sightly.carousel;

import com.aem.eaga.common.CommonUse;
import java.util.LinkedList;
import java.util.List;
import javax.jcr.Node;
import javax.jcr.Value;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CarouselUse extends CommonUse {
    
    private static final String PROPERTY_CAROUSEL_ITEMS = "carouselitems";
    private static final String PROPERTY_TIMING = "timing";
    private static final String CAROUSEL_DEFAULT_TIMING = "3000";
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final List<CarouselItem> items = new LinkedList<CarouselItem>();
    private String timing;
    private Node currentNode;
    
    @Override
    public void activate() throws Exception {
        currentNode = get("currentNode", Node.class);
        if (currentNode == null) {
            return;
        }
        JSONObject json;
        CarouselItem carouselItem;
        Value[] values;
        
        if (!currentNode.hasProperty(PROPERTY_CAROUSEL_ITEMS) || !currentNode.hasProperty(PROPERTY_TIMING)) {
            return;
        }
        
        timing = currentNode.getProperty("timing").getString();

        if (currentNode.getProperty(PROPERTY_CAROUSEL_ITEMS).isMultiple()) {
            values = currentNode.getProperty(PROPERTY_CAROUSEL_ITEMS).getValues();
        } else {
            values = new Value[]{currentNode.getProperty(PROPERTY_CAROUSEL_ITEMS).getValue()};
        }
        
        for (Value value : values) {
            json = new JSONObject(value.getString());
            carouselItem = new CarouselItem(json.getString("image"), 
                                            getValidLink(json.getString("imageHref")), 
                                            json.getString("imageAlt"), 
                                            json.getString("msg"));
            items.add(carouselItem);
        }
        
        log.info("====================== CarouselUse Activate Start ======================");
        log.info("                       Current Name: " + currentNode.getName());
        log.info("====================== CarouselUse Activate End ======================");
    }
    
    public List<CarouselItem> getCarouselItems() {
        return items;
    }
    
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    public String getTiming() {
        if (timing == null || timing.isEmpty()) {
            return CAROUSEL_DEFAULT_TIMING;
    	}
        return timing;
    }
}
