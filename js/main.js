// LeafletJS: Setting up the map
var mymap = L.map('mapid', {
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false
}).setView([37.7852, -122.4665], 16);

// Adding Tile Layer (the map)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'superonion.pn7p5mjo',
    accessToken: 'pk.eyJ1Ijoic3VwZXJvbmlvbiIsImEiOiJjaW41anY0MWMwY3FqdXBra2Nudm5keTdiIn0.QU9itsq1crBsfAWmmGFbBg'
}).addTo(mymap);

//Define the icon clas
var stopIcon = L.Icon.extend({
    options: {
        iconSize: [30, 30],
    }
});

var lightIcon = L.icon({
    iconUrl: 'light.svg',
    iconSize: [15,25],
    iconAnchor: [7,12]
});

//Instantiate the Icons
//Normal (unselected) Icons
var OBIcon = new stopIcon({
    iconUrl: 'OB.svg',
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});
var IBIcon = new stopIcon({
    iconUrl: 'IB.svg',
    iconAnchor: [15, 0],
    popupAnchor: [0, 0]
});

//Selected Icons
var OBIconSelect = new stopIcon({
    iconUrl: 'OB_select.svg',
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});
var IBIconSelect = new stopIcon({
    iconUrl: 'IB_select.svg',
    iconAnchor: [15, 0],
    popupAnchor: [0, 0]
});

//Coordinates and names of Outbound stops
var OBCoord = [
    [37.78573, -122.45956],
    [37.78539, -122.46228],
    [37.78504, -122.46489],
    [37.78479, -122.46699],
    [37.78469, -122.46916],
    [37.78462, -122.47080],
    [37.78453, -122.47297]
];
var OBStopNames = ['Arguello OB', '4th OB', '6th OB', '8th OB', '10th OB', '12th OB', 'Park Presidio OB'];

//Coordinates and names of Inbound stops
var IBCoord = [
    [37.78436, -122.47282],
    [37.78445, -122.47117],
    [37.78454, -122.46906],
    [37.78463, -122.46689],
    [37.78490, -122.46478],
    [37.78517, -122.46262],
    [37.78564, -122.45898]
];
var IBStopNames = ['Park Presidio IB', '12th IB', '10th IB', '8th IB', '6th IB', '4th IB', 'Arguello IB'];

var lightCoord = [
    [37.78569, -122.45918],
    [37.78528, -122.46244],
    [37.78500, -122.46457],
    [37.78474, -122.46671],
    [37.78464, -122.46884],
    [37.78452, -122.47099],
    [37.78445, -122.47259]
];
//Display name for each stops in popups
var stopPopUpNames = {
    'Arguello OB': 'Arguello Blvd.',
    '4th OB': '4th Ave.',
    '6th OB': '6th Ave.',
    '8th OB': '8th Ave.',
    '10th OB': '10th Ave.',
    '12th OB': '12th Ave.',
    'Park Presidio OB': 'Park Presidio Blvd.',
    'Park Presidio IB': 'Park Presidio Blvd.',
    '12th IB': '12th Ave.',
    '10th IB': '10th Ave.',
    '8th IB': '8th Ave.',
    '6th IB': '6th Ave.',
    '4th IB': '4th Ave.',
    'Arguello IB': 'Arguello Blvd.'
};

//Distance between each stop
var stopLen = {
    '4th OB': 789.63,
    '6th OB': 756.92,
    '8th OB': 633.91,
    '10th OB': 623.75,
    '12th OB': 475.05,
    'Park Presidio OB': 619.58,
    'Park Presidio IB': 'N/A',
    '12th IB': 485.28,
    '10th IB': 614.66,
    '8th IB': 623.6,
    '6th IB': 616.69,
    '4th IB': 631.61,
    'Arguello IB': 1097.69,
    'Arguello OB': 'N/A'
};

