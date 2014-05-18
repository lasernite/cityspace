function load_maps() 
{ 
	/**************Google Maps SDK****************/
	function GMapInitialize() 
	{
		if (navigator.geolocation) {
  			var mapOptions = {
	    		zoom: 4,
	    		center: new google.maps.LatLng(Session.get("latitude"),Session.get("longitude"))
	  		};
		}
		else {
			var mapOptions = {
	    		zoom: 4,
	    		center: new google.maps.LatLng(-25.363882, 131.044922)
		  	};
		}			
		
	  var map = new google.maps.Map(document.getElementById('small_map'),
	      mapOptions);
	
	  var marker = new google.maps.Marker({
	    position: map.getCenter(),
	    map: map,
	    title: 'Click to zoom'
	  });
	
	  google.maps.event.addListener(map, 'center_changed', function() {
	    // 3 seconds after the center of the map has changed, pan back to the
	    // marker.
	    window.setTimeout(function() {
	      map.panTo(marker.getPosition());
	    }, 3000);
	  });
	
	  google.maps.event.addListener(marker, 'click', function() {
	    map.setZoom(8);
	    map.setCenter(marker.getPosition());
	  });
	}
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
	addLoadEvent(GMapInitialize)
}
