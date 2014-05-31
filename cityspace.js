// Meteor Client Side

Cities = new Meteor.Collection("Cities");
// global events
fbeventinfo = [5];

if (Meteor.isClient) {
	
	(function detectBrowser(d) 
	{
		var useragent = navigator.userAgent;
		var mapdiv = d.getElementById("small_map");
		
		if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) 
		{
			$("#small_map").css('width','100%');
			$("#small_map").css('height','100%');
		}
	})(document)
			
	Session.setDefault("city", "City");
  	Session.setDefault("latitude", 43.600035);
  	Session.setDefault("longitude", 1.437836);
  	Session.setDefault("fbEventData",[])
  	Session.setDefault("map","noMap");
  	
  	if (navigator.geolocation) {
  	console.log("Geo is working");
  	navigator.geolocation.getCurrentPosition(function (position) {
  	  var lat = position.coords.latitude;
  	  var long = position.coords.longitude;
      Session.set("latitude", lat);
  		Session.set("longitude", long);
  	  //var city = Cities.find().fetch();
  	  var city = Cities.findOne({ geo : { $near : [-long, lat], $maxDistance : 50 } });
  	  console.log(city);
  	  console.log(Session.get("latitude"));
  	  console.log(Session.get("longitude"));
  	  Session.set("city", city.name);
  	});
  }
  
  Template.cities.name = function () {
  	var city = Session.get("city");
    return "The" + city + "Space";
  };
  
  Template.eventData.eventData = function () {
  	var fbEventData = Session.get("fbEventData");
<<<<<<< HEAD
    var fbEventUrl = "https://www.facebook.com/events/"
    console.log(fbEventUrl);
  	console.log(fbEventData);
  	
=======
>>>>>>> ae1eebf5f4529813111b39c4af101ecbf2999a27
	updateMap(fbEventData); 
	
	return fbEventData;
  }

	//Load GooglePlaces API with location
	load_places();
  // Load Facebook API with Events
  load_facebook();
  //Load GoogleMaps API with Maps
	load_maps();
}

// Meteor Server
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}