package com.aem.eaga.servlet.personalDetails;

import com.aem.eaga.servlet.StrategyContextServlet;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import com.aem.eaga.servlet.personalDetails.commands.LoadPersonalDetailsCommand;
import com.aem.eaga.servlet.registration.commands.LoadRegistrationCommand;
import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;

@Service
@SlingServlet(
        resourceTypes = {"cq:Page"},
        selectors = {"loadPersonalDetails"},
        extensions = {"json"},
        methods = {"GET"}
)
public class PersonalDetailsServlet extends StrategyContextServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void initStrategies() {
        addStrategy("loadPersonalDetails", new LoadPersonalDetailsCommand(HttpMethodEnum.GET));
    }

}