package com.aem.eaga.servlet.categorie.commands;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import com.aem.eaga.Context;
import com.aem.eaga.common.DbUtility;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;

public class LoadCategorieCommand extends AbstractContextCommand {
	
	public LoadCategorieCommand(HttpMethodEnum methods) {
		super(methods);
	}

	@Override
	public void process(Context context) throws IOException {

		DbUtility dbu = new DbUtility();
		JSONObject categorie = new JSONObject();
		try {
			Connection conn = dbu.getConnection();
			Statement stmt;
			ResultSet rs;
			stmt = conn.createStatement();
			
			
			String loadRecordSql = "SELECT * "
					+"FROM categorie ";
				
			rs = stmt.executeQuery(loadRecordSql);
			int i=0;
			while (rs.next()) {
				JSONObject categoria = new JSONObject();
				try{
					categoria.put("IdCategoria", rs.getInt("IdCategoria"));
					categoria.put("Nome", rs.getString("Nome"));
					categorie.put("IdCategoria_"+i,categoria);
					i++;
				} catch (Exception e) {
					throw new IOException(e);
				}
			}
			write(context, categorie);
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
	}
}
