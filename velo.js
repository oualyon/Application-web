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
    Bar = new LeafIcon({iconUrl: 'img/Biere.png'}),
    Monument = new LeafIcon({iconUrl: 'img/monument.png'}) ;


/********** MAP  *****************/
var map = L.map('map').setView([45.7603831, 4.849664], 13);
// source=https://leaflet-extras.github.io/leaflet-providers/preview/
 var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
 	maxZoom: 20
 });
 CartoDB_Positron.addTo(map);


var markersVelov = L.layerGroup(1).addTo(map); // Create a layer group to store markers
var markersItinary = L.layerGroup(2).addTo(map); // Create a layer group to store markers
let GeolocalisationLayer ;

function createMarkers(data, variableName, markerIcon, markersLayer) {
    var selectedIcon;
    if (variableName == "Station") {
      selectedIcon = Station;
    } 
    else if (/^Barathon[AB]?/.test(variableName)    ) {
      selectedIcon = Bar;
    }else if (/^Balade_.*/.test(variableName)    ) {
      selectedIcon = Monument;
    } else {
      selectedIcon = markerIcon;
    }
    L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: selectedIcon});
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<b><big><u>Nom:</u>  " + feature.properties.Name + "<br> </b></big></u></br> <b>Adresse:&nbsp;</b>" + feature.properties.Adresse + "</b></big></u>  "+  feature.properties["Code Postal"]);
      }
    }).addTo(markersLayer);
  }
  
function mapFetch(variableName) {
    console.log(variableName); 
    const fetchUrl = process.env.NODE_ENV === "production" 
        ? `https://${window.location.hostname}/geo/${variableName}`
        : `http://localhost:5000/geo/${variableName}`;
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
      createMarkers(data, variableName, null , markersVelov);
    });
  }
  
function roadFetch(variableName) {
    const fetchUrl = process.env.NODE_ENV === "production" 
        ? `https://${window.location.hostname}/itinary/${variableName}`
        : `http://localhost:5000/itinary/${variableName}`;
        console.log(fetchUrl) ; 
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data) ; 
      createMarkers(data, variableName, null, markersItinary);
    });
  }
  
  $(".Reset").click(function(){
    markersVelov.clearLayers()
    markersItinary.clearLayers()
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
    var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

}

function handleLocationError(msg) {
    alert("Erreur lors de la géolocalisation");
}


/********** JQUERY  *****************/
$('#myForm').on('submit', function(event) {
    event.preventDefault(); // Empêche la soumission normale du formulaire
  
    var selectedOption = $('#container-btn option:selected').attr('id');
    console.log(selectedOption) ; 

    switch (selectedOption) {
      case 'balade_rhone':
          roadFetch(selectedOption);
        break;
      case 'BarathonA':
          roadFetch(selectedOption);
        break;
      case 'BarathonB':
          roadFetch(selectedOption);
          break;
      case 'Balade_Presquile_historique':
          roadFetch(selectedOption);
          break;
      case 'Balade_StreetArt_1':
            roadFetch(selectedOption);
            break;
      case 'Balade_StreetArt_2':
            roadFetch(selectedOption);
            break;
      case 'Balade_Vieux_Lyon_Historique':
            roadFetch(selectedOption);
        break;
      default:
        // Action à effectuer si aucune option n'est sélectionnée
        break;
    }
  });


$(".Velov").click(function() {
        var clicks = $(this).data('clicks');
        if (clicks) {
        var pointFix = $(this).attr("id");
        mapFetch(pointFix);
        } else {
            markersVelov.clearLayers();
        }
        $(this).data("clicks", !clicks);
});

$(".road").click(function() {
    var clicks = $(this).data('clicks');
    if (clicks) {
    var itinary = $(this).attr("id");
    roadFetch(itinary);
    } else {
        markersItinary.clearLayers() ; 
    }
    $(this).data("clicks", !clicks);
  });

/**** Geoloc ****/
$(".geolocalisation").click(function(){
    // var clicks = $(this).data('clicks') || true; 
var clicks = $(this).data('clicks') 
     if (clicks) {
        Geolocalisation();

     }else {
        geolocation.clearLayers() ; 
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
    GeolocalisationLayer = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

}

function handleLocationError(msg) {
    alert("Erreur lors de la géolocalisation");
}
/**** Geoloc ****/
$("#logo").click(function() {
    window.location.href  = "index.html";
})
