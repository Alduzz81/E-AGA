package com.aem.eaga.servlet.categorie;

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
        selectors = {"LoadCategorie",},
        extensions = {"json"},
        methods = {"GET"}
)
public class CategorieServlet extends StrategyContextServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void initStrategies() {     
        addStrategy("LoadCategorie", new LoadProductsCommand(HttpMethodEnum.GET));
    }

}