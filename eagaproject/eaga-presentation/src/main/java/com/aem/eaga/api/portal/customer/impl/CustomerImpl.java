package com.aem.eaga.api.portal.customer.impl;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Modified;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.personalization.UserPropertiesUtil; 


import com.aem.eaga.api.portal.customer.Customer;
import com.aem.eaga.common.DbUtility;


@Component
@Service
public class CustomerImpl implements Customer {

	private Logger logger = LoggerFactory.getLogger(getClass());
	public final static String XTOKEN = "XTOKEN";
	private String session_token, username, userid;
	//TODO use hibernate for the mysql


	@Activate
	protected void activate(ComponentContext componentContext) {
		logger.debug("OSGi Service[ " + getClass().getName() + " ] activated");
	}

	@Modified
	protected void modify(final ComponentContext componentContext) {
		activate(componentContext);
	}

	@Deactivate
	protected void deactivate(ComponentContext componentContext) {
		logger.debug("OSGi Service[ " + getClass().getName() + " ] deativated");
	}

	@Override
	public String getCustomerName(String customerId) {
		return null;
	}


	@Override
	public void sendLoginRequest(String username, String password) {
		throw new UnsupportedOperationException("Not supported yet.");
	}

	@Override
	public boolean isAuthenticated(SlingHttpServletRequest request) {
		logger.debug(" isAuthenticated request class : " + request.getClass());
		logger.debug(" isAuthenticated request : " + request.getLocalAddr());
		logger.debug(" isAuthenticated request xxx TOKEN parameters : " + request.getParameter(XTOKEN));

		String token = request.getParameter(XTOKEN);

		// TODO: check Request HEADER:XTOKENi and extract ContactID from TOKEN
		String customerId = UUID.randomUUID().toString().substring(0, 10);
		request.setAttribute("customerId", customerId);

		/*
		 * Looking for cookie
		 */
		if (token == null || token.isEmpty()) {
			Cookie[] cookies = request.getCookies();
			if (cookies == null) {
				return false;
			}
			for (Cookie cookie: cookies) {
				logger.debug(" isAuthenticated request COOKIE: " + cookie.getName() + " val: " + cookie.getValue());

				if (cookie.getName().equalsIgnoreCase(XTOKEN) && !UserPropertiesUtil.isAnonymous(request)) {
					token = cookie.getValue();
					logger.debug("================ isAuthenticated TRUE cookie ===============");
				}
			}
		}
		if (token == null) {
			return false;
		}
		return true;
	}

	@Override
	public String getToken(String username, String password) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection conn = new DbUtility().getConnection();
			Statement stmt;
			PreparedStatement pstmt;
			ResultSet rs;
			stmt = conn.createStatement();
			String sql ="SELECT IdUtente,Nome,Session_token from utenti where email='"+username+"' and password='"+password+"'";
			rs = stmt.executeQuery(sql);
			if (rs.next())
			{
				username = rs.getString("Nome");
				userid = String.valueOf(rs.getInt("IdUtente"));
				session_token = rs.getString("Session_token");

				logger.error("loggato");
				stmt.close(); 

				rs.close();
				conn.close();
				return username;
			}
			else
			{
				logger.error("non loggato");
				stmt.close(); 

				rs.close();
				conn.close();
				return null;
			}


		}  catch(ClassNotFoundException e)
		{
			logger.error(e.getMessage());
		}
		catch(SQLException e)

		{

			logger.error(e.getMessage());

		}


		return StringUtils.EMPTY;
	}

	public void login(SlingHttpServletResponse response, String url) {
		/*
		 * Redirect, CIAM will do it
		 */
		//  portalService.loginCIAM(response, url);
		return ;
	}

	@Override
	public String getCustomerID(SlingHttpServletRequest request) {
		// TODO: calculate if from TOKEN
		return (String) request.getAttribute("customerId");
	}

	@Override
	public Map<String, String> getCustomer(String token, String username, String password) {
		Map<String, String> customer;
		/*
		 * TODO bind the JSON structure with CSM Customer Entity Object
		 */
		customer = new HashMap<>();
		customer.put("contactID", username);
		customer.put("password", password);
		customer.put("sessionToken", session_token);
		customer.put("userID", userid);
		return customer;

	}

	public boolean setSessionToken(String token, String userid){
		boolean status = false;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection conn = new DbUtility().getConnection();
			Statement stmt;
			PreparedStatement pstmt;
			boolean rs;
			stmt = conn.createStatement();
			String sql ="UPDATE eaga.utenti SET Session_token='" +token+"' WHERE IdUtente=" +userid+";";
			rs = stmt.execute(sql);
			stmt.close(); 
			conn.close();
		} catch(ClassNotFoundException e){
			logger.error(e.getMessage());
		} catch(SQLException e) {
			logger.error(e.getMessage());
		}
		return status;
	}
}

