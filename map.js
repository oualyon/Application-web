
var map = L.map('map').setView([45.7603831, 4.849664], 13);

// source=https://leaflet-extras.github.io/leaflet-providers/preview/
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
OpenStreetMap_France.addTo(map);

fetch("sport.geojson").then(res => res.json()).then(data => {
    // add GeoJSON layer to the map once the file is loaded
    L.geoJson(data).addTo(map);
    L.geoJson(data).bindPopup(
    function(layer){
        return layer.feature.properties.Nom ; 
    }).addTo(map);

});