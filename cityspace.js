// Meteor Client Side

Cities = new Meteor.Collection("Cities");
// global events
fbeventinfo = [5];

if (Meteor.isClient) {
  Session.setDefault("city", "");
  if (navigator.geolocation) {
  	console.log("..");
  	navigator.geolocation.getCurrentPosition(function (position) {
  	  var lat = position.coords.latitude;
  	  var long = position.coords.longitude;
  	  console.log(position);
  	  console.log([-long, lat]);
  	  //var city = Cities.find().fetch();
  	  var city = Cities.findOne({ geo : { $near : [-long, lat], $maxDistance : 50 } });
  	  console.log(city);
  	  Session.set("city", city.name);
  	});
  }
  
  Template.hello.greeting = function () {
  	var city = Session.get("city");
    return "The" + city + "Space";
  };

  // Load Facebook API with Events
  load_facebook();
}

// Meteor Server
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}