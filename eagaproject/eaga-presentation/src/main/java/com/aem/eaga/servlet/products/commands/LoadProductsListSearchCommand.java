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

public class LoadProductsListSearchCommand extends AbstractContextCommand {
	private static final String J_Categoria = "J_categoria";
	private static final String J_Search = "J_search";

	public LoadProductsListSearchCommand(HttpMethodEnum methods) {
		super(methods);
	}

	@Override
	public void process(Context context) throws IOException {
		SlingHttpServletRequest request = context.getSlingRequest();
		final String categoria = request.getParameter(J_Categoria);
		final String search = request.getParameter(J_Search);
    	
		DbUtility dbu = new DbUtility();
		try {
			Connection conn = dbu.getConnection();
			Statement stmt;
			ResultSet rs;
			stmt = conn.createStatement();
			String sqlProdotti;
			
			if(categoria.equals("1")){
				sqlProdotti = "SELECT * "
		 		 		+ "FROM v_lista_prodotti "
		 		 		+ "WHERE (Nome like '%" + search + "%') OR (Descrizione like '%" + search + "%') ";
			}else{
				sqlProdotti = "SELECT * "
		 		 		+ "FROM v_lista_prodotti_search "
		 		 		+ "WHERE (IdCategoria='" + categoria + "' AND Nome like '%" + search + "%') OR (IdCategoria='" + categoria + "' AND Descrizione like '%" + search + "%') ";
			}
			
			rs = stmt.executeQuery(sqlProdotti);
			JSONObject prodotti = new JSONObject();
			while (rs.next()) {
				try {
					JSONObject prodotto = new JSONObject();
					prodotto.put("IdProdotto", rs.getInt("IdProdotto"));
					prodotto.put("NomeProdotto", rs.getString("Nome"));
					prodotto.put("PrezzoProdotto", rs.getString("Prezzo"));
					prodotto.put("QuantitaProdotto", rs.getInt("Quantita"));
					prodotto.put("PathImmagine", rs.getString("PathImmagine"));
					prodotti.put("Prodotto-" + rs.getInt("IdProdotto"), prodotto);
				} catch (Exception e) {
					logger.error("Errore =" + e.getMessage());
					throw new IOException(e);
				}
			}
			write(context, prodotti);
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
	}

}
