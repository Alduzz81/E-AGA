package com.aem.eaga.servlet.personalDetails.commands;

import com.aem.eaga.Context;
import com.aem.eaga.common.DbUtility;
import com.aem.eaga.servlet.commands.AbstractContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UpdatePersonalDetailsCommand extends AbstractContextCommand {
	private static final String J_ID = "j_id";
	private static final String J_PASSWORD = "j_password";
	private static final String J_RESULT = "j_result";
	private static final String J_STATUS = "j_status";
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	public UpdatePersonalDetailsCommand(HttpMethodEnum methods) {
		super(methods);
	}

	@Override
	public void process(Context context) throws IOException {

		SlingHttpServletRequest request = context.getSlingRequest();
		final String id = request.getParameter(J_ID);
		final String password = request.getParameter(J_PASSWORD);
		String result = "";
		boolean status = true;
		
		DbUtility dbu = new DbUtility();
		try {
			Connection conn = dbu.getConnection();
			Statement stmt;
			stmt = conn.createStatement();
			
			String updateRecordSql = "UPDATE utenti " + "SET Password='" + password + "' "
									+"WHERE utenti.IdUtente='" + id + "' ";
			
			boolean res = stmt.execute(updateRecordSql);
			if (res) {
				result = "Failed update!";
				status = false;
				stmt.close();
				conn.close();
			} else {
				result = "Success update!";
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
			answer.put(J_ID, id);
			answer.put(J_PASSWORD, password);
			answer.put(J_RESULT, result);
			answer.put(J_STATUS, status);
			write(context, answer);
		} catch (Exception e) {
			throw new IOException(e);
		}
	}
}
