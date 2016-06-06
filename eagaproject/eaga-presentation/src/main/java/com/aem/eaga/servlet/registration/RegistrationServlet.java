package com.aem.eaga.servlet.registration;

import com.aem.eaga.servlet.StrategyContextServlet;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import com.aem.eaga.servlet.registration.commands.LoadRegistrationCommand;
import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;

@Service
@SlingServlet(
        resourceTypes = {"cq:Page"},
        selectors = {"loadRegistration"},
        extensions = {"json"},
        methods = {"GET"}
)
public class RegistrationServlet extends StrategyContextServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void initStrategies() {
        addStrategy("loadRegistration", new LoadRegistrationCommand(HttpMethodEnum.GET));
    }

}