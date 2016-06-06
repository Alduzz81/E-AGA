package com.aem.eaga.servlet.registration.commands;

import com.aem.eaga.Context;
import com.aem.eaga.api.portal.customer.Customer;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import java.io.IOException;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class LoadRegistrationCommand extends AbstractContextCommand {

	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
    public LoadRegistrationCommand(HttpMethodEnum methods) {
        super(methods);
    }

    @Override
    public void process(Context context) throws IOException {
    	logger.error("dentro a load registration");
        //Customer customer = context.getCustomer("ciao", "ciao", "ciao");
        try {
           // if (context.isAuthenticated()) {
            	  /* String customerID =context.getSlingRequest().getParameter("customerId");
                   String customerName = customer.getCustomerName(customerID);*/
                 
        	logger.error("dentro a try di load registration"); 
                JSONObject answer = new JSONObject() ;
                answer.put("chiave", "valore = success");

                write(context, answer);
            //}
        } catch (Exception e) {
            throw new IOException(e);
        }
    }
 
}
