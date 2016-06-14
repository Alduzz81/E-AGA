package com.aem.eaga.servlet.personalDetails.commands;

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

public class LoadPersonalDetailsCommand extends AbstractContextCommand {
	public LoadPersonalDetailsCommand(HttpMethodEnum methods) {
		super(methods);
	}

	@Override
	public void process(Context context) throws IOException {
		DbUtility dbu = new DbUtility();
		try {
			Connection conn = dbu.getConnection();
			Statement stmt;
			ResultSet rs;
			stmt = conn.createStatement();
			String loadRecordSql = "SELECT * " + "FROM utenti ";
			rs = stmt.executeQuery(loadRecordSql);
			JSONObject utente = new JSONObject();
			while (rs.next()) {
				try {
					utente.put("IdUtente", rs.getInt("IdUtente"));
					utente.put("Nome", rs.getString("Nome"));
					utente.put("Email", rs.getString("Email"));
					utente.put("Password", rs.getString("Password"));
				} catch (Exception e) {
					throw new IOException(e);
				}
			}
			write(context, utente);
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
	}
}
