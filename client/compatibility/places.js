function GPlacesInitialize()
{
	var geocoder;
	function codeLatLng() {
		geocoder = new google.maps.Geocoder();
	  var latlng = new google.maps.LatLng(lat, lng);
	  geocoder.geocode({'latLng': latlng}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      if (results[1]) {
	      	Session.set("city", results[1].formatted_address[3].long_name);
	      } else {
	        alert('No results found');
	      }
	    } else {
	      alert('Geocoder failed due to: ' + status);
	    }
	  });
	}
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