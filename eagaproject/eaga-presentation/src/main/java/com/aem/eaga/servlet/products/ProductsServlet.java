package com.aem.eaga.servlet.products;

import com.aem.eaga.servlet.StrategyContextServlet;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import com.aem.eaga.servlet.products.commands.InsertProductCommand;
import com.aem.eaga.servlet.products.commands.LoadProductsCommand;
import com.aem.eaga.servlet.products.commands.LoadSingleProductCommand;

import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;

@Service
@SlingServlet(
        resourceTypes = {"cq:Page"},
        selectors = {"InsertProduct","LoadProducts","LoadSingleProduct"},
        extensions = {"json"},
        methods = {"GET"}
)
public class ProductsServlet extends StrategyContextServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void initStrategies() {
        addStrategy("InsertProduct", new InsertProductCommand(HttpMethodEnum.GET));
        addStrategy("LoadProducts", new LoadProductsCommand(HttpMethodEnum.GET));
        addStrategy("LoadSingleProduct", new LoadSingleProductCommand(HttpMethodEnum.GET));
    }

}