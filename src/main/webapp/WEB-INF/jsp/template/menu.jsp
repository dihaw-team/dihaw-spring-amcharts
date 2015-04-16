<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<spring:url value="/" var="helloUrl" />
<spring:url value="/about" var="aboutUrl" />
<spring:url value="/statistic" var="statisticUrl" />

<div class="menu">


	<ul>
		<li ${fn:contains(pageContext.request.requestURI, 'about') ? 'class="selected"' : ''}>
			<a href="${aboutUrl}"><spring:message code="menu.about" /></a>
		</li>
		<li ${fn:contains(pageContext.request.requestURI, 'hello') ? 'class="selected"' : ''}>
			<a href="${helloUrl}"><spring:message code="menu.hello" /></a>
		</li>
		<li ${fn:contains(pageContext.request.requestURI, 'statistic') ? 'class="selected"' : ''}>
			<a href="${statisticUrl}"><spring:message code="menu.statistic" /></a>
		</li>
	</ul>
</div> 
