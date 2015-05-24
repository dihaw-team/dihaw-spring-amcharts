
window.onload = function() {
	

var urlresource = $('#urlresourcedata').data('urldata');

	$.ajax({
		url : urlresource,
		dataType : 'json',
		success : function(resp) {
			var jsonString = JSON.stringify(resp.data);
			chartDataUsed = eval('(' + jsonString + ')');
			
			$('.date').html(chartDataUsed[0]);
			$('.value').html(chartDataUsed[1]);

			chart = new AmCharts.AmPieChart();
			chart.titleField = "date";
			chart.valueField = "value";
			
			chart.dataProvider = chartDataUsed;
			
			chart.outlineColor = "#f5f5f5";
			chart.outlineAlpha = 0.8;
			chart.outlineThickness = 1;
			chart.addTitle('AmPieChart example',12, '#045c97 ', 1, true);
			
			// this makes the chart 3D
			chart.depth3D = 15;
			chart.angle = 30;
			chart.labelsEnabled = false;
			chart.labelRadius = -30;
			chart.labelText = "[[percents]]";
			//chart.innerRadius = 90;
			
			chart.visibleInLegendField = true;
			chart.sequencedAnimation = true;
			chart.startDuration = 2;
			chart.startEffect = "elastic"; //Animation effect. Possible values are: easeOutSine, easeInSine, elastic, bounce
	
				
			legend = new AmCharts.AmLegend();
			legend.borderAlpha = 0.3;
			legend.horizontalGap = 20;
			legend.switchType = "v";
			legend.position = "bottom";
			legend.align = "left";
			legend.labelText = "[[title]]";
			legend.valueText = "";
			legend.valueWidth= 20;
			
			chart.addLegend(legend);
			
			
			chart.write('chartdiv');
			
		}
	});

}
