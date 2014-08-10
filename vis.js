/**
 * @author Trisha Marie Funtanilla
 */



nv.addGraph(function() {
  var chart = nv.models.lineChart()
    .useInteractiveGuideline(true)
    ;

  chart.xAxis
    .axisLabel('Time (ms)')
    .tickFormat(d3.format(',r'))
    ;

  chart.yAxis
    .axisLabel('Voltage (v)')
    .tickFormat(d3.format(',f'))
    ;

  d3.select('#chart svg')
    .datum(data())
    .transition().duration(500)
    .call(chart)
    ;

  nv.utils.windowResize(chart.update);

  return chart;
});



function data() {
/*
	  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
*/	
	
	
	
	
	$(document).ready(function() {
		$.ajax({
			type : "GET",
			url : "unitrans-oct-2011.csv",
			dataType : "text",
			success : function(data) {
				var retval = processData(data);
				var mainDisplay = processBoardingPerRouteVis(retval);
				alert(retval[0]);
				return mainDisplay;
			}
		});
	});

	
	
	//var retval = processData(data);
	
	//var mainDisplay = processBoardingPerRouteVis(retval);
	//return mainDisplay;
	
}

function processData(file) {
	
    var fileLines = file.split(/\r\n|\n/);
    var headers = fileLines[0].split(',');
    
    var stopArr = [];
    var dateArr = [];
    var timeArr = [];
    var boardArr = [];
    var deboardArr = [];
    var routeArr = [];
    
    for (var i=1; i<fileLines.length; i++) {
        var data = fileLines[i].split(',');
        if (data.length == headers.length) {
			stopArr.push(data[0]);
			dateArr.push(data[1]);
			timeArr.push(parseFloat(data[2]));
			boardArr.push(parseInt(data[3]));
			deboardArr.push(parseInt(data[4]));
        	routeArr.push(data[5]);
        }
    }
    
    
    var retval = getBoardingDataPerDay(dateArr, boardArr, routeArr);

	return retval;
}

