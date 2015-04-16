window.onload = function() {
	
	createChartPie('chartdiv');

	loadTxtPie("static/data/data.txt");

};


// method which loads external data
function loadTxtPie(file) {
	var request = null;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari
		request = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}
	// load
	request.open('GET', file, false);
	request.send();
	parseTxtPie(request.responseText);
}

// method which parses txt data
function parseTxtPie(data) {

	var rows = data.split("\n"); 	
	dataProvider = [];
	var i = 0;
	
	for ( i; i < rows.length; i++) {

		if (rows[i]) {
			var column = rows[i].split(",");

			var title = column[0];
			var value  = column[1];
			var dataObject = {
				title : title,
				value  : value 
			};

			dataProvider.push(dataObject);
		}
		
	}
	chart.dataProvider = dataProvider;
	chart.validateData();
	chart.animateAgain();
}

function createChartPie(container) {

	// PIE CHART
	chart = new AmCharts.AmPieChart();
	chart.titleField = "title";
	chart.valueField = "value";
	chart.outlineColor = "#f5f5f5";
	chart.outlineAlpha = 0.8;
	chart.outlineThickness = 1;
	chart.addTitle('AmPieChart example',12, '#045c97 ', 1, true);
	
	// this makes the chart 3D
	chart.depth3D = 20;
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
	
	// WRITE
	chart.write(container);
	
	

}








