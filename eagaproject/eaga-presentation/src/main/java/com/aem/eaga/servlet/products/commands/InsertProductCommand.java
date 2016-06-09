package com.aem.eaga.servlet.products.commands;

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
public class InsertProductCommand extends AbstractContextCommand {
	private static final String j_nomeProdotto = "j_nomeProdotto";
	private static final String j_descrizioneProdotto = "j_descrizioneProdotto";
    private static final String j_prezzoProdotto = "j_prezzoProdotto";
    private static final String j_quantitaProdotto = "j_quantitaProdotto";
    private static final String j_categoriaProdotto = "j_categoriaProdotto";

    public InsertProductCommand(HttpMethodEnum methods) {
        super(methods);
    }

    @Override
    public void process(Context context) throws IOException {
    
    	SlingHttpServletRequest request = context.getSlingRequest();
    	final String nomeProdotto = request.getParameter(j_nomeProdotto);
    	final String descrizioneProdotto = request.getParameter(j_descrizioneProdotto);
        final String prezzoProdotto = request.getParameter(j_prezzoProdotto);
        final String quantitaProdotto = request.getParameter(j_quantitaProdotto);
        final String categoriaProdotto = request.getParameter(j_categoriaProdotto);
        String result = "";
        boolean status = true;
        
        try {
        	DbUtility dbu = new DbUtility();
	   		  
	   		 Connection conn = dbu.getConnection();
	   		 Statement stmt;
	   		 ResultSet rs;
	   		 stmt = conn.createStatement();
	   		 String sqlCheckProdotto = "SELECT * "
	   		 		+ "FROM prodotti "
	   		 		+ "WHERE nome = '"+nomeProdotto+"'";
	   		 rs = stmt.executeQuery(sqlCheckProdotto);
	   		 
	   		 if(!rs.next()){
	   			 String newRecordSql = "INSERT INTO eaga.prodotti (Nome,Descrizione,Prezzo,Quantita,Categoria)VALUES(?,?,?,?,?);";
	   			 PreparedStatement preparedStmt = conn.prepareStatement(newRecordSql);
	   	      preparedStmt.setString (1, nomeProdotto);
	   	      preparedStmt.setString (2, descrizioneProdotto);
	   	      preparedStmt.setString   (3, prezzoProdotto);
	   	      preparedStmt.setInt    (4, Integer.parseInt(quantitaProdotto));
	   	   preparedStmt.setString   (5, categoriaProdotto);
	   	      // execute the preparedstatement
	   	boolean res = preparedStmt.execute();
	   	       
	   	      conn.close();
	   			 
		   		 
		   		 if (!res){
		   			 result = "Success! New record inserted!";
		   			 logger.error(result);
		   			 stmt.close(); 
		       		 conn.close();
		       		 rs.close();
		       	}
	   		 } else {
	   			 result = "Error! This product is already recorded";
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
            
            answer.put("J_RESULT", result);
            
            
            write(context, answer);
        } catch (Exception e) {
            throw new IOException(e);
        }
    }

}
