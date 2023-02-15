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
var BasketBall = new LeafIcon({iconUrl: 'img/Basketball.png'}),
    FootBall = new LeafIcon({iconUrl: 'img/Football.png'}),
    Gymnase = new LeafIcon({iconUrl: 'img/Gymnase.png'}),
    Natation = new LeafIcon({iconUrl: 'img/Natation.png'}),


    Rugby = new LeafIcon({iconUrl: 'img/Rugby.png'});

/********** MAP  *****************/
var map = L.map('map').setView([45.7603831, 4.849664], 13);
// source=https://leaflet-extras.github.io/leaflet-providers/preview/
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
OpenStreetMap_France.addTo(map);

var markers = L.layerGroup().addTo(map); // Create a layer group to store markers

function mapFetch(variableName) {
//fetch('https://www.oualyon.fr/geo/' + variableName)
    const domain = window.location.hostname;
    const url = 'https://' + domain + '/geo/' + variableName;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        markers.clearLayers(); // Clear all markers before adding new ones
        var selectedIcon;
        if(variableName == "BasketBall"){
            selectedIcon = BasketBall;
        }
        else if(variableName == "FootBall"){
            selectedIcon = FootBall;
        }
        else if(variableName == "Gymnase"){
            selectedIcon = Gymnase;
        }
        else if(variableName == "Natation"){
            selectedIcon = Natation;
        }
        else if(variableName == "Rugby"){
            selectedIcon = Rugby;
        }
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: selectedIcon});
            },
            onEachFeature: function (feature, layer) {
                console.log(feature.properties);
                console.error(feature.properties.Name);
                layer.bindPopup(feature.properties.Name);
            }
        }).addTo(markers); // Add new markers to the markers layer group
    });
}





/********** JQUERY  *****************/
$(".btn-filtre").click(function(){
    var maVariable = $(this).attr("id");
    mapFetch(maVariable);
});