var stopLights = {
    '4th OB': ['None'],
    '6th OB': ['4th Ave.', '6th Ave.'],
    '8th OB': ['8th Ave.'],
    '10th OB': ['10th Ave.'],
    '12th OB': ['None'],
    'Park Presidio OB': ['12th Ave.', 'Park Presidio Blvd.'],
    'Park Presidio IB': ['N/A'],
    '12th IB': ['Park Presidio Blvd.'],
    '10th IB': ['12th Ave.'],
    '8th IB': ['10th Ave.'],
    '6th IB': ['8th Ave.'],
    '4th IB': ['6th Ave.'],
    'Arguello IB': ['6th Ave.', 'Arguello Blvd.'],
    'Arguello OB': ['N/A']
};

var translation = {
    '4th OB': '4th OB',
    '6th OB': '6th OB',
    '8th OB': '8th OB',
    '10th OB': '10th OB',
    '12th OB': '12th OB',
    'Park Presidio OB': 'Park Presidio OB',
    '12th IB': '12th IB',
    '10th IB': '10th IB',
    '8th IB': '8th IB',
    '6th IB': '6th IB',
    '4th IB': '4th IB',
    'Arguello IB': 'Arguello IB'
};

var allStops = {}; //Holder of all markers
var allLines = {}; //Holder of all lines
var daysSelected = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; //Holder of day selection
var OBStopsSelected = new Set(); // Seperate IB and OB stops into 2 holders, so
var IBStopsSelected = new Set(); // they could show in corresponding span
var allStopsSelected = new Set();

//Instantiate markers and assign names to stop coordinates, then store the object in OBStops
$.each(OBCoord, function(stopNo, stopCoord) {
    var stopName = OBStopNames[stopNo];
    var info = '<p>'+stopPopUpNames[stopName]+'<br/>Dist: '+stopLen[stopName]+'<br/>Traffic Lights:<br/>'+stopLights[stopName]+'</p>';
    var infoPopUp = L.popup().setContent(info);
    allStops[stopName] = L.marker(stopCoord, {
        icon: OBIcon
    }).on('click', function() {
        otherSelectionEvent(stopName, $('#OBSelect'));
    }).on('mouseover', function(e){
        this.openPopup();
    }).on('mouseout', function(e){
        this.closePopup();
    }).bindPopup(infoPopUp).addTo(mymap);
});

//Instantiate markers and assign names to stop coordinates, then store the object in IBStops
$.each(IBCoord, function(stopNo, stopCoord) {
    var stopName = IBStopNames[stopNo];
    var info = '<p>'+stopPopUpNames[stopName]+'<br/>Dist: '+stopLen[stopName]+'<br/>Traffic Lights:<br/>'+stopLights[stopName]+'</p>';
    var infoPopUp = L.popup().setContent(info);
    allStops[stopName] = L.marker(stopCoord, {
        icon: IBIcon
    }).on('click', function() {
        otherSelectionEvent(stopName, $('#IBSelect'));
    }).on('mouseover', function(e){
        this.openPopup();
    }).on('mouseout', function(e){
        this.closePopup();
    }).bindPopup(infoPopUp).addTo(mymap);
});

$.each(lightCoord, function(no, coord){
    L.marker(coord, {icon:lightIcon}).addTo(mymap);
});

function otherSelectionEvent(stopName, display) {
    //Set the checkbox 'checked' attribute base on its current status, then call the formSelectionEvent
    stopName = '"' + stopName + '"';
    if ($('input:checkbox[id=' + stopName + ']').prop('checked')) {
        $('input:checkbox[id=' + stopName + ']').prop('checked', false);
    } else {
        $('input:checkbox[id=' + stopName + ']').prop('checked', true);
    }
    //Here's a strange bug fix, that the selector returns a array of things and need [0] to address the element.
    formSelectionEvent($('input:checkbox[id=' + stopName + ']')[0], display);
}

