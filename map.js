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
    Rugby = new LeafIcon({iconUrl: 'img/Rugby.png'}), 
    Homme = new LeafIcon({iconUrl: 'img/homme.png'})
    SkatePark = new LeafIcon({iconUrl: 'img/Skateboard.png'}),
    Equitation = new LeafIcon({iconUrl: 'img/Equitation.png'}),
    Danse = new LeafIcon({iconUrl: 'img/Danse.png'}),
    Baseball = new LeafIcon({iconUrl: 'img/Baseball.png'}),
    Station = new LeafIcon({iconUrl: 'img/Station.png'})    
    ;

   

/********** MAP  *****************/
var map = L.map('map').setView([45.7603831, 4.849664], 13);
// source=https://leaflet-extras.github.io/leaflet-providers/preview/
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
OpenStreetMap_France.addTo(map);

var markers = L.layerGroup().addTo(map); // Create a layer group to store markers
var myLayers = {};
function mapFetch(variableName) {
    const icons = {
        "BasketBall": BasketBall,
        "Tir": Tir,
        "Course%20à%20pied": Course,
        "Tennis%20de%20table": Tennis_table,
        "Arts%20martiaux": Martiaux,
        "Pétanque": Petanque,
        "VolleyBall": VolleyBall,
        "Escalade": Escalade,
        "FootBall": FootBall,
        "Gymnase": Gymnase,
        "Natation": Natation,
        "Rugby": Rugby,
        "Randos": Randos,
        "Station": Station,
        "SkatePark": SkatePark,
        "Equitation": Equitation,
        "Baseball": Baseball,
        "Danse": Danse,
        "Station": Station


    };

    const fetchUrl = process.env.NODE_ENV === "production" 
        ? `https://${window.location.hostname}/geo/${variableName}`
        : `http://localhost:5000/geo/${variableName}`;

       // Créer une variable globale pour stocker les layers

fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                const selectedIcon = icons[variableName];
                const markerLayer = L.marker(latlng, {icon: selectedIcon} , feature.properties.Category);
                return markerLayer;
            },
            onEachFeature: function (feature, layer) {
                const name = feature.properties.Name;
                const address = feature.properties.Adresse;
                const postalCode = feature.properties["Code Postal"];
                layer.bindPopup(`<b><big><u>Nom:</u> ${name}<br></b></big></u> <b>Adresse:&nbsp;</b> ${address}</b></big></u> ${postalCode}`);
            }
        }).addTo(markers);
    })
    .catch(error => {
        console.error(`Error fetching ${fetchUrl}`, error);
    });
    
}




/********** JQUERY  *****************/
$(".sport").click(function(){
    var clicks = $(this).data('clicks') || true; 
     if (clicks) {
         var maVariable = $(this).attr("id");
         mapFetch(maVariable);
     }else {
        markers.clearLayers();
        console.log('test');
     }
     $(this).data("clicks", !clicks);
 });

 $(".Velov").click(function() {
    var clicks = $(this).data('clicks');
    
    if (clicks) {
        var maVariable = $(this).attr("id");
        console.log('testid');
        mapFetch(maVariable);
    } else {
        markers.clearLayers();
        console.log('test');
    }
    $(this).data("clicks", !clicks);
});

function clearMarkers() {
    markers.clearLayers();
}

 $(".Reset").click(function(){
    markers.clearLayers();
 });

 $(".geolocalisation").click(function(){
    var clicks = $(this).data('clicks') 
     if (clicks) {
        Geolocalisation();
     }
     $(this).data("clicks", !clicks);
 });
function Geolocalisation(){
    const locationOptions = {
        maximumAge: 10000,
        timeout: 5000,
        enableHighAccuracy: true
    };
     /* Verifie que le navigateur est compatible avec la géolocalisation */
     if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError, locationOptions);
    } else {
        /* Le navigateur n'est pas compatible */
        alert("Géolocalisation indisponible");
    }

}


function handleLocation(position) {
    /* Zoom avant de trouver la localisation */
    map.setZoom(18);
    /* Centre la carte sur la latitude et la longitude de la localisation de l'utilisateur */
    map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
    var marker = L.marker([position.coords.latitude, position.coords.longitude] , {icon: Homme}).addTo(map);

}

function handleLocationError(msg) {
    alert("Erreur lors de la géolocalisation");
}

$("#logo").click(function() {
    window.location.href  = "index.html";
})