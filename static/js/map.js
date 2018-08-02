var markers = [
    {
        lat: 55.4958678, // Широта
        lng: 35.8604368, // Долгота
        name: "Станция Бородино", // Название, которое будем выводить в информационном окне
        address:"http://michaelbel.org/travel/station" // Адрес, при клике на 'перейти'
    },

    {
        lat: 55.7638145,
        lng: 37.6048783,
        name: "Парад Победы 2010", // Тверская улица
        address:"http://michaelbel.org/travel/pobeda2010"
    },

    { lat: 55.5164576, lng: 35.8046723, name: "Бородино", address:"http://michaelbel.org/travel/borodino" },
    { lat: 55.7508359, lng: 37.5883487, name: "Фили", address:"http://michaelbel.org/travel/fili" },
    { lat: 55.8268682, lng: 37.6242491, name: "ВДНХ", address:"http://michaelbel.org/travel/vdnkh" },
    { lat: 55.5091681, lng: 36.0081298, name: "Ново-Никольский собор", address:"http://michaelbel.org/travel/st-nicholas-cathedral" },
    { lat: 55.738761, lng: 37.5209623, name: "Бородинская панорама", address:"http://michaelbel.org/travel/panorama" },
    { lat: 55.7311251, lng: 37.498963, name: "Парк Победы на Поклонной горе", address:"http://michaelbel.org/travel/poklonnaya" },
    { lat: 55.8455768, lng: 37.5024645, name: "Кронштадтский бульвар", address:"http://michaelbel.org/travel/kronstadt-boulevard" },
    { lat: 56.2103556, lng: 36.9376332, name: "Сенежское озеро", address:"http://michaelbel.org/travel/senezh" },
    { lat: 55.7718364, lng: 37.7516772, name: "Парк Парк «Измайлово»", address:"http://michaelbel.org/travel/izmaylovsky" },
    { lat: 55.6704144, lng: 37.6673095, name: "Парк «Коломенское»", address:"http://michaelbel.org/travel/kolomenskoye" },
    { lat: 55.729911, lng: 37.6001742, name: "Парк Горького", address:"http://michaelbel.org/travel/gorky" },
    { lat: 55.7515997, lng: 37.6262287, name: "Парк «Зарядье»", address:"http://michaelbel.org/travel/zaryadye" },
    { lat: 55.7553254, lng: 37.7070249, name: "НИУ МЭИ", address:"http://michaelbel.org/travel/mpei" },
    { lat: 55.7350653, lng: 37.6052744, name: "Парк искусств «Музеон»", address:"http://michaelbel.org/travel/muzeon" },
    { lat: 55.6214425, lng: 37.558599, name: "Битцевский лес", address:"http://michaelbel.org/travel/bitsa" }
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

    // Определяем границы видимой области карты в соответствии с положением маркеров
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++){
        var latLng = new google.maps.LatLng(markers[i].lat, markers[i].lng);
        var name = markers[i].name;
        var address = markers[i].address;
        addMarker(latLng, name, address);
        // Расширяем границы нашей видимой области, добавив координаты нашего текущего маркера
        bounds.extend(latLng);
    }

    // Автоматически масштабируем карту так, чтобы все маркеры были в видимой области карты
    map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, "load", initMap);

function addMarker(latLng, name, address) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: name
    });

    google.maps.event.addListener(marker, "click", function() {
        var contentString = '<div class="infowindow">' +
                                '<h6>' + name + '</h6>' +
                                '<a href="' + address + '">Перейти</a>' +
                            '</div>';

        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
}