//Add and pop selection into display when it's been selected/deselected,
//Also change the corresponding marker's icon;
function formSelectionEvent(element, display) {
    var select = element.value; //Take DOM element as input, but take it's value for referencing other element
    var direction = select.substr(-2);
    var stopMarker = allStops[select];
    //Select which public variable to push the selected value in
    var valueHolder;
    if (element.name == 'outbound') {
        valueHolder = OBStopsSelected;
    } else {
        valueHolder = IBStopsSelected;
    }
    //Add or delete the selected value depending on the check/uncheck status
    if ($(element).prop('checked')) {
        //Add selection into display when it's been selected
        valueHolder.add(select);
        allStopsSelected.add(select);
        //Change corresponding icon
        if (stopMarker) {
            iconChanger(stopMarker, 'checked', direction);
            lineDrawer(select, stopMarker, 'checked', direction);
        }
    } else {
        //Pop selection from display when it's been deselected
        valueHolder.delete(select);
        allStopsSelected.delete(select);
        //Change icon
        if (stopMarker) {
            iconChanger(stopMarker, 'unchecked', direction);
            lineDrawer(select, stopMarker, 'unchecked', direction);
        }
    }
    // Cast into array, in order to use array's join method, and print it to the right span.
    textHolder = Array.from(valueHolder);
    display.text(textHolder.join(', '));
    // Get all selected stops and use them as filters
    textHolder = Array.from(allStopsSelected);
    console.log(textHolder);
    chart1 = viz1.getWorkbook().getActiveSheet();
    chart2 = viz2.getWorkbook().getActiveSheet();
		worksheetArray = chart1.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].applyFilterAsync('Bus Name', textHolder, 'REPLACE');
    		}
		worksheetArray = chart2.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].applyFilterAsync('Bus Name', textHolder, 'REPLACE');
		}
}

//Change the marker's icon according to the stop selected
function iconChanger(stop, status, direction) {
    if (status == 'checked') {
        if (direction == 'OB') {
            stop.setIcon(OBIconSelect);
        } else if (direction == 'IB') {
            stop.setIcon(IBIconSelect);
        }
    } else if (status == 'unchecked') {
        if (direction == 'OB') {
            stop.setIcon(OBIcon);
        } else if (direction == 'IB') {
            stop.setIcon(IBIcon);
        }
    }
}

function lineDrawer(select, stop, status, direction) {
    var desCoord = [stop.getLatLng().lat, stop.getLatLng().lng];
    var oriCoord, colorCode;
    // Finding the coordinates of the previous stop
    if (direction == 'OB') {
        oriCoord = OBCoord[findIndexOfCoord(OBCoord, desCoord) - 1];
        colorCode = '#0080FF';
    } else if (direction == 'IB') {
        oriCoord = IBCoord[findIndexOfCoord(IBCoord, desCoord) - 1];
        colorCode = '#008080';
    }
    // Initialize the roulte line option
    var routeLineOptions = {
        color: colorCode,
        weight: 8,
        lineCap: 'round',
        opacity: 0.8
    };
    // Attaching line;
    if (status == 'checked') {
        //Check if line already exists before adding a line (otherwise line will duplicate)
        if (allLines[select]) {
            mymap.removeLayer(allLines[select]);
        }
        allLines[select] = L.polyline([oriCoord, desCoord], routeLineOptions).addTo(mymap);
    } else if (status == 'unchecked') {
        mymap.removeLayer(allLines[select]);
    }
}

//Helper function to match coordinates in nested arrays.
function findIndexOfCoord(coordArray, target) {
    for (var i = 0; i < coordArray.length; i++) {
        if (coordArray[i][0] == target[0] && coordArray[i][1] == target[1]) {
            return i;
        }
    }
}


//Day of Week Checkbox Group
$('input:checkbox[name="day"]').change(function() {
    // formSelectionEvent(this, $('#day'));
    var updateType;
    if($(this).prop('checked')){
        daysSelected.push(this.value);
        updateType = "ADD";
    }else {
        var index = daysSelected.indexOf(this.value);
        daysSelected.splice(index, 1);
        updateType = "REMOVE";
    }
    dayHolder = Array.from(daysSelected);
    $('#day').text(daysSelected.join(', '));
    chart1 = viz1.getWorkbook().getActiveSheet();
    chart2 = viz2.getWorkbook().getActiveSheet();
    if(chart1.getSheetType() === 'worksheet') {
        chart1.applyFilterAsync('Weekday', dayHolder, "REPLACE");
    } else {
        worksheetArray = chart1.getWorksheets();
        for(var i = 0; i < worksheetArray.length; i++) {
            worksheetArray[i].applyFilterAsync('Weekday', dayHolder, "REPLACE");
            }
    }
    if(chart2.getSheetType() === 'worksheet') {
        chart2.applyFilterAsync('Weekday', dayHolder, "REPLACE");
    } else {
        worksheetArray = chart2.getWorksheets();
        for(var i = 0; i < worksheetArray.length; i++) {
            worksheetArray[i].applyFilterAsync('Weekday', dayHolder, "REPLACE");
        }
    }

});

