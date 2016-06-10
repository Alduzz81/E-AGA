package com.aem.eaga.servlet.registration.commands;

import com.aem.eaga.Context;
import com.aem.eaga.api.portal.customer.Customer;
import com.aem.eaga.common.DbUtility;
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

public class InsertRegistrationCommand extends AbstractContextCommand {
	
	private static final String J_USER_NAME = "j_username";
	private static final String J_EMAIL = "j_email";
    private static final String J_PASSWORD = "j_password";
    private static final String J_RESULT = "j_result";
    private static final String J_STATUS = "j_status";
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
    public InsertRegistrationCommand(HttpMethodEnum methods) {
        super(methods);
    }

    @Override
    public void process(Context context) throws IOException {
    
    	SlingHttpServletRequest request = context.getSlingRequest();
    	final String username = request.getParameter(J_USER_NAME);
    	final String email = request.getParameter(J_EMAIL);
        final String password = request.getParameter(J_PASSWORD);
        String result = "";
        boolean status = true;
        DbUtility dbu = new DbUtility();
	    try {
		 Connection conn = dbu.getConnection();
	   		 Statement stmt;
	   		 ResultSet rs;
	   		 stmt = conn.createStatement();
	   		 String checkEmailSql = "SELECT * "
	   		 		+ "FROM utenti "
	   		 		+ "WHERE Email = '"+email+"'";
	   		 rs = stmt.executeQuery(checkEmailSql);
	   		 
	   		 if(!rs.next()){
	   			 String newRecordSql = "INSERT INTO utenti "
		   		 		+ "(Nome, Email, Password) "
		   		 		+ "VALUES ('"+username+"', '"+email+"', '"+password+"')";
		   		 boolean res = stmt.execute(newRecordSql);
		   		 
		   		 if (!res){
		   			 result = "Success! New record inserted!";
		   			 logger.error(result);
		   			 stmt.close(); 
		       		 conn.close();
		       		 rs.close();
		       	}
	   		 } else {
	   			 result = "Error! This email is already recorded";
	   			 status = false;
	   			 stmt.close(); 
	       		 conn.close();
	       		 rs.close();
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
            answer.put(J_RESULT, result);
            answer.put(J_STATUS, status);
            
            write(context, answer);
        } catch (Exception e) {
            throw new IOException(e);
        }
    }

}
