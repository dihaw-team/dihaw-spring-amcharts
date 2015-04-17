<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<spring:url value="/" var="aboutUrl" />
<spring:url value="/statistics" var="statisticsUrl" />

<div class="menu">
	<ul>
		<li ${fn:contains(pageContext.request.requestURI, 'about') ? 'class="selected"' : ''}>
			<a href="${aboutUrl}"><spring:message code="menu.about" /></a>
		</li>
		<li ${fn:contains(pageContext.request.requestURI, 'statistics') ? 'class="selected"' : ''}>
			<a href="${statisticsUrl}"><spring:message code="menu.chart" /></a>
		</li>
	</ul>
</div> 
