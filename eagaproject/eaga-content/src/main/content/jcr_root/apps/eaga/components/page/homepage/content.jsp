<%@include file="../../../global.jsp" %>
<%@page session="false"%>
<div class="col-sm-12 page-content">
	<cq:include path="homecarousel" resourceType="eaga/components/homecarousel"/>
</div>
<div>
	<div class="col-sm-10 page-content">	
		<cq:include path="homeproducts" resourceType="eaga/components/homeproducts"/><br><hr><br>
		<cq:include path="homeproducts" resourceType="eaga/components/homeproducts"/><br><hr><br>
		<cq:include path="homeproducts" resourceType="eaga/components/homeproducts"/><br><hr><br>
		<cq:include path="contentHome" resourceType="foundation/components/parsys"/>		
	</div>
	<div class="col-sm-2 page-content">
		<cq:include path="par" resourceType="foundation/components/parsys"/>
	</div>
</div>