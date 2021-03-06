package com.aem.eaga.servlet.products.commands;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.sling.commons.json.JSONObject;

import com.aem.eaga.Context;
import com.aem.eaga.common.DbUtility;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;

public class LoadProductsCommand  extends AbstractContextCommand {
	 public LoadProductsCommand(HttpMethodEnum methods) {
	        super(methods);
	    }
	 @Override
	    public void process(Context context) throws IOException {
		 logger.error("Alduzz sono dentro alla servlet");
		 DbUtility dbu = new DbUtility();
		 try {
   		 Connection conn = dbu.getConnection();
   		 Statement stmt;
 		 ResultSet rs;
 		 stmt = conn.createStatement();
 		 String sqlProdotti = "SELECT * "
 		 		+ "FROM prodotti ";
 		 rs = stmt.executeQuery(sqlProdotti);
 		 JSONObject prodotti = new JSONObject();
 		 while (rs.next())
 		 {
 			try { 
 			JSONObject prodotto = new JSONObject();		 
 			prodotto.put("IdProdotto", rs.getInt("IdProdotto"));
 			prodotto.put("NomeProdotto", rs.getString("Nome"));
 			prodotto.put("DescrizioneProdotto", rs.getString("Descrizione"));
 			prodotto.put("PrezzoProdotto", rs.getString("Prezzo"));
 			prodotto.put("QuantitaProdotto", rs.getInt("Quantita"));
 			prodotto.put("CategoriaProdotto", rs.getString("Categoria"));
 			prodotti.put("Prodotto-"+rs.getInt("IdProdotto"), prodotto);
 			 } catch (Exception e) {
 				logger.error("Alduzz Errore =" +e.getMessage());
 	            throw new IOException(e);
 	        }
 		 }
 		   write(context, prodotti);
	   	} catch(ClassNotFoundException e) {
	   		logger.error(e.getMessage());
	   	} catch(SQLException e) {
	   		logger.error(e.getMessage());
	   	} 
	 }

}
