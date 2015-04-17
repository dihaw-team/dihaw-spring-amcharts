<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<tiles:insertDefinition name="defaultTemplate">
    <tiles:putAttribute name="body">
		<div style="padding:60px 10px 0;">
			<div class="title">
				<h3><spring:message code="chart.title"/></h3>

				<div id="chartdiv" style="height: 350px;"></div>

			</div>
		</div>
    </tiles:putAttribute>
</tiles:insertDefinition>