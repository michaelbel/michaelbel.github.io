var markers = [
    {lat: 55.5008601, lng: 35.9891899, city: "Можайск", url:"http://michaelbel.org/travel/mozhaysk"},
    {lat: 55.75343, lng: 37.6176402, city: "Москва", url:"http://michaelbel.org/travel/moscow"},
    {lat: 56.18519, lng: 36.9493577, city: "Солнечногорск", url:"http://michaelbel.org/travel/solnechnogorsk"}
];

var map, infoWindow;

function initMap() {
    var centerLatLng = new google.maps.LatLng(55.7638145, 37.6048783);
    var mapOptions = {
        center: centerLatLng,
        zoom: 7
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(map, "click", function() {
        infoWindow.close();
    });

    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++){
        var latLng = new google.maps.LatLng(markers[i].lat, markers[i].lng);
        var city = markers[i].city;
        var url = markers[i].url;
        addMarker(latLng, city, url);
        bounds.extend(latLng);
    }

    map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, "load", initMap);

function addMarker(latLng, city, url) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: city
    });

    google.maps.event.addListener(marker, "click", function() {
        var contentString = '<div class="infowindow">' +
                                '<h6>' + city + '</h6>' +
                                '<a href="' + url + '">Перейти</a>' +
                            '</div>';

        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
}
