<%@include file="../../../global.jsp"%><%@page session="false"%>


<div class="col-sm-12 new-header">
<!-- <cq:include path="par" resourceType="foundation/components/parsys"/> 
<cq:include path="adaptiveimage" resourceType="eags/components/adaptiveimage"/> -->
	<a href="home.html" class="col-sm-2">
		<img class="logo" src="/etc/designs/EAGA-Design/images/eaga-logo.jpg">
    </a>
	<!--  <div class="col-sm-2">logo</div> -->
	<div class="col-sm-6">
		<cq:include path="search" resourceType="foundation/components/search"/>
	</div>
	<div class="col-sm-2">
		<a href="https://www.amazon.it/" class="">
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