//Time of Day Slider
$("#slider-range").slider({
    //slide will pass on the slide event and the ui selected (See document of jQuery UI)
    range: true,
    min: 0,
    max: 960,
    values: [60, 180],
    step: 5,
    slide: slideTime
});

function slideTime(event, ui) {
    //read the slider's values
    var time0 = ui.values[0];
    var time1 = ui.values[1];
    $('#time').text(timeFormat(time0) + ' - ' + timeFormat(time1));
}

//Time feedback formater
function timeFormat(time) {
    var hour = parseInt(time / 60 + 6, 10).toString();
    var minute = parseInt(time % 60, 10).toString();
    if (hour.length === 1) {
        hour = "0" + hour;
    }
    if (minute.length === 1) {
        minute = "0" + minute;
    }
    return hour + ':' + minute;
}

//Stops checkbox individual selection
$('input:checkbox[name="outbound"]').change(function() {
    formSelectionEvent(this, $('#OBSelect'));
});
$('input:checkbox[name="inbound"]').change(function() {
    formSelectionEvent(this, $('#IBSelect'));
});

//IB/OB checkbox whole group selection
$('input:checkbox[name="direction"]').change(function() {
    if ($(this).prop('checked')) {
        if (this.value == 'Outbound') {
            $('input:checkbox[name="outbound"]').prop('checked', true).each(function() {
                formSelectionEvent(this, $('#OBSelect'));
            });
        } else if (this.value == 'Inbound') {
            $('input:checkbox[name="inbound"]').prop('checked', true).each(function() {
                formSelectionEvent(this, $('#IBSelect'));
            });
        }
    } else if ($(this).prop('checked') === false) {
        if (this.value == 'Outbound') {
            $('input:checkbox[name="outbound"]').prop('checked', false).each(function() {
                formSelectionEvent(this, $('#OBSelect'));
            });
        } else if (this.value == 'Inbound') {
            $('input:checkbox[name="inbound"]').prop('checked', false).each(function() {
                formSelectionEvent(this, $('#IBSelect'));
            });
        }
    }
});

//Type selector
$('input:checkbox[name="type"]').change(function() {
    if ($(this).prop('checked')) {
        $('.' + this.value).prop('checked', true).each(function() {
            formSelectionEvent(this, mixedDirectionChooser(this));
        });
    } else if ($(this).prop('checked') === false) {
        $('.' + this.value).prop('checked', false).each(function() {
            formSelectionEvent(this, mixedDirectionChooser(this));
        });
    }
});

//Getting the right direction span for mixed selection - helper function
function mixedDirectionChooser(element) {
    var direction = element.value.substr(-2);
    if (direction == 'OB') {
        return $('#OBSelect');
    } else if (direction == 'IB') {
        return $('#IBSelect');
    }
}

// Viz 1 JS script
var vizDiv1 = document.getElementById('viz1');
var vizURL1 = "https://public.tableau.com/views/TSP_embed/Dashboard1";
var options1 = {
    hideTabs: true,
    hideToolbar: false,
    height: '460px',
    width: '563px',
    };
var viz1 = new tableau.Viz(vizDiv1, vizURL1, options1);

var vizDiv2 = document.getElementById('viz2');
var vizURL2 = "https://public.tableau.com/views/TSP_embed2/Dashboard1";
var options2 = {
    hideTabs: true,
    hideToolbar: false,
    height: '460px',
    width: '563px',
    };
var viz2 = new tableau.Viz(vizDiv2, vizURL2, options2);
