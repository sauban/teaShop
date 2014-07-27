var sj = document.getElementById("vas");
     var docs = sj.getAttribute('data-locations');
     var data = JSON.parse(docs);
var lat = data.location.lat,
    long = data.location.long,
    description = data.Description,
    mylatLng = new google.maps.LatLng(lat, long);
    

    function loadMap(){
    	var mapOptions = {
    	  zoom: 14,
    	  center: mylatLng
    	}
console.log(data);
	
	  var map = new google.maps.Map(document.getElementById('map'),
	      mapOptions);

	  var marker = new google.maps.Marker({
				    position: mylatLng,
                    animation:google.maps.Animation.BOUNCE
				});

	  marker.setMap(map);

	  var infowindow = new google.maps.InfoWindow({
			  content : description
			  });

	   google.maps.event.addListener(marker, 'click', function() {
           infowindow.open(map,marker);
       });
	};



  google.maps.event.addDomListener(window, 'load', loadMap);

