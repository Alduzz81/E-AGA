package com.aem.eaga.servlet.shoppingCart;

import com.aem.eaga.servlet.StrategyContextServlet;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import com.aem.eaga.servlet.shoppingCart.commands.InsertProductToCartCommand;
import com.aem.eaga.servlet.shoppingCart.commands.LoadCartProductsCommand;

import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;

@Service
@SlingServlet(
        resourceTypes = {"cq:Page"},
        selectors = {"InsertProductToCart", "LoadCartProducts"},
        extensions = {"json"},
        methods = {"GET", "POST"}
)
public class ShoppingCart extends StrategyContextServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void initStrategies() {
        addStrategy("InsertProductToCart", new InsertProductToCartCommand(HttpMethodEnum.POST));
        addStrategy("LoadCartProducts", new LoadCartProductsCommand(HttpMethodEnum.GET));
    }

}