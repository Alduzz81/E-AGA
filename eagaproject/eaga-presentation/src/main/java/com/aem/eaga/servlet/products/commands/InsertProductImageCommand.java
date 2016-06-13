package com.aem.eaga.servlet.products.commands;

import com.aem.eaga.Context;
import com.aem.eaga.api.portal.customer.Customer;
import com.aem.eaga.common.DbUtility;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class InsertProductImageCommand{
	
	public static String addImage(String productImagePath) throws IOException{
       try {
        	DbUtility dbu = new DbUtility();
	   		  
	   		 Connection conn = dbu.getConnection();
	   		 Statement stmt;
	   		 ResultSet rs;
	   		 stmt = conn.createStatement();
	   		 //TODO Add the code for sql insert for the image
	   		   	       
	   	      conn.close();
	   	
    }catch(Exception e) {
        throw new IOException(e);
    } return "TEST";
	}
}
