<%@include file="../../../global.jsp"%><%@page session="false"%>
<div class="col-sm-12 new-header">
	<div class="col-sm-2">
		<a href="<%=homePath%>.html" >
			<img class="logo" src="/etc/designs/EAGA-Design/images/eaga-logo.jpg">
    	</a>
	</div>
	<div class="col-sm-6">
		<cq:include path="search" resourceType="foundation/components/search"/>
	</div>
	<div class="col-sm-2">
		<a href="<%=homePath%>/login.html">
			<img class="img-header" src="/etc/designs/EAGA-Design/images/login.png">
			<span class="label-header">Login</span> 
	    </a>
    </div>
	<div class="col-sm-2">
		<a href="http://www.ebay.it/" class="">
			<img class="img-header" src="/etc/designs/EAGA-Design/images/cart.png">
	        <span class="label-header">Cart</span> 
	    </a>
    </div>
</div>
