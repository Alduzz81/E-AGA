<%@page session="false"%><%--
  ~
  ~ ADOBE CONFIDENTIAL
  ~ __________________
  ~
  ~  Copyright 2011 Adobe Systems Incorporated
  ~  All Rights Reserved.
  ~
  ~ NOTICE:  All information contained herein is, and remains
  ~ the property of Adobe Systems Incorporated and its suppliers,
  ~ if any.  The intellectual and technical concepts contained
  ~ herein are proprietary to Adobe Systems Incorporated and its
  ~ suppliers and are protected by trade secret or copyright law.
  ~ Dissemination of this information or reproduction of this material
  ~ is strictly forbidden unless prior written permission is obtained
  ~ from Adobe Systems Incorporated.
  --%><%@ page import="com.adobe.cq.social.commons.CollabUtil,
                       com.day.cq.commons.Externalizer,
                       com.day.cq.commons.JSONWriterUtil,
                       com.day.cq.commons.TidyJSONWriter,
                       com.day.cq.commons.date.DateUtil,
                       com.day.cq.wcm.api.WCMMode,
                       com.day.cq.xss.ProtectionContext,
                       com.day.cq.xss.XSSProtectionService,
                       org.apache.sling.api.SlingHttpServletRequest,
                       org.apache.sling.commons.json.io.JSONWriter,
                       org.apache.sling.commons.json.JSONException,
                       java.io.StringWriter,
                       java.text.DateFormat,
                       java.util.Date,
                       com.adobe.granite.security.user.UserPropertiesManager,
                       com.adobe.granite.security.user.UserProperties,
                       javax.jcr.PathNotFoundException,
                       com.aem.aega.api.portal.customer.Customer"
        contentType="text/javascript" %><%!
%><%@ include file="/libs/foundation/global.jsp" %><%
%><%!

    void setProfileInitialData(JSONWriter writer, UserPropertiesManager upm,
                               SlingHttpServletRequest slingRequest,
                               String absoluteDefaultAvatar,
                               XSSProtectionService xss,
                               Customer customer) throws Exception {

        writer.object();
        final Session session = slingRequest.getResourceResolver().adaptTo(Session.class);
        final UserProperties userProperties = upm.getUserProperties(session.getUserID(), "profile");
        if (userProperties != null) {
            String avatar = CollabUtil.getAvatar(userProperties, userProperties.getProperty(UserProperties.EMAIL),absoluteDefaultAvatar);
            //increase avatar size
            avatar = avatar == null ? "" : avatar.replaceAll("\\.32\\.",".80.");
            final String id = userProperties.getAuthorizableID();

            writer.key("avatar").value(avatar);

            Boolean isLoggedIn = id != null && !id.equals("anonymous");
            writer.key("isLoggedIn").value(isLoggedIn);
            writer.key("isLoggedIn" + JSONWriterUtil.KEY_SUFFIX_XSS)
                    .value(xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT,isLoggedIn.toString()));
            if(!"anonymous".equals(id)) {
                try {
                	String qqq="1";
                    /*writer.key("usageAllowance").value(customer.getServiceBalance(id));
                    writer.key("serviceAccount").value(customer.getCustomerServiceAccount(id));
                    writer.key("customerBill").value(customer.getCustomerBill(id));
                    writer.key("customerParty").value(customer.getCustomerParty(id));*/
                } catch (JSONException e) {

                }
            }
            writer.key("authorizableId")
                    .value(id);
            writer.key("authorizableId" + JSONWriterUtil.KEY_SUFFIX_XSS)
                    .value(xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT,id));

            writer.key("formattedName")
                    .value(userProperties.getDisplayName());
            writer.key("formattedName" + JSONWriterUtil.KEY_SUFFIX_XSS)
                    .value(xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT,userProperties.getDisplayName()));

            for (String key : userProperties.getPropertyNames()) {
                if (!key.startsWith("jcr:") &&
                    !key.startsWith("sling:") &&
                    !key.startsWith("cq:last")) {

                    String s = userProperties.getProperty(key, null, String.class);
                    s = s != null ? s : "";
                    writer.key(key)
                            .value(s);
                    writer.key(key + JSONWriterUtil.KEY_SUFFIX_XSS)
                            .value(xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT,s));
                }
            }
        }
        writer.endObject();
    }

%><%
    Externalizer externalizer = sling.getService(Externalizer.class);
    XSSProtectionService xss = sling.getService(XSSProtectionService.class);
    Customer customer = sling.getService(Customer.class);
    boolean isDisabled = WCMMode.DISABLED.equals(WCMMode.fromRequest(slingRequest));

    String absoluteDefaultAvatar = "";
    if(externalizer != null){
        absoluteDefaultAvatar = externalizer.relativeLink(slingRequest, CollabUtil.DEFAULT_AVATAR);
    }

    StringWriter buf = new StringWriter();

    TidyJSONWriter writer = new TidyJSONWriter(buf);
    writer.setTidy(true);
    try {
        final UserPropertiesManager upm = slingRequest.getResourceResolver().adaptTo(UserPropertiesManager.class);
        setProfileInitialData(writer, upm, slingRequest, absoluteDefaultAvatar, xss, customer);
    } catch (Exception e) {
        log.error("Error while generating JSON profile initial data", e);
    }

%>if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
    CQ_Analytics.ProfileDataMgr.addListener("update", function(event, property) {
        var authorizableId = this.getProperty("authorizableId");
        if (!authorizableId || authorizableId == "anonymous") {
            $CQ(".cq-cc-profile-not-anonymous").hide();
            $CQ(".cq-cc-profile-anonymous").show();
        } else {
            $CQ(".cq-cc-profile-not-anonymous").show();
            $CQ(".cq-cc-profile-anonymous").hide();
        }
    });

    <%if (!isDisabled) { %>
    CQ_Analytics.ProfileDataMgr.loadInitProperties({
        "authorizableId": "anonymous",
        "formattedName": CQ_Analytics.isUIAvailable ? CQ.I18n.getMessage("Anonymous Surfer") : "anonymous",
        "avatar": "<%=absoluteDefaultAvatar%>"
    });
    <%} else {%>
    CQ_Analytics.ProfileDataMgr.loadInitProperties(<%=buf%>);
    <%}%>
    CQ_Analytics.ProfileDataMgr.init();
}
