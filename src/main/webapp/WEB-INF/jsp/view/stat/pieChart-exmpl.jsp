<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<script type="text/javascript" src="<c:url value="/static/js/stat/pieChart-exmpl-script.js" />

<spring:url var="retriveDataUrl" value="/stat/retriveData" />

<tiles:insertDefinition name="defaultTemplate">
    <tiles:putAttribute name="body">
		<div style="padding:60px 10px 0;">
			<div class="title">

				<div id="chartdiv" style="height: 350px;"></div>
				
				<div id="urlresourcedata" data-urldata="${retriveDataUrl}"></div>

			</div>
		</div>
    </tiles:putAttribute>
</tiles:insertDefinition>