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
    Randos = new LeafIcon({iconUrl: 'img/Randos.png'}),
    Station = new LeafIcon({iconUrl: 'img/Station.png'}),
    Tir = new LeafIcon({iconUrl: 'img/Archer.png'}),
    Course = new LeafIcon({iconUrl: 'img/Course.png'}),
    Escalade = new LeafIcon({iconUrl: 'img/Escalade.png'}),
    Petanque = new LeafIcon({iconUrl: 'img/Petanque.png'}),
    Tennis_table = new LeafIcon({iconUrl: 'img/Pingpong.png'}),
    VolleyBall = new LeafIcon({iconUrl: 'img/Volley.png'}),
    Martiaux = new LeafIcon({iconUrl: 'img/Judo.png'}),
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
        markers.clearLayers();
        var selectedIcon;

        if(variableName == "BasketBall"){
            selectedIcon = BasketBall;
        }
        else if(variableName == "Tir"){
            selectedIcon = Tir;
        }
        else if(variableName == "Course%20à%20pied"){
            selectedIcon = Course;
        }
        else if(variableName == "Tennis%20de%20table"){
            selectedIcon = Tennis_table;
        }
        else if(variableName == "Arts%20martiaux"){
            selectedIcon = Martiaux;
        }
        else if(variableName == "Pétanque"){
            selectedIcon = Petanque;
        }
        else if(variableName == "VolleyBall"){
            selectedIcon = VolleyBall;
        }
        else if(variableName == "Escalade"){
            selectedIcon = Escalade;
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
        else if(variableName == "Randos"){
            selectedIcon = Randos;
        }
        else if(variableName == "Station"){
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


/********** JQUERY  *****************/
var maVariablePrecedente = "";

$(".sport").click(function(){
    // var clicks = $(this).data('clicks') || true; 
var clicks = $(this).data('clicks') 
     if (clicks) {
         var maVariable = $(this).attr("id");
         mapFetch(maVariable);
     }
     if (!clicks) {
         markers.clearLayers() ; 
     }
     $(this).data("clicks", !clicks);
 });

function clearMarkers() {
    markers.clearLayers();
}

$("#logo").click(function() {
    window.location.href  = "index.html";
})