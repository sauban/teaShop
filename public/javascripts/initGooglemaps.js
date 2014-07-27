function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(18.9750, 72.8258)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  google.maps.event.addListener(map, "rightclick", function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
    alert("Lat=" + lat + "; Lng=" + lng);
  });

};




window.onload = initialize();