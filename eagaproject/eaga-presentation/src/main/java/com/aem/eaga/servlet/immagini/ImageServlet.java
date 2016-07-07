package com.aem.eaga.servlet.immagini;

import com.aem.eaga.servlet.StrategyContextServlet;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import com.aem.eaga.servlet.immagini.commands.LoadImageCommand;

import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;

@Service
@SlingServlet(
        resourceTypes = {"cq:Page"},
        selectors = {"LoadImage"},
        extensions = {"json"},
        methods = {"GET"}
)
public class ImageServlet extends StrategyContextServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void initStrategies() {
        addStrategy("LoadImage", new LoadImageCommand(HttpMethodEnum.GET));
    }
}