<%@include file="../../../global.jsp"%><%@page session="false"%>

<cq:include path="<%=homePath + "/jcr:content/cookie-policy"%>" resourceType="eaga/components/cookie-policy" />
<header>
	<div class="row">
		<div class="col-sm-12 new-header">
			<div class="col-sm-2">
				<a href="<%=homePath%>.html" >
					<img class="img-logo" src="/etc/designs/EAGA-Design/images/icons/eaga_trasparent.png">
		    	</a>
			</div>
			<div class="col-sm-6">
				<cq:include path="search" resourceType="foundation/components/search"/>
			</div>
			<div class="col-sm-2">
				<cq:include path="<%=homePath + "/jcr:content/myAccountMenu"%>" resourceType="eaga/components/myAccountMenu" />
			</div>
			<div class="col-sm-2 position-myCart">	
				<a href="/content/eaga/cart.html"> 
					<span class="total-cart-qnt-topnav">0</span>
			  		<img class="img-header topnav-item cart" src="/etc/designs/EAGA-Design/images/cart.png">
				</a>
			</div>
			<cq:include path="topnav" resourceType="eaga/components/topnav"/>
		</div>
	</div>
</header>