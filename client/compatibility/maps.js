var smallMap;

/*Called with JSON object of event data and updates the currently viewed map*/
function updateMap(eventData) 
{
	if (Session.get("map") == "smallMap") 
	{
		smallMap.clearMarkers();
		var latlng = [];
		for(var i in eventData)
		{
			var eve = eventData[i];
			latlng[latlng.length] = new google.maps.LatLng(eve.venue.latitude, eve.venue.longitude, true);
			
			if(eve.venue == undefined)
				break;
			var marker = new google.maps.Marker({
			    position: latlng[latlng.length-1],
			    map: smallMap,
			    title: 'Click to zoom'
			});
			
			google.maps.event.addListener(marker, 'click', function() {
			    smallMap.setZoom(13);
				smallMap.setCenter(marker.getPosition());
			});
		}

		google.maps.event.clearListeners(smallMap, 'center_changed');
		
		var latlngbounds = new google.maps.LatLngBounds();
		latlng.forEach(function(n){
		   latlngbounds.extend(n);
		});
		smallMap.setCenter(latlngbounds.getCenter());
		smallMap.fitBounds(latlngbounds); 
	}
}

function GMapInitialize() 
{
	//Configuring the API to clear markers
	google.maps.Map.prototype.markers = new Array();

	google.maps.Map.prototype.getMarkers = function() {
	    return this.markers
	};
	
	google.maps.Map.prototype.clearMarkers = function() {
	    for(var i=0; i<this.markers.length; i++){
	        this.markers[i].setMap(null);
	    }
	    this.markers = new Array();
	};
	
	google.maps.Marker.prototype._setMap = google.maps.Marker.prototype.setMap;
	
	google.maps.Marker.prototype.setMap = function(map) {
	    if (map) {
	        map.markers[map.markers.length] = this;
	    }
	    this._setMap(map);
	}

	//Create the smallMap at the the user's coordinates
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(Session.get("latitude"),Session.get("longitude"))
	};
			
	smallMap = new google.maps.Map(document.getElementById('small_map'),
	mapOptions);
	
	var marker = new google.maps.Marker({
		position: smallMap.getCenter(),
		map: smallMap,
		title: 'Click to zoom'
	});
	  
	google.maps.event.addListener(marker, 'click', function() {
		smallMap.setZoom(13);
		smallMap.setCenter(marker.getPosition());
	});
	
	google.maps.event.addListener(smallMap, 'center_changed', function() {
	// 3 seconds after the center of the map has changed, pan back to the marker.
		window.setTimeout(function() {
			smallMap.panTo(marker.getPosition());
		}, 3000);
	});
	  
	  Session.set("map","smallMap");
}

function load_maps() 
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
	addLoadEvent(GMapInitialize)
}
