package com.aem.eaga.sightly.registration;

import javax.jcr.Node;
import com.aem.eaga.common.CommonUse;
import com.aem.eaga.common.CommonUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Registration extends CommonUse {
	
	private static final Logger LOG = LoggerFactory.getLogger(Registration.class);
	private Node currentNode;
	private String logo;
	private String title;
	private String user;
	private String email;
	private String password;
	private String password2;
	private String buttonReq;
	private String informativa;
	
	@Override
	public void activate() throws Exception {
		LOG.info("====================== Registration Activate Start ======================");
		
		currentNode = get("currentNode", Node.class);
        if (currentNode == null) {
            return;
        }
        
        logo = CommonUtility.getPropertyValue(currentNode, "logo");
		title = CommonUtility.getPropertyValue(currentNode, "title");
		user = CommonUtility.getPropertyValue(currentNode, "user");
		email = CommonUtility.getPropertyValue(currentNode, "email");
		password = CommonUtility.getPropertyValue(currentNode, "password");
		password2 = CommonUtility.getPropertyValue(currentNode, "password2");
		buttonReq = CommonUtility.getPropertyValue(currentNode, "buttonReq");
		informativa = CommonUtility.getPropertyValue(currentNode, "informativa");
		
		if (!isConfigured()) {
			return;
		}
		
		LOG.info("====================== Registration Activate End ======================");
	}

	private boolean isConfigured() {
		return (title == null || user == null || email == null || password == null) ? false : true;
	}
	
	public String getLogo() {
		return logo;
	}

	public String getTitle() {
		return title;
	}

	public String getUser() {
		return user;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getPassword2() {
		return password2;
	}

	public String getButtonReq() {
		return buttonReq;
	}

	public String getInformativa() {
		return informativa;
	}

}
