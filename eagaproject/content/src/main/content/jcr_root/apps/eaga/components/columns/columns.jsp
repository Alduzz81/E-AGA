<%@include file="../../global.jsp" %><%
%><%@ page import="com.day.cq.wcm.api.WCMMode,
                   com.day.cq.wcm.api.components.Toolbar" %>
<%
int desktop = properties.get("desktop",0);
String layout = properties.get("layout","");
//int tablet = properties.get("tablet",0);
//int smart = properties.get("smart",0);
//boolean nopadding = properties.get("nopadding",false);

if (WCMMode.fromRequest(request) == WCMMode.EDIT) { %>
<div class="vf_container">
    Change column layout
</div>
<% 
}
    
if(desktop>0) {  
	int columns = Integer.parseInt(Integer.toString(desktop).substring(0, 1));
	//desktop = 12/desktop;
	//tablet = tablet==0?desktop:12/tablet; 
	//smart = smart==0?desktop:12/smart; 
		
	//colClass = "col-md-"+desktop+" col-sm-"+tablet+" col-xs-"+smart+"";
	
	String colClass = "";
	
	
	//if(nopadding)	colClass+=" no-padding";
%>
<div class="<%=(layout.equals("col")?"container-fluid":"")%>">
	<div class="row">
	<%
	if(columns>1) {
		for (int i = 1; i <= columns; i++) {
		%>
		<div class="col-md-<%=Integer.parseInt(Integer.toString(desktop).substring(i, (i+1))) %> col-xs-12"><cq:include path="<%="col-par-"+currentNode.getName()+"-"+i%>" resourceType="foundation/components/parsys" /></div>
		<%
		}
	} else {
		%>
		<div class="col-md-12 col-xs-12"><cq:include path="<%="col-par-"+currentNode.getName()+"-"+columns%>" resourceType="foundation/components/parsys" /></div>
		<%
	}
	%>
	</div>
</div>
<% } %>