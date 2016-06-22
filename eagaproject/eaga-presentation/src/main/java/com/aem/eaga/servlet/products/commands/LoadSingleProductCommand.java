package com.aem.eaga.servlet.products.commands;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.json.JSONObject;

import com.aem.eaga.Context;
import com.aem.eaga.common.DbUtility;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;

public class LoadSingleProductCommand  extends AbstractContextCommand {
	private static final String j_idProdotto = "j_idProdotto";
	public LoadSingleProductCommand(HttpMethodEnum methods) {
	        super(methods);
	    }
	 
 	@Override
    public void process(Context context) throws IOException {
	SlingHttpServletRequest request = context.getSlingRequest();
    final String idProdotto = request.getParameter(j_idProdotto);
	logger.error("Alduzz sono dentro alla servlet LoadSingleProduct");
	DbUtility dbu = new DbUtility();
	try {
		Connection conn = dbu.getConnection();
   		Statement stmt;
 		ResultSet rs;
 		stmt = conn.createStatement();
 		String findProductSQL = "SELECT * "
 		 		+ "FROM prodotti WHERE IdProdotto = " +idProdotto;
 		rs = stmt.executeQuery(findProductSQL);
 		 
 		JSONObject prodotto = new JSONObject();
 		 
 		if (rs.next()){
 			try { 
 			 	prodotto.put("IdProdotto", rs.getInt("IdProdotto"));
	 			prodotto.put("NomeProdotto", rs.getString("Nome"));
	 			prodotto.put("DescrizioneProdotto", rs.getString("Descrizione"));
	 			prodotto.put("PrezzoProdotto", rs.getFloat("Prezzo")); //getString
	 			prodotto.put("QuantitaProdotto", rs.getInt("Quantita"));
	 			prodotto.put("CategoriaProdotto", rs.getString("Categoria"));

 			} catch (Exception e) {
 				logger.error("Alduzz Errore =" +e.getMessage());
 	            throw new IOException(e);
 	        }
 		 }
 		
 		String findProductImagesSQL = "SELECT PathImmagine "
 		 		+ "FROM immagini_prodotti WHERE IdProdotto = " +idProdotto;
 		rs = stmt.executeQuery(findProductImagesSQL);
 		
 		JSONObject productImages = new JSONObject();
 		
 		int increment = 1;
 		while (rs.next()){
 						
 			try { 
 				productImages.put("ImmagineProdotto_" + increment, rs.getString("PathImmagine"));
	 			increment++;

 			} catch (Exception e) {
 				logger.error("Alduzz Errore = " +e.getMessage());
 	            throw new IOException(e);
 	        }
 			
 		}
 		
		stmt.close(); 
		conn.close();
		rs.close();
 		
 		try { 
			prodotto.put("ImmaginiProdotto", productImages );

		} catch (Exception e) {
			logger.error("Alduzz Errore =" +e.getMessage());
            throw new IOException(e);
        }

 		write(context, prodotto);
 		
   	} catch(ClassNotFoundException e) {
   		logger.error(e.getMessage());
   	} catch(SQLException e) {
   		logger.error(e.getMessage());
   	} 
 }

}
