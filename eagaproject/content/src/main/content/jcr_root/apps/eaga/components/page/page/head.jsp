<%@include file="../../../global.jsp" %><%
%><%@page session="false"%>
<%@ page import="com.day.cq.commons.Doctype" %><%
    String xs = Doctype.isXHTML(request) ? "/" : "";
    String favIcon = currentDesign.getPath() + "/favicon.ico";
    if (resourceResolver.getResource(favIcon) == null) {
        favIcon = null;
    }
%><head>

	<meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
	<meta name="keywords" content="<%= xssAPI.encodeForHTMLAttr(WCMUtils.getKeywords(currentPage, false)) %>"<%=xs%>>
    <meta name="description" content="<%= xssAPI.encodeForHTMLAttr(properties.get("jcr:description", "")) %>"<%=xs%>>
	<meta name="language" content="English">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta http-equiv="content-type" content="text/html; charset=UTF-8"<%=xs%>>

    <cq:include script="headlibs.jsp"/>
    <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
    <cq:include script="stats.jsp"/>
    <% if (favIcon != null) { %>
    <link rel="icon" type="image/vnd.microsoft.icon" href="<%= xssAPI.getValidHref(favIcon) %>"<%=xs%>>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<%= xssAPI.getValidHref(favIcon) %>"<%=xs%>>
    <% } %>
    <title><%= currentPage.getTitle() == null ? xssAPI.encodeForHTML(currentPage.getName()) : xssAPI.encodeForHTML(currentPage.getTitle()) %></title>

    <cq:includeClientLib css="vodafone.main"/>


    <script src="//tags.tiqcdn.com/utag/vodafone/ie-main/prod/utag.sync.js"></script>
    <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>
</head>
