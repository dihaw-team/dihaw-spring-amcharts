<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<spring:url value="/" var="aboutUrl" />

<spring:url value="/stat/pieChart/exmpl" var="pieChartExmplUrl" />
<spring:url value="/stat/serialChart/annuel" var="serialChartAnnuelUrl" />
<spring:url value="/stat/serialChart/mensuel" var="serialChartMensuelUrl" />
<spring:url value="/stat/serialChart/quotidien" var="serialChartQuotidienUrl" />

<div class="menu">
	<ul>
		<li ${fn:contains(pageContext.request.requestURI, 'about') ? 'class="selected"' : ''}>
			<a href="${aboutUrl}"><spring:message code="menu.about" /></a>
		</li>
		<li ${fn:contains(pageContext.request.requestURI, 'statistics') ? 'class="selected"' : ''}>
			<a href="${pieChartExmplUrl}"><spring:message code="menu.chart" /></a>
		</li>
		<li ${fn:contains(pageContext.request.requestURI, 'annuel') ? 'class="selected"' : ''}>
			<a href="${serialChartAnnuelUrl}"><spring:message code="menu.chart.annuel" /></a>
		</li>
		<li ${fn:contains(pageContext.request.requestURI, 'mensuel') ? 'class="selected"' : ''}>
			<a href="${serialChartMensuelUrl}"><spring:message code="menu.chart.mensuel" /></a>
		</li>
		<li ${fn:contains(pageContext.request.requestURI, 'quotidien') ? 'class="selected"' : ''}>
			<a href="${serialChartQuotidienUrl}"><spring:message code="menu.chart.quotidien" /></a>
		</li>	
	</ul>
</div> 
