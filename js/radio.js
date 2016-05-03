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

//Change Text value of Stop selector
function stopSelectFromRadio(selected, flag){
    var stopSelected = selected.value;
    console.log(stopSelected);
    if(flag=='ob'){
        $('#OBSelect').text(stopSelected);
    }
    else if (flag=='ib') {
        $('#IBSelect').text(stopSelected);
    }
}
