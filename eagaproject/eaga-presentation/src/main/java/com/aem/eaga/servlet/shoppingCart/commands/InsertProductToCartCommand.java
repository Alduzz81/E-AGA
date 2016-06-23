package com.aem.eaga.servlet.shoppingCart.commands;

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
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class InsertProductToCartCommand extends AbstractContextCommand {
	private static final String j_customerId = "j_customerId";
	private static final String j_productId = "j_productId";
    private static final String j_productAddedQuantity = "j_productAddedQuantity";

    public InsertProductToCartCommand(HttpMethodEnum methods) {
        super(methods);
    }

    @Override
    public void process(Context context) throws IOException {
    	logger.info("START INSERT PRODUCT TO CART SERVLET");
    	SlingHttpServletRequest request = context.getSlingRequest();
    	SlingHttpServletResponse response = context.getSlingResponse();
    	final String customerId = request.getParameter(j_customerId);
    	final String productId = request.getParameter(j_productId);
        final String productAddedQuantity = request.getParameter(j_productAddedQuantity);

        boolean isProductAlreadySaved = false;
        boolean isDesiredQuantityReduced = false;
        String result = "";
    	int totQuantity = 0;
        
        try {
        	DbUtility dbu = new DbUtility();
	   		Connection conn = dbu.getConnection();
	   		Statement stmt;
	   		ResultSet rs = null;
	   		stmt = conn.createStatement();
	   		
	   		String checkPresence = "SELECT * FROM eaga.carrello_utenti "
	   				+ "WHERE IdUtente = " + Integer.parseInt(customerId) + " AND "
	   				+ "IdProdotto = " + Integer.parseInt(productId);
	   		rs = stmt.executeQuery(checkPresence);
	   		
	   		if(rs.next()){
	   			isProductAlreadySaved = true;
	   			int subTot = rs.getInt("Quantita");
	   			int newSubTot = subTot + Integer.parseInt(productAddedQuantity);
	   			
	   			String checkMaxAvailableProductQuantity = "SELECT Quantita FROM eaga.prodotti"
	   					+ " WHERE IdProdotto = " + Integer.parseInt(productId);
	   			rs = stmt.executeQuery(checkMaxAvailableProductQuantity);
	   			
	   			if(rs.next()){
	   				int maxQuantity = rs.getInt(1);
	   				if( maxQuantity <= newSubTot ){
	   					newSubTot = maxQuantity;
	   					isDesiredQuantityReduced = true;
	   				}
	   			}	
	   			
	   			String updateQuantity = "UPDATE eaga.carrello_utenti"
	   					+ " SET Quantita = " + newSubTot 
	   					+ " WHERE IdUtente = " + Integer.parseInt(customerId) + " AND "
		   				+ " IdProdotto = " + Integer.parseInt(productId);
	   			boolean res = stmt.execute(updateQuantity);
	   			
	   			if(!res){
	   				result = "Success! Well done insert into cart!";
					logger.info(result);
					
					String totalQuantity = "SELECT SUM(Quantita) FROM carrello_utenti WHERE IdUtente = " + Integer.parseInt(customerId);
					rs = stmt.executeQuery(totalQuantity);
					if(rs.next()){
						totQuantity = rs.getInt(1);
					}
					
	   			} else {
	   				result = "Error! Something's gone wrong!";
	   			}
	   			
				stmt.close(); 
				conn.close();
				rs.close();
   			
	   		} else {
		   		
		   		String newRecordSql = "INSERT INTO eaga.carrello_utenti (IdUtente, IdProdotto, Quantita) VALUES(?,?,?);";
	   			PreparedStatement preparedStmt = conn.prepareStatement(newRecordSql);
				preparedStmt.setInt (1, Integer.parseInt(customerId));
				preparedStmt.setInt (2, Integer.parseInt(productId));
				preparedStmt.setInt (3, Integer.parseInt(productAddedQuantity));
				boolean res = preparedStmt.execute();
	
				if (!res){
					result = "Success! Well done insert into cart!";
					logger.info(result);
					
					String totalQuantity = "SELECT SUM(Quantita) FROM carrello_utenti WHERE IdUtente = " + Integer.parseInt(customerId);
					rs = stmt.executeQuery(totalQuantity);
					if(rs.next()){
						totQuantity = rs.getInt(1);
					}
									
				} else {
					result = "Error! Something's gone wrong!";
				}
				
				preparedStmt.close();
				stmt.close(); 
				conn.close();
				rs.close();
				
				logger.info("END INSERT PRODUCT TO CART SERVLET");
	   		}
	   	} catch(ClassNotFoundException e) {
	   		logger.error(e.getMessage());
	   	} catch(SQLException e) {
	   		logger.error(e.getMessage());
	   	} 
        
        try {            
        	JSONObject answer = new JSONObject();
            answer.put("J_RESULT", result);
            answer.put("J_TOT_QNT", totQuantity);
            answer.put("J_IS_UPDATED", isProductAlreadySaved);
            answer.put("J_IS_QNT_REDUCED", isDesiredQuantityReduced);
            
            write(context, answer);
            
        } catch (Exception e) {
            throw new IOException(e);
        }
    }

}
