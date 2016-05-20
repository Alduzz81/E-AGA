/*package com.aem.eaga.sightly.registration;
 
 

import javax.jcr.Node;

import com.aem.eaga.common.CommonUse;
import com.aem.eaga.common.CommonUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Registration   extends CommonUse  {
	  private static final Logger LOG = LoggerFactory.getLogger(Registration.class);
	 private Node currentNode;
	    private String firstMsg;
	    private String labelUtente;
	    private String labelEmail;
	    private String labelPassword;
	    private String labelPassword2;
	    private String labelButtonReq;
	    private String txtInformativa;
	 public void activate() throws Exception {
		 LOG.debug("====================== LoginCta Activate Start ======================");
		 super.activate();
	        currentNode = get("currentNode", Node.class);
	        if (currentNode == null) {
	            return;
	        }
	        
	        firstMsg = CommonUtility.getPropertyValue(currentNode, "firstMsg");
	        labelUtente = CommonUtility.getPropertyValue(currentNode, "labelUtente");
	        labelEmail = CommonUtility.getPropertyValue(currentNode, "labelEmail");
	        labelPassword = CommonUtility.getPropertyValue(currentNode, "labelPassword");
	        labelPassword2 = CommonUtility.getPropertyValue(currentNode, "labelPassword2");
	        labelButtonReq = CommonUtility.getPropertyValue(currentNode, "labelButtonReq");
	        txtInformativa = CommonUtility.getPropertyValue(currentNode, "txtInformativa");

	        if (!isConfigured()) {
	            return;
	        }
	        LOG.debug("====================== LoginCta Activate End ======================");
	    }

	    private boolean isConfigured() {
	        return (firstMsg == null || labelUtente == null || labelEmail == null || labelPassword == null)
	                ? false
	                : true;
	    }
}
*/