// LeafletJS: Setting up the map
var mymap = L.map('mapid', {
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false
}).setView([37.785, -122.465], 16);

// Adding Tile Layer (the map)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'superonion.pn7p5mjo',
    accessToken: 'pk.eyJ1Ijoic3VwZXJvbmlvbiIsImEiOiJjaW41anY0MWMwY3FqdXBra2Nudm5keTdiIn0.QU9itsq1crBsfAWmmGFbBg'
}).addTo(mymap);

//Define the icon class
var stopIcon = L.Icon.extend({
    options: {
        iconSize: [30, 30],
    }
});
//Instantiate the Icons
//Normal (unselected) Icons
var OBIcon = new stopIcon({
    iconUrl: 'OB.svg',
    iconAnchor: [15, 30]
});
var IBIcon = new stopIcon({
    iconUrl: 'IB.svg',
    iconAnchor: [15, 0]
});

//Selected Icons
var OBIconSelect = new stopIcon({
    iconUrl: 'OB_select.svg',
    iconAnchor: [15, 30]
});
var IBIconSelect = new stopIcon({
    iconUrl: 'IB_select.svg',
    iconAnchor: [15,0]
});

var routeLineOptions = {
    color: 'yellow',
    weight: 5,
    lineCap: 'round'
};

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
var OBStopNames = ['ArguelloOB', '4thOB', '6thOB', '8thOB', '10thOB', '12thOB', 'PresidioOB'];

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
var IBStopNames = ['PresidioIB', '12thIB', '10thIB', '8thIB', '6thIB', '4thIB', 'ArguelloIB'];

//Holder of all markers
var allStops = {};
var allLines = {};

//Instantiate markers and assign names to stop coordinates, then store the object in OBStops
$.each(OBCoord, function(stopNo, stopCoord) {
    var stopName = OBStopNames[stopNo];
    allStops[stopName] = L.marker(stopCoord, {
        icon: OBIcon
    }).on('click', function(e) {
        stopSelector(e, stopName);
    }).addTo(mymap);
});

//Instantiate markers and assign names to stop coordinates, then store the object in IBStops
$.each(IBCoord, function(stopNo, stopCoord) {
    var stopName = IBStopNames[stopNo];
    allStops[stopName] = L.marker(stopCoord, {
        icon: IBIcon
    }).on('click', function(e) {
        stopSelector(e, stopName);
    }).addTo(mymap);
});

//Add and pop selection into display when it's been selected/deselected,
//Also change the corresponding marker's icon;
function formSelectionEvent(element, display) {
    var select = element.value;
    var direction = select.substr(-2);
    var stopMarker = allStops[select];
    var textHolder = display.text();
    if ($(element).prop('checked')) {
        //Add selection into display when it's been selected
        textHolder = textHolder + ' ' + select;
        display.text(textHolder);
        //Change corresponding icon
        if(stopMarker){
            iconChanger(stopMarker, 'checked', direction);
            lineDrawer(select, stopMarker, 'checked', direction);
        }
    } else {
        //Pop selection from display when it's been deselected
        var selectLength = select.length;
        selectIndex = textHolder.indexOf(select);
        textHolder = textHolder.substr(0, selectIndex) + textHolder.substr(selectIndex + selectLength);
        display.text(textHolder);
        //Change icon
        if(stopMarker){
            iconChanger(stopMarker, 'unchecked', direction);
            lineDrawer(select, stopMarker, 'unchecked', direction);
        }
    }
}

//Change the marker's icon according to the stop selected
function iconChanger(stop, status, direction){
    if (status == 'checked'){
        if(direction == 'OB'){
            stop.setIcon(OBIconSelect);
        }
        else if(direction == 'IB'){
            stop.setIcon(IBIconSelect);
        }
    }
    else if (status == 'unchecked'){
        if(direction == 'OB'){
            stop.setIcon(OBIcon);
        }
        else if(direction == 'IB'){
            stop.setIcon(IBIcon);
        }
    }
}

function lineDrawer(select, stop, status, direction){
    var desCoord = [stop.getLatLng().lat, stop.getLatLng().lng];
    var oriCoord;
    // Finding the coordinates of the previous stop
    if (direction == 'OB'){
        oriCoord = OBCoord[findIndexOfCoord(OBCoord, desCoord)-1];
    }
    else if (direction == 'IB'){
        oriCoord = IBCoord[findIndexOfCoord(IBCoord, desCoord)-1];
    }
    console.log([oriCoord, desCoord]);
    // Attaching line;
    if (status == 'checked') {
        allLines[select] = L.polyline([oriCoord, desCoord], routeLineOptions).addTo(mymap);
    }
    else if (status == 'unchecked'){
        mymap.removeLayer(allLines[select]);
    }
}

function findIndexOfCoord(coordArray, target){
    for (var i=0; i<coordArray.length; i++){
        if(coordArray[i][0] == target[0] && coordArray[i][1] == target[1]){
            return i;
        }
    }
}
// 534687max
//Day of Week Checkbox Group
$('input:checkbox[name="day"]').change(function() {
    formSelectionEvent(this, $('#day'));
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
    console.log(time0, time1);
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

//IB/OB checkbox group selection
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

//Stops RadioButton Group
$('input:checkbox[name="outbound"]').change(function() {
    formSelectionEvent(this, $('#OBSelect'));
});
$('input:checkbox[name="inbound"]').change(function() {
    formSelectionEvent(this, $('#IBSelect'));
});
