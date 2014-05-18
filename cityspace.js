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
			
  Session.setDefault("city", "");
  Session.setDefault("latitude", 43.600035);
  Session.setDefault("longitude", 1.437836);
  if (navigator.geolocation) {
  	console.log("..");
  	navigator.geolocation.getCurrentPosition(function (position) {
  	  var lat = position.coords.latitude;
  	  var long = position.coords.longitude;
        Session.set("latitude", lat);
  		Session.set("longitude", long);
  	  console.log(position);
  	  console.log([-long, lat]);
  	  //var city = Cities.find().fetch();
  	  var city = Cities.findOne({ geo : { $near : [-long, lat], $maxDistance : 50 } });
  	  console.log(city);
  	  Session.set("city", city.name);
  	});
  }
  
  Template.cities.name = function () {
  	var city = Session.get("city");
    return "The" + city + "Space";
  };

  // Load Facebook API with Events
  	load_facebook();
	load_maps();
}

// Meteor Server
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}