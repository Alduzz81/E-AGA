package com.aem.eaga.servlet.personalDetails;

import com.aem.eaga.servlet.StrategyContextServlet;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import com.aem.eaga.servlet.personalDetails.commands.UpdatePersonalDetailsCommand;
import com.aem.eaga.servlet.personalDetails.commands.LoadPersonalDetailsCommand;

import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;

@Service
@SlingServlet(
        resourceTypes = {"cq:Page"},
        selectors = {"UpdatePersonalDetails", "LoadPersonalDetails"},
        extensions = {"json"},
        methods = {"GET", "POST"}
)
public class PersonalDetailsServlet extends StrategyContextServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void initStrategies() {
        addStrategy("UpdatePersonalDetails", new UpdatePersonalDetailsCommand(HttpMethodEnum.POST));
        addStrategy("LoadPersonalDetails", new LoadPersonalDetailsCommand(HttpMethodEnum.GET));
    }
}