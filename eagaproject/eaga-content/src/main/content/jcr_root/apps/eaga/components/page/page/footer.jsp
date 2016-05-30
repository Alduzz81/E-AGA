<%@include file="../../../global.jsp" %>
<%@page session="false"%>

<cq:includeClientLib js="eaga.main"/>

<div class="col-sm-12 new-footer">
	<cq:include path="<%=homePath + "/jcr:content/columns"%>" resourceType="eaga/components/columns" />
</div>