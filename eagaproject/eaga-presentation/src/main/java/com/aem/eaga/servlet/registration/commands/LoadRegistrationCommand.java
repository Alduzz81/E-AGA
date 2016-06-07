package com.aem.eaga.servlet.registration.commands;

import com.aem.eaga.Context;
import com.aem.eaga.api.portal.customer.Customer;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoadRegistrationCommand extends AbstractContextCommand {
	
	private static final String J_USER_NAME = "j_username";
	private static final String J_EMAIL = "j_email";
    private static final String J_PASSWORD = "j_password";
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
    public LoadRegistrationCommand(HttpMethodEnum methods) {
        super(methods);
    }

    @Override
    public void process(Context context) throws IOException {
    
    	SlingHttpServletRequest request = context.getSlingRequest();
    	final String username = request.getParameter(J_USER_NAME);
    	final String email = request.getParameter(J_EMAIL);
        final String password = request.getParameter(J_PASSWORD);
        
        
        try {
	   		 Class.forName("com.mysql.jdbc.Driver");
	   		 Connection conn = DriverManager.getConnection("jdbc:mysql://10.107.104.16/eaga?" + "user=eaga&password=eaga" );
	   		 Statement stmt;
	   		 stmt = conn.createStatement();
	   		 String sql ="INSERT INTO utenti (Nome, Email, Password) VALUES ('"+username+"', '"+email+"', '"+password+"')";
	   		 logger.error("string sql= "+sql);
	   		 boolean res = stmt.execute(sql);
	   		 
	   		 if (!res){
	   			 logger.error("Success! New record inserted!");
	   			 stmt.close(); 
	       		 conn.close();
	       	} else {
	   			 stmt.close(); 
	       		 conn.close();
	   		 }	   		 
	   	} catch(ClassNotFoundException e) {
	   		logger.error(e.getMessage());
	   	} catch(SQLException e) {
	   		logger.error(e.getMessage());
	   	}
        
        try {            
        	JSONObject answer = new JSONObject();
            answer.put(J_USER_NAME, username);
            answer.put(J_EMAIL, email);
            answer.put(J_PASSWORD, password);
            
            write(context, answer);
        } catch (Exception e) {
            throw new IOException(e);
        }
    }

}
