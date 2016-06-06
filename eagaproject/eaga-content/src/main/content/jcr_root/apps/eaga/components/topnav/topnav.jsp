<%@ include file="../../global.jsp" %><%
%><%@ page contentType="text/html; charset=utf-8" import="
           java.util.Iterator,
           java.util.List,
           java.util.ArrayList,
           com.day.cq.wcm.api.Page,
           com.day.cq.wcm.api.PageFilter"
%><%

final Page rootPage = currentPage.getAbsoluteParent(1);

if (rootPage != null) {
        final boolean showSiteTitle = !currentStyle.get("hideSiteTitle", false);
        final String rootPath = rootPage.getPath() + ".html";
        
        List<Page> childPages = new ArrayList<Page>();
        Iterator<Page> children = rootPage.listChildren(new PageFilter(request));
        while(children.hasNext()) {
            childPages.add(children.next());
        }
        
        String extraClasses = "";
        if (childPages.size() > 7) {
            extraClasses = "large";
        }
%>



<nav>
    <div class="header-navigation">
        <div class="header-secondary-wrap hidden-xs hidden-sm">
            <ul class="header-secondary js-header-secondary">
                <%
                        int item = 1;
                        for (Page child : childPages) {
                            final String childPath = child.getPath() + ".html";
                            final String childTitle = child.getTitle();

                            String className = "topnav-item-"+item;
                            if (item == 1) className += " topnav-first";
                            if (!children.hasNext()) className += " topnav-last";

                %>
                <li>
                    <a href="<%= xssAPI.getValidHref(childPath) %>" data-menu="#menu-<%=child.getName()%>"><%= xssAPI.encodeForHTML(childTitle) %></a>

                    <ul id="menu-<%=child.getName()%>" class="header-secondary-sub header-transform header-hide">
                        <%
                    Iterator<Page> subchildren = child.listChildren(new PageFilter(request));
                    while(subchildren.hasNext()) {
                        Page sub = subchildren.next();
                        %>
                        <li>
                            <a href="<%= xssAPI.getValidHref(sub.getPath()) %>.html"><%= xssAPI.encodeForHTML(sub.getTitle()) %></a>
                        </li>
                        <%
                    }
                        %>
                    </ul>
                </li>
                <%
                    item++;
                }
                %>    
            </ul>
        </div>
	</div>
</nav>
<%
    }
%>
