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
    	logger.error("YYYYZZZZ - DENTRO A SERVLET DI CART - ");
    	SlingHttpServletRequest request = context.getSlingRequest();
    	final String customerId = request.getParameter(j_customerId);

        JSONObject cartList = new JSONObject();
        
        try {
        	DbUtility dbu = new DbUtility();
	   		Connection conn = dbu.getConnection();
	   		Statement stmt;
	   		ResultSet rs = null;
	   		ResultSet rsProd = null;
	   		stmt = conn.createStatement();
	   		logger.error("YYYYZZZZ - DENTRO A SERVLET DI CART - TRY ");
	   		String retrieveCartProducts = "SELECT * FROM eaga.carrello_utenti "
	   				+ "WHERE IdUtente = " + Integer.parseInt(customerId);
	   		rs = stmt.executeQuery(retrieveCartProducts);
	   			   		
	   		while(rs.next()){
	   			logger.error("YYYYZZZZ - DENTRO A SERVLET DI CART - WHILE");
				int productId = rs.getInt("IdProdotto");
				String retrieveSingleProduct = "SELECT * FROM eaga.prodotti "
		   				+ "WHERE IdProdotto = " + productId;
				rsProd = stmt.executeQuery(retrieveSingleProduct);
	   			
				if(rsProd.next()){
					JSONObject singleProduct = new JSONObject();
					try {
						singleProduct.put("IdProdotto", rsProd.getInt("IdProdotto"));
						singleProduct.put("NomeProdotto", rsProd.getString("Nome"));
						singleProduct.put("DescrizioneProdotto", rsProd.getString("Descrizione"));
						singleProduct.put("PrezzoProdotto", rsProd.getFloat("Prezzo"));
						singleProduct.put("QuantitaProdotto", rsProd.getInt("Quantita"));
						singleProduct.put("QuantitaSelezionata", rs.getInt("Quantita"));
						singleProduct.put("CategoriaProdotto", rsProd.getString("Categoria"));
						
						cartList.put("Prodotto_" + rsProd.getInt("IdProdotto"), singleProduct);
						
						
						
					} catch (JSONException e) {
						logger.error("YYYYZZZZ - JSON ERROR - " + e.getMessage());
						e.printStackTrace();
					}
				}
				
	   		}
	   		
	   		stmt.close(); 
			conn.close();
			rs.close();
			rsProd.close();
	   		
	   	} catch(ClassNotFoundException e) {
	   		logger.error("YYYYZZZZ - DENTRO A SERVLET DI CART - CLASS NOT FOUND");
	   		logger.error(e.getMessage());
	   	} catch(SQLException e) {
	   		logger.error("YYYYZZZZ - DENTRO A SERVLET DI CART - SQL ERROR");
	   		logger.error(e.getMessage());
	   	} 
        
        write(context, cartList);
    }

}
