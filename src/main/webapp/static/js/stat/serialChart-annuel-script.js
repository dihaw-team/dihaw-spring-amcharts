window.onload = function() {

	var urlresource = $('#urlresourcedata').data('urldata');
	
	$.ajax({
		url : urlresource,
		dataType : 'json',
		success : function(resp) {
			var jsonString = JSON.stringify(resp.data);
			
			chartDataUsed = eval('(' + jsonString + ')');
			
			chart = new AmCharts.AmSerialChart();
			
			chart.categoryField = "date";
			
			var categoryAxis = chart.categoryAxis;
			categoryAxis.parseDates = true;
			categoryAxis.minPeriod = "YYYY";
			
			chart.graphs= [{
		        "balloonText": "[[category]]: <b>[[value]]</b>",
		        "colorField": "color",
		        "fillAlphas": 0.85,
		        "lineAlpha": 0.1,
		        "type": "column",
		        "topRadius":1,
		        "valueField": "value"
		    }];
			
			chart.dataProvider = chartDataUsed;
			
			chart.outlineColor = "#f5f5f5";
			chart.outlineAlpha = 0.8;
			chart.outlineThickness = 1;
			chart.addTitle('Statistiques annuelles',12, '#045c97 ', 1, true);
			
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

			
			chart.write('chartdiv');
			
			
		}
		});

}