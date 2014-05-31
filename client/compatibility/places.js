function GPlacesInitialize()
{
	codeLatLng();
}

function codeLatLng() {
	var geocoder;
	var lat = Session.get("latitude");
  	var lng = Session.get("longitude");

	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(lat, lng);
  	geocoder.geocode({'latLng': latlng}, function(results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
    		console.log(results[1].address_components[1]);
    		if (results[1]) {
      			Session.set("city", results[1].address_components[1].long_name);
      			console.log(Session.get("city"));
      		} else {
        		console.log('No results found');
      		}
    	} else {
      		console.log('Geocoder failed due to: ' + status);
      		console.log(google.maps.GeocoderStatus);
    	}
  	});
}

function load_places() 
{ 
	/**************Google Maps SDK****************/
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
		    	if (oldonload) {
		    		oldonload();
		    	}
		    	func();
			}
		}
	}
	addLoadEvent(GPlacesInitialize)
}