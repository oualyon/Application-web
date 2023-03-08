/********** LOGO  *****************/
var LeafIcon = L.Icon.extend({
    options: {
        //shadowUrl: 'leaf-shadow.png',
        iconSize:     [50, 50],
        // shadowSize:   [50, 64],
        iconAnchor:   [25,50],
        // shadowAnchor: [4, 62],
        popupAnchor:  [0, -39]
    }
});
var Station = new LeafIcon({iconUrl: 'img/Station.png'}),
Bar = new LeafIcon({iconUrl: 'img/biere.png'});


/********** MAP  *****************/
var map = L.map('map').setView([45.7603831, 4.849664], 13);
// source=https://leaflet-extras.github.io/leaflet-providers/preview/
 var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
 	maxZoom: 20
 });
 CartoDB_Positron.addTo(map);


var markers = L.layerGroup().addTo(map); // Create a layer group to store markers

function mapFetch(variableName) {
    /*** Qualif ***/
    fetch('http://localhost:5000/geo/' + variableName)
    /*** Qualif ***/
    
    /*** Production ***/
    // const domain = window.location.hostname;
    // const url = 'https://' + domain + '/geo/' + variableName;
    // fetch(url)
    /*** Production ***/
    .then(res => res.json())
    .then(data => {
        // markers.clearLayers(); // Clear all markers before adding new ones
        var selectedIcon; 
        if(variableName == "Station"){
            selectedIcon = Station;
        }
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: selectedIcon});
            },
            onEachFeature: function (feature, layer) {

                layer.bindPopup("<b><big><u>Nom:</u>  " + feature.properties.Name + "<br> </b></big></u></br> <b>Adresse:&nbsp;</b>" + feature.properties.Adresse + "</b></big></u>  "+  feature.properties["Code Postal"] );
            }
        }).addTo(markers); // Add new markers to the markers layer group
    });
}


function roadFetch(variableName) {
    /*** Qualif ***/
    fetch('http://localhost:5000/itinary/' + variableName)
    /*** Qualif ***/
    
    /*** Production ***/
    // const domain = window.location.hostname;
    // const url = 'https://' + domain + '/geo/' + variableName;
    // fetch(url)
    /*** Production ***/
    .then(res => res.json())
    .then(data => {
        // markers.clearLayers(); // Clear all markers before adding new ones
        var selectedIcon; 
        if(variableName == "Station"){
            selectedIcon = Station;
        }
        else if(/^Bar/.test(variableName)){
            selectedIcon = Bar;
        }
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: selectedIcon});
            },
            onEachFeature: function (feature, layer) {

                layer.bindPopup("<b><big><u>Nom:</u>  " + feature.properties.Name + "<br> </b></big></u></br> <b>Adresse:&nbsp;</b>" + feature.properties.Adresse + "</b></big></u>  "+  feature.properties["Code Postal"] );
            }
        }).addTo(markers); // Add new markers to the markers layer group
    });
}


/********** JQUERY  *****************/
$(".btn-filtre").click(function(){
    var maVariable = $(this).attr("id");
    mapFetch(maVariable);
});

$(".road").click(function(){
    var maVariable = $(this).attr("id");
    roadFetch(maVariable);
});
