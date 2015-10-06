window.onload = function() {

var urlresource = $('#urlresourcedata').data('urldata');

	$.ajax({
		url : urlresource,
		dataType : 'json',
		success : function(resp) {
			var jsonString = JSON.stringify(resp.data);
			
			chartDataUsed = eval('(' + jsonString + ')');
			
			var results;
			results = [];
			var item;
			var i;
			
			loop: for (i = 0; i < chartDataUsed.length; i++) {
				item = chartDataUsed[i];
				
				var dateDaily = new Date(item.date);
				
				var dayShortNames = $.datepicker._defaults.dayNamesShort;
				var monthShortNames = $.datepicker._defaults.monthNamesShort;
				
				var dateStringDaily = dayShortNames[dateDaily.getDay()] 
										+" "+ dateDaily.getDate() 
										+"-"+ monthShortNames[dateDaily.getMonth()] 
										+"-"+ dateDaily.getFullYear();
				
				var element = {
						date : dateStringDaily,
						value : chartDataUsed[i].value,
					};
					results.push(element);
				};
				

	        chart = new AmCharts.AmPieChart();
	        chart.dataProvider = results;
				
			chart.categoryField = "date";
			
			chart.titleField = "date";
			chart.valueField = "value";
			
			chart.outlineColor = "#f5f5f5";
			chart.outlineAlpha = 0.8;
			chart.outlineThickness = 1;
			chart.addTitle('AmPieChart example',12, '#045c97 ', 1, true);
			
			// this makes the chart 3D
			chart.depth3D = 15;
			chart.angle = 30;
			chart.labelsEnabled = false;
			chart.labelRadius = -30;
//			chart.labelText = "[[percents]]";
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
