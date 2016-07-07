package com.aem.eaga.servlet.immagini.commands;

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

public class LoadImageCommand extends AbstractContextCommand {
	private static final String J_PathI = "J_pathI";
	
	public LoadImageCommand(HttpMethodEnum methods) {
		super(methods);
	}

	@Override
	public void process(Context context) throws IOException {	
		SlingHttpServletRequest request = context.getSlingRequest();
		final String pathimmagine = request.getParameter(J_PathI);
		DbUtility dbu = new DbUtility();
		try {
			Connection conn = dbu.getConnection();
			Statement stmt;
			ResultSet rs;
			stmt = conn.createStatement();
			
			String loadRecordSql = "SELECT * "
					+"FROM immagini_prodotti "
					+"WHERE immagini_prodotti.PathImmagine='" + pathimmagine + "' ";
				
			rs = stmt.executeQuery(loadRecordSql);
			JSONObject immagine = new JSONObject();
			while (rs.next()) {
				try {
					immagine.put("IdProdotto", rs.getString("IdProdotto"));
					immagine.put("PathImmagine", rs.getString("PathImmagine"));
				} catch (Exception e) {
					throw new IOException(e);
				}
			}
			write(context, immagine);
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
	}
}