function getBoardingDataPerDay(dateArr, boardArr, routeArr) {
	
	// There will be 31 arrays for each day of the month of October
	var Oct1 = [], Oct2 = [], Oct3 = [], Oct4 = [],
	Oct5 = [], Oct6 = [], Oct7 = [], Oct8 = [],
	Oct9 = [], Oct10 = [], Oct11 = [], Oct12 = [],
	Oct13 = [], Oct14 = [], Oct15 = [], Oct16 = [], 
	Oct17 = [], Oct18 = [], Oct19 = [], Oct20 = [], 
	Oct21 = [], Oct22 = [], Oct23 = [], Oct24 = [],
	Oct25 = [], Oct26 = [], Oct27 = [], Oct28 = [],
	Oct29 = [], Oct30 = [], Oct31 = [];
	
	for (var i=0; i<31; i++) {
		Oct1[i] = 0; Oct2[i] = 0; Oct3[i] = 0; Oct4[i] = 0;
		Oct5[i] = 0; Oct6[i] = 0; Oct7[i] = 0; Oct8[i] = 0;
		Oct9[i] = 0; Oct10[i] = 0; Oct11[i] = 0; Oct12[i] = 0;
		Oct13[i] = 0; Oct14[i] = 0; Oct15[i] = 0; Oct16[i] = 0;
		Oct17[i] = 0; Oct18[i] = 0; Oct19[i] = 0; Oct20[i] = 0;
		Oct21[i] = 0; Oct22[i] = 0; Oct23[i] = 0; Oct24[i] = 0;
		Oct25[i] = 0; Oct26[i] = 0; Oct27[i] = 0; Oct28[i] = 0;
		Oct29[i] = 0; Oct30[i] = 0; Oct31[i] = 0;
	}									
	
	
	// Each bus line will have a route code number
	// Going through the bus lines in alphabetical order: A = 0, B = 1 ... W = 18
	var routeCode;
	
	// For each day of the month of Oct, the number of passengers will be recorded
	// Each total number for that day will be saved in the corresponding day array
	// The index of each day array will correspond to a route code
	// The entry in an index of a particular day array maintains how many passengers for each bus for that day
	for (var i=0; i<boardArr.length; i++) {
		routeCode = getRouteForEachStop(routeArr, i);
		
		switch(dateArr[i]) {
			case "2012-10-01":
				Oct1[routeCode] = Oct1[routeCode] + boardArr[i];
			case "2012-10-02":
				Oct2[routeCode] = Oct2[routeCode] + boardArr[i];
			case "2012-10-03":
				Oct3[routeCode] = Oct3[routeCode] + boardArr[i];
			case "2012-10-04":
				Oct4[routeCode] = Oct4[routeCode] + boardArr[i];
			case "2012-10-05":
				Oct5[routeCode] = Oct5[routeCode] + boardArr[i];
			case "2012-10-06":
				Oct6[routeCode] = Oct6[routeCode] + boardArr[i];
			case "2012-10-07":
				Oct7[routeCode] = Oct7[routeCode] + boardArr[i];
			case "2012-10-08":
				Oct8[routeCode] = Oct8[routeCode] + boardArr[i];
			case "2012-10-09":
				Oct9[routeCode] = Oct9[routeCode] + boardArr[i];
			case "2012-10-10":
				Oct10[routeCode] = Oct10[routeCode] + boardArr[i];
			case "2012-10-11":
				Oct11[routeCode] = Oct11[routeCode] + boardArr[i];
			case "2012-10-12":
				Oct12[routeCode] = Oct12[routeCode] + boardArr[i];
			case "2012-10-13":
				Oct13[routeCode] = Oct13[routeCode] + boardArr[i];
			case "2012-10-14":
				Oct14[routeCode] = Oct14[routeCode] + boardArr[i];
			case "2012-10-15":
				Oct15[routeCode] = Oct15[routeCode] + boardArr[i];
			case "2012-10-16":
				Oct16[routeCode] = Oct16[routeCode] + boardArr[i];
			case "2012-10-17":
				Oct17[routeCode] = Oct17[routeCode] + boardArr[i];
			case "2012-10-18":
				Oct18[routeCode] = Oct18[routeCode] + boardArr[i];
			case "2012-10-19":
				Oct19[routeCode] = Oct19[routeCode] + boardArr[i];
			case "2012-10-20":
				Oct20[routeCode] = Oct20[routeCode] + boardArr[i];
			case "2012-10-21":
				Oct21[routeCode] = Oct21[routeCode] + boardArr[i];
			case "2012-10-22":
				Oct22[routeCode] = Oct22[routeCode] + boardArr[i];
			case "2012-10-23":
				Oct23[routeCode] = Oct23[routeCode] + boardArr[i];
			case "2012-10-24":
				Oct24[routeCode] = Oct24[routeCode] + boardArr[i];
			case "2012-10-25":
				Oct25[routeCode] = Oct25[routeCode] + boardArr[i];
			case "2012-10-26":
				Oct26[routeCode] = Oct26[routeCode] + boardArr[i];
			case "2012-10-27":
				Oct27[routeCode] = Oct27[routeCode] + boardArr[i];
			case "2012-10-28":
				Oct28[routeCode] = Oct28[routeCode] + boardArr[i];
			case "2012-10-29":
				Oct29[routeCode] = Oct29[routeCode] + boardArr[i];
			case "2012-10-30":
				Oct30[routeCode] = Oct30[routeCode] + boardArr[i];
			case "2012-10-31":
				Oct31[routeCode] = Oct31[routeCode] + boardArr[i];
			
		}	
		
	}
	

	return [
		Oct1, Oct2, Oct3, Oct4, Oct5, Oct6, Oct7, Oct8, Oct9, Oct10,
		Oct11, Oct12, Oct13, Oct14, Oct15, Oct16, Oct17, Oct18, Oct19, 
		Oct20, Oct21, Oct22, Oct23, Oct24, Oct25, Oct26, Oct17, Oct28, 
		Oct29, Oct30, Oct31
	];
	
	
}

function getRouteForEachStop(routeArr, i) {
	
	switch(routeArr[i]) {
		case "A":
			return 0;
		case "B":
			return 1;
		case "C":
			return 2;
		case "D":
			return 3;
		case "E":
			return 4;
		case "F":
			return 5;
		case "G":
			return 6;
		case "H":
			return 7;
		case "J":
			return 8;
		case "K":
			return 9;
		case "L":
			return 10;
		case "M":
			return 11;
		case "O":
			return 12;
		case "P":
			return 13;
		case "Q":
			return 14;
		case "S":
			return 15;
		case "T":
			return 16;
		case "V":
			return 17;
		case "W":
			return 18;
	}

}

function processBoardingPerRouteVis(boardsPerDay) {
	
	
	//var date;
	
  	var a = [],
      	b = [];

  	for (var i=0; i<31; i++) {
  		//date = getDate(i);
  		var tempArr = boardsPerDay[i];
  		
    	a.push({x: i, y: tempArr[i]});
  		b.push({x: i, y: tempArr[i]});
	}

	//alert(tempArr[1]);
  	return [
    	{
      		values: a,
      		key: 'A',
     		color: '#ff7f0e'
    	},
    	{
     		values: b,
      		key: 'B',
      		color: '#2ca02c'
    	}
  	];

}
/*
function getDate(i) {
	
	var format = d3.time.format("%Y-%m-%d")
	
	switch(i) {
		case 0:
			return format.parse("2012-10-01");
		case 1:
			return format.parse("2011-10-02");
		case 2:
			return format.parse("2012-10-03");
		default:
			return format.parse("2012-10-04");
	}	

}

*/