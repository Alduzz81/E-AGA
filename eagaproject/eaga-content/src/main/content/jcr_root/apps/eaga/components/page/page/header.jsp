<%@include file="../../../global.jsp"%><%@page session="false"%>

<cq:include path="<%=homePath + "/jcr:content/cookie-policy"%>" resourceType="eaga/components/cookie-policy" />
<header>

	<div class="col-sm-12 new-header">
		<div class="col-sm-2">
			<a href="<%=homePath%>.html" >
				<img class="img-logo" src="/etc/designs/EAGA-Design/images/icons/eaga_trasparent.png">
	    	</a>
		</div>
		<div class="col-sm-6">
			<cq:include path="search" resourceType="foundation/components/search"/>
		</div>
			<cq:include path="topnav" resourceType="eaga/components/topnav"/>
	</div>
	
	<div class="col-sm-6">
		<cq:include path="search" resourceType="foundation/components/search"/>
	</div>
	<cq:include path="topnav" resourceType="eaga/components/topnav"/>
	<cq:include path="<%=homePath + "/jcr:content/menuLogin"%>" resourceType="eaga/components/menuLogin" />
</div>
</header>