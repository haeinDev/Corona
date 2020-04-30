
function showMarker() {
    return remove();
    // need this to put into addListener
}

function remove() {
    deleteMarker();
    removeOverlay();
    // get the middle lines of longitude and latitude
    var latitude = map.getCenter().getLat();
    var longitude = map.getCenter().getLng();

    // ass latitude and longitude value into the url to get the data
    var Dataurl = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=" +
        latitude + "&lng=" + longitude + "&m=4500";
    //	m (number) maximum 5000

    var marker_img = "img/icon.png";
    var size = new kakao.maps.Size(30.30);
    var createImage = new kakao.maps.MarkerImage(marker_img, size);

    $.ajax({
        url: Dataurl,
        dataType: "json",
        type: 'GET',
        success: function (data) {
            for (var i = 0; i < data.count; i++) {
                //console.log('data.stores['+i+'].addr : ' + data.stores[i].addr);
                //console.log('data.stores['+i+'].code : ' + data.stores[i].code);
                //console.log('data.stores['+i+'].created_at : ' + data.stores[i].created_at);
                //console.log('data.stores['+i+'].latitude : ' + data.stores[i].latitude);
                //console.log('data.stores['+i+'].longitude : ' + data.stores[i].longitude);
                //console.log('data.stores['+i+'].name : ' + data.stores[i].name);
                //console.log('data.stores['+i+'].remain_stat : ' + data.stores[i].remain_stat);
                //console.log('data.stores['+i+'].stock_at : ' + data.stores[i].stock_at);
                //console.log('data.stores['+i+'].type : ' + data.stores[i].type);

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(data.stores[i].lat, data.stores[i].lng),
                    title: data.stores[i].name,
                    image: createImage
                });
                //<div class ="label"><span class="left"></span><span class="center">kakao!</span><span class="right"></span></div>'

                // Custom overlays
                var content = '<div class= "customoverlay"> <a href = "https://map.kakao.com/link/map/11394059" target = "_blank">'
                    + '<span class = "title">' + data.stores[i].name + '</span> </a> </div>';
                // location of custom overlay
                var position = kakao.maps.LatLng(data.stores[i].latitude, data.stores[i].longitude);
                var customOverlay = new kakao.maps.CustomOverlay({
                    yAnchor: 3, // location
                    // xAnchor
                    position: position,
                    content: content
                });
                // add marker into the array 
                kakao.maps.event.addListener(marker, 'click', clickmarker(marker, customOverlay, data.stores[i].name));
                overlays.push(customOverlay);
                markers.push(marker);

            }
        }
    });
}
// after pressing markers 
function clickmarker(marker, overlay, name) {

    return function () {

        if (!selectedMarker || selectedMarker !== marker) {
            for (var i = 0; i < overlays.length; i++) {
                overlays[i].setMap(null);

            }
            overlays[i].setMap(map);
            selectedoverlay = overlay;
            selectedMarker = marker;
        }
    }
}

// call back after keywordSearch
function callbackSearch(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // resetting the parameter of map from the searched point 
        var bounds = new kakao.maps.LatLngBounds();
        //add the location into LatLngBounds
        for (var i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
        remove();
    }
}
function searchMap() {
    ps.keywordSearch(search_input.val(), callbackSearch);
    search_input.val('');
    //search the location by keyword and the reset the input
}
function removeOverlay() {
    console.log("print the lengh of overlay " + overlays.length);
    for (var i = 0; i < overlays.length; i++) {
        overlays[i].setMap(null);
    } overlays = [];
}
// take out the marker from the map 
function deleteMarker() {
    for (var i = 0; i < overlays.length; i++) {
        markers[i].setMap(null);
    } markers = [];
}

