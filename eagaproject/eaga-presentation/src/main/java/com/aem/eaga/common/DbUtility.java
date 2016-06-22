package com.aem.eaga.common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DbUtility {
    private final Logger LOG = LoggerFactory.getLogger(getClass());
    public Connection getConnection() throws ClassNotFoundException, SQLException {
    	 Class.forName("com.mysql.jdbc.Driver");
   		 Connection conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1/eaga?" 
   				 		   + "user=root&password=root" );
   		 return conn;
   		
  		 
  		 
    }
}
