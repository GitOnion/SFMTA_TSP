// LeafletJS: Setting up the map
var mymap = L.map('mapid', {zoomControl: false}).setView([37.785, -122.465], 16);

// Adding Tile Layer (the map)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'superonion.pn7p5mjo',
    accessToken: 'pk.eyJ1Ijoic3VwZXJvbmlvbiIsImEiOiJjaW41anY0MWMwY3FqdXBra2Nudm5keTdiIn0.QU9itsq1crBsfAWmmGFbBg'
}).addTo(mymap);

//Define the marker class
var stopIcon = L.Icon.extend({
    options: {
        iconSize: [30, 30],
        shadowSize: [33, 15]
    }
});
//Instantiate the Icons
var OBIcon = new stopIcon({iconUrl: 'left.svg', shadowUrl: 'shadow_left.svg', iconAnchor: [15, 30], shadowAnchor: [9,15]});
var IBIcon = new stopIcon({iconUrl: 'right.svg', shadowUrl: 'shadow_right.svg', iconAnchor: [15, 0], shadowAnchor: [9, -15]});

//Coordinates and names of Outbound stops
var OBCoord = [[37.785729, -122.459564],[37.785386, -122.462279], [37.785037, -122.464890], [37.784794, -122.466989], [37.784688, -122.469160], [37.784617, -122.470800], [37.784527, -122.472972]];
var OBStopNames = ['ArguelloOB', '4thOB', '6thOB', '8thOB', '10thOB', '12thOB', 'PresidioOB'];
var OBStops = {};

//Coordinates and names of Inbound stops
var IBCoord = [[37.784357, -122.472820],[37.784447, -122.471171], [37.784540, -122.469060], [37.784633, -122.466895], [37.784896, -122.464782], [37.785171, -122.462623], [37.785637, -122.458982]];
var IBStopNames = ['PresidioIB', '12thIB', '10thIB', '8thIB', '6thIB', '4thIB', 'ArguelloIB'];
var IBStops = {};

//Instantiate markers and assign names to stop coordinates, then store the object in OBStops
$.each(OBCoord, function(stopNo, stopCoord){
    var stopName = OBStopNames[stopNo];
    OBStops[stopName] = L.marker(stopCoord, {icon: OBIcon}).on('click', function(e){
        stopSelector(e, stopName);
    }).addTo(mymap);
});

//Instantiate markers and assign names to stop coordinates, then store the object in IBStops
$.each(IBCoord, function(stopNo, stopCoord){
    var stopName = IBStopNames[stopNo];
    IBStops[stopName] = L.marker(stopCoord, {icon: IBIcon}).on('click', function(e){
        stopSelector(e, stopName);
    }).addTo(mymap);
});

//Day of Week RadioButton Group
$('input:radio[name="day"]').change(function(){
    var daySelected = this.value;
    console.log(daySelected);
    $('#day').text(daySelected);
});

//Time of Day Slider
$("#slider-range").slider({
    //slide will pass on the slide event and the ui selected (See document of jQuery UI)
    range: true,
    min: 0,
    max: 960,
    values: [60, 180],
    step:5,
    slide: slideTime
});

function slideTime(event, ui){
    //read the slider's values
    var time0 = ui.values[0];
    var time1 = ui.values[1];
    console.log(time0, time1);
    $('#time').text(timeFormat(time0) + ' - ' + timeFormat(time1));
}

//Time feedback formater
function timeFormat(time){
    var hour = parseInt(time/60+6, 10).toString();
    var minute = parseInt(time%60, 10).toString();
    if (hour.length === 1){
        hour = "0" + hour;
    }
    if (minute.length === 1){
        minute = "0" + minute;
    }
    return hour + ':' + minute;
}

//IB/OB RadioButton Default: Outbound
$('input:radio[name="inbound"]').attr('disabled', true);
$('.options-IB').attr('style', 'color:#eee');

//IB/OB RadioButton Group
$('input:radio[name="direction"]').change(function(){
    if(this.value == 'Inbound'){
        $('input:radio[name="outbound"]').attr('disabled', true);
        $('.options-OB').attr('style', 'color:#eee');
        $('#OBSelect').text('');
        $('input:radio[name="inbound"]').attr('disabled', false);
        $('.options-IB').attr('style', 'color: black');
    }
    else if (this.value =='Outbound') {
        $('input:radio[name="inbound"]').attr('disabled', true);
        $('.options-IB').attr('style', 'color:#eee');
        $('#IBSelect').text('');
        $('input:radio[name="outbound"]').attr('disabled', false);
        $('.options-OB').attr('style', 'color: black');
    }
});

//Stops RadioButton Group
$('input:radio[name="outbound"]').change(function(){
    stopSelectFromRadio(this, 'ob');
});
$('input:radio[name="inbound"]').change(function(){
    stopSelectFromRadio(this, 'ib');
});

function stopSelectFromRadio(selected, flag){
    var stopSelected = selected.value;
    console.log(stopSelected);
	
	// Added by Paul: 
	$( "#busName" ).empty();
	$( "#busName" ).append( stopNames[stopSelected] );
	
	$( "#busLen" ).empty()
	$( "#busLen" ).append( stopLen[stopSelected] + " feet" );
	
	$( "#busLights" ).empty()
	$( "#busLights").append( $.each( stopLights[stopSelected], function(i, val) {'<tr><td>' + val + '</td></tr>'} ))
	
    if(flag=='ob'){
        $('#OBSelect').text(stopSelected);
    }
    else if (flag=='ib') {
        $('#IBSelect').text(stopSelected);
    }
}


//Create object of bus stop names
var stopNames = {'ArguelloOB':'California St. and Arguello Blvd., Outbound',
				'4thOB':'California St. and 4th Ave., Outbound',
				'6thOB':'California St. and 6th Ave., Outbound', 
				'8thOB':'California St. and 8th Ave., Outbound', 
				'10thOB':'California St. and 10th Ave., Outbound', 
				'12thOB':'California St. and 12th Ave., Outbound', 
				'PresidioOB':'California St. and Park Presidio Blvd., Outbound',
				'PresidioIB':'California St. and Park Presidio Blvd., Inbound', 
				'12thIB':'California St. and 12th Ave., Inbound', 
				'10thIB':'California St. and 10th Ave., Inbound', 
				'8thIB':'California St. and 8th Ave., Inbound', 
				'6thIB':'California St. and 6th Ave., Inbound', 
				'4thIB':'California St. and 4th Ave., Inbound', 
				'ArguelloIB':'California St. and Arguello Blvd., Inbound'};
				
//Create object of bus stop names
var stopLen = {	'4thOB':789.63,
				'6thOB':756.92, 
				'8thOB':633.91, 
				'10thOB':623.75, 
				'12thOB':475.05, 
				'PresidioOB':619.58,
				'12thIB':485.28, 
				'10thIB':614.66, 
				'8thIB':623.6, 
				'6thIB':616.69, 
				'4thIB':631.61, 
				'ArguelloIB':1097.69};

var stopLights = {	'4thOB':['None'],
				'6thOB':['4th Ave.','6th Ave.'], 
				'8thOB':['8th Ave.'], 
				'10thOB':['10th Ave.'], 
				'12thOB':['None'], 
				'PresidioOB':['12th Ave.','Park Presidio Blvd.'], 
				'12thIB':['Park Presidio Blvd.'], 
				'10thIB':['12th Ave.'], 
				'8thIB':['10th Ave.'], 
				'6thIB':['8th Ave.'], 
				'4thIB':['6th Ave.'], 
				'ArguelloIB':['6th Ave.','Arguello Blvd.']};
				