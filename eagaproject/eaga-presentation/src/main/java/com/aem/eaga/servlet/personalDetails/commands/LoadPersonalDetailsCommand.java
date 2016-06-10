package com.aem.eaga.servlet.personalDetails.commands;

import com.aem.eaga.Context;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoadPersonalDetailsCommand extends AbstractContextCommand {
	private static final String J_ID = "j_id";
	private static final String J_NAME = "j_name";
	private static final String J_EMAIL = "j_email";
	private static final String J_PASSWORD = "j_password";
	private static final String J_RESULT = "j_result";
	private static final String J_STATUS = "j_status";
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	public LoadPersonalDetailsCommand(HttpMethodEnum methods) {
		super(methods);
	}

	@Override
	public void process(Context context) throws IOException {

		SlingHttpServletRequest request = context.getSlingRequest();
		final String id = request.getParameter(J_ID);
		final String name = request.getParameter(J_NAME);
		final String email = request.getParameter(J_EMAIL);
		final String password = request.getParameter(J_PASSWORD);
		String result = "";
		boolean status = true;

		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection conn = DriverManager
					.getConnection("jdbc:mysql://10.107.104.16/eaga?" + "user=eaga&password=eaga");
			Statement stmt;
			stmt = conn.createStatement();
			
			//MOCK
			String name1="aaa";
			String email1="aaa";
			String password1="aaa";
			int id1=20;
			//FINE MOCK
			
			String updateRecordSql = "UPDATE utenti" 
					+ "SET Nome='" + name1 + "', Email='" + email1 + "', Password='" + password1 + "'" 
					+ "WHERE utenti.idUtente='" + id1 + "'";
			boolean res = stmt.executeQuery(updateRecordSql) != null;
			if (!res) {
				result = "Success update!";
				logger.error(result);
				stmt.close();
				conn.close();
			}
			else{
				result = "Failed update!";
				logger.error(result);
				stmt.close();
				conn.close();
			}
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}

		try {
			JSONObject answer = new JSONObject();
			answer.put(J_ID, name);
			answer.put(J_NAME, name);
			answer.put(J_EMAIL, email);
			answer.put(J_PASSWORD, password);
			answer.put(J_RESULT, result);
			answer.put(J_STATUS, status);

			write(context, answer);
		} catch (Exception e) {
			throw new IOException(e);
		}
	}

}
