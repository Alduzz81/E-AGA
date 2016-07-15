<%@include file="../../../global.jsp"%><%@page session="false"%>

<header>
	<div class="row">
		<div class="col-sm-12 new-header">
			<div class="col-sm-2">
				<a href="<%=homePath%>.html" >
					<img class="img-logo" src="/etc/designs/EAGA-Design/images/icons/eaga_trasparent.png">
		    	</a>
			</div>
			<div class="col-sm-6">
				<cq:include path="search-component" resourceType="eaga/components/search-component" />
			</div>
			<div class="col-sm-2">
				<cq:include path="<%=homePath + "/jcr:content/myAccountMenu"%>" resourceType="eaga/components/myAccountMenu" />
			</div>
			<div class="col-sm-1">
				<cq:include path="<%=homePath + "/jcr:content/myWishListMenu"%>" resourceType="eaga/components/myWishlistMenu" />
	      	</div>
			<div class="col-sm-1">	
				<a href="/content/eaga/cart.html"> 
					<div class="total-cart-qnt-topnav">0</div>
			  		<img class="shopping-cart-logo" src="/etc/designs/EAGA-Design/images/shopping-cart-logo.png">
                    <span class="shopping-cart-text">Carrello</span>
				</a>
			</div>
		</div>
		<cq:include path="topnav" resourceType="eaga/components/topnav"/>
	</div>
</header>