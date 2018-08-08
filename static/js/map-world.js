var markers = [
    {lat: 59.5948255, lng: 89.4373294, country: "Россия", url:"http://michaelbel.org/travel"},
    {lat: 46.9578225, lng: 26.1467459, country: "Молдова", url:"http://michaelbel.org/travel"}
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
        var country = markers[i].country;
        var url = markers[i].url;
        addMarker(latLng, country, url);
        bounds.extend(latLng);
    }

    map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, "load", initMap);

function addMarker(latLng, country, url) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: country
    });

    google.maps.event.addListener(marker, "click", function() {
        var contentString = '<div class="infowindow">' +
                                '<h6>' + country + '</h6>' +
                                '<a href="' + url + '">Перейти</a>' +
                            '</div>';

        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
}
