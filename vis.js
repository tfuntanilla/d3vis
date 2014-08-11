/**
 * @author Trisha Marie Funtanilla
 */



nv.addGraph(function() {

	var chart = nv.models.lineWithFocusChart();

	var date = ["Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7",
		"Oct 8", "Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13", "Oct 14",
		"Oct 15", "Oct 16", "Oct 17", "Oct 18", "Oct 19", "Oct 20", "Oct 21",
		"Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26", "Oct 27", "Oct 28",
		"Oct 29", "Oct 30", "Oct 31"]

	chart.xAxis
		.tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
			13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29, 30])
		.tickFormat(function(d) {
			return date[d]
		});

	chart.x2Axis
		.tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
			13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29, 30])
		.tickFormat(function(d) {
			return date[d]
		});


	chart.yAxis.tickFormat(d3.format(',f'));

	chart.y2Axis.tickFormat(d3.format(',f'));

	d3.select('#chart svg').datum(displayDataHandler()).transition().duration(500).call(chart);
	
	nv.utils.windowResize(chart.update);

	return chart;

});

function displayDataHandler() {
	
	var dataVals = readData();
	var a = [], b = [], c = [], d = [], e = [], f = [],
		g = [], h = [], j = [], k = [], l = [], m = [],
		o = [], p = [], q = [], s = [], t = [], v = [],
		w = [];

	for (var i = 0; i < 31; i++) {
		var tempArr = dataVals[i];

		a.push({ x : i, y : tempArr[0]});
		b.push({ x : i, y : tempArr[1]});
		c.push({ x : i, y : tempArr[2]});
		d.push({ x : i, y : tempArr[3]});
		e.push({ x : i, y : tempArr[4]});
		f.push({ x : i, y : tempArr[5]});
		g.push({ x : i, y : tempArr[6]});
		h.push({ x : i, y : tempArr[7]});
		j.push({ x : i, y : tempArr[8]});
		k.push({ x : i, y : tempArr[9]});
		l.push({ x : i, y : tempArr[10]});
		m.push({ x : i, y : tempArr[11]});
		o.push({ x : i, y : tempArr[12]});
		p.push({ x : i, y : tempArr[13]});
		q.push({ x : i, y : tempArr[14]});
		s.push({ x : i, y : tempArr[15]});
		t.push({ x : i, y : tempArr[16]});
		v.push({ x : i, y : tempArr[17]});
		w.push({ x : i, y : tempArr[18]});
	}

	return [{
		values : a,
		key : 'A',
		color : '#f0649e'
	}, {
		values : b,
		key : 'B',
		color : '#50863d'
	}, {
		values : c,
		key : 'C',
		color : '#a86b79'
	}, {
		values : d,
		key : 'D',
		color : '#0b7bc0'
	}, {
		values : e,
		key : 'E',
		color : '#60bb46'
	}, {
		values : f,
		key : 'F',
		color : '#825da8'
	}, {
		values : g,
		key : 'G',
		color : '#51929f'
	}, {
		values : h,
		key : 'H',
		color : '#000080'
	}, {
		values : j,
		key : 'J',
		color : '#d6a477'
	}, {
		values : k,
		key : 'K',
		color : '#f26524'
	}, {
		values : l,
		key : 'L',
		color : '#f79420'
	}, {
		values : m,
		key : 'M',
		color : '#c33f97'
	}, {
		values : o,
		key : 'O',
		color : '#754d25'
	}, {
		values : p,
		key : 'P',
		color : '#d52d27'
	}, {
		values : q,
		key : 'Q',
		color : '#c34843'
	}, {
		values : s,
		key : 'S',
		color : '#808285'
	}, {
		values : t,
		key : 'T',
		color : '#ee2e24'
	}, {
		values : v,
		key : 'V',
		color : '#ffce0d'
	}, {
		values : w,
		key : 'W',
		color : '#118d9b'
	}];

}

function readData() {	
	var retval;
	$(document).ready(function() {
		retval = handleData();
	});
	return retval;
}

function handleData() {
	var retval;
	$.ajax({
		async : false,
		type : "GET",
		url : "unitrans-oct-2011.csv",
		dataType : "text",
		success : function(data) {
			retval = processData(data);
			
		}
	});
	
	return retval;
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
	
	for (var i=0; i<19; i++) {
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
		

		if (dateArr[i] === "2012-10-31") {
			Oct31[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-01") {
			Oct1[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-02") {
			Oct2[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-03") {
			Oct3[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-04") {
			Oct4[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-05") {
			Oct5[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-06") {
			Oct6[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-07") {
			Oct7[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-08") {
			Oct8[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-09") {
			Oct9[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-10") {
			Oct10[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-11") {
			Oct11[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-12") {
			Oct12[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-13") {
			Oct13[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-14") {
			Oct14[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-15") {
			Oct15[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-16") {
			Oct16[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-17") {
			Oct17[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-18") {
			Oct18[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-19") {
			Oct19[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-20") {
			Oct20[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-21") {
			Oct21[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-22") {
			Oct22[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-23") {
			Oct23[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-24") {
			Oct24[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-25") {
			Oct25[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-26") {
			Oct26[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-27") {
			Oct27[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-28") {
			Oct28[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-29") {
			Oct29[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-30") {
			Oct30[routeCode] += boardArr[i];
		} else if (dateArr[i] === "2012-10-31") {
			Oct31[routeCode] += boardArr[i];
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