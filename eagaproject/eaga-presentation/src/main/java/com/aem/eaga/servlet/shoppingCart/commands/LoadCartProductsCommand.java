package com.aem.eaga.servlet.shoppingCart.commands;


import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.aem.eaga.Context;
import com.aem.eaga.common.DbUtility;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;

public class LoadCartProductsCommand extends AbstractContextCommand {
	private static final String j_customerId = "j_customerId";

    public LoadCartProductsCommand(HttpMethodEnum methods) {
        super(methods);
    }

    @Override
    public void process(Context context) throws IOException {
    	logger.info("START LOAD CART PRODUCTS SERVLET");
    	SlingHttpServletRequest request = context.getSlingRequest();
    	final String customerId = request.getParameter(j_customerId);

        JSONObject cartList = new JSONObject();
        
        try {
        	DbUtility dbu = new DbUtility();
	   		Connection conn = dbu.getConnection();
	   		Statement stmt;
	   		ResultSet rs = null;
	   		stmt = conn.createStatement();

	   		String retrieveCartProducts = "SELECT * FROM eaga.v_cartlist "
	   				+ "WHERE IdUtente = " + Integer.parseInt(customerId);
	   		rs = stmt.executeQuery(retrieveCartProducts);
	   			   		
	   		while(rs.next()){

				JSONObject singleProduct = new JSONObject();
				try {
					singleProduct.put("IdProdotto", rs.getInt("IdProdotto"));
					singleProduct.put("NomeProdotto", rs.getString("Nome"));
					singleProduct.put("DescrizioneProdotto", rs.getString("Descrizione"));
					singleProduct.put("PrezzoProdotto", rs.getFloat("Prezzo"));
					singleProduct.put("QuantitaProdotto", rs.getInt("Quantita"));
					singleProduct.put("QuantitaSelezionata", rs.getInt("QuantitaSelezionata"));
					singleProduct.put("CategoriaProdotto", rs.getString("Categoria"));
					
					cartList.put("Prodotto_" + rs.getInt("IdProdotto"), singleProduct);
					
				} catch (JSONException e) {
					logger.error("YYYYZZZZ - JSON ERROR - " + e.getMessage());
					e.printStackTrace();
				}
	   		}
	   		
	   		stmt.close(); 
			conn.close();
			rs.close();
	   		
	   	} catch(ClassNotFoundException e) {
	   		logger.error("LOAD CART PRODUCTS SERVLET - CLASS NOT FOUND - " + e.getMessage());
	   	} catch(SQLException e) {
	   		logger.error("LOAD CART PRODUCTS SERVLET - SQL ERROR - " + e.getMessage());
	   	} 
        
        write(context, cartList);
        logger.info("END LOAD CART PRODUCTS SERVLET");
    }

}
