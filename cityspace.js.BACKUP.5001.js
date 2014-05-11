// Meteor Client Side

// global events
fbeventinfo = [5];

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "TheBostonSpace";
  };

<<<<<<< HEAD


// Facebook Login
=======
  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  
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
/********Facebook Login**********/
>>>>>>> fc7f706bd89e5ad095039d94c9376c3b693637b2

window.fbAsyncInit = function() {
  FB.init({
    appId      : 552958418145577,
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login();
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = $('script');
   console.log(ref);
   if ($(id)) {return;}
   js = $('<script>'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases.
  	
		function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
    });


// Set up variables for current time/future time for FQL, Local Event Rendering
var time = new Date();
var fb_time = String(time.getYear() + 1900 + '-' + (time.getMonth() + 1) + '-' + time.getDate());

// Consider length of month differences, remember 0 is January, 11 is December, etc.
if (jQuery.inArray(time.getMonth(), [1,2,4,6,9,11]) >= 0 && time.getDate() > 27) {
  var fb_time_future = String(time.getYear() + 1900 + '-' + (time.getMonth() + 2) + '-' + (time.getDate() - 3));
}
else {
  var fb_time_future = String(time.getYear() + 1900 + '-' + (time.getMonth() + 2) + '-' + time.getDate());
}
console.log(fb_time)
console.log(fb_time_future)


// Pull the Local Events (Odd Specific Location/Distance -> Events discrepancy—need multiple calls and add to db)
FB.api(
	  {
	    method: 'fql.query',
      query: 'select eid, \
    name, \
    description, \
    location, \
    all_members_count, \
    attending_count, \
    unsure_count, \
    not_replied_count, \
    declined_count, \
    start_time, \
    end_time,\
    venue \
from \
    event \
where     \
    eid in \
    ( \
        select \
            eid, \
            start_time \
        from \
            event_member \
        where \
            uid in \
            ( \
                select \
                    page_id \
                from \
                    place \
                where \
                    distance(latitude, longitude, "42.344656", "-71.047387") < 1600 \
            ) and \
            start_time > "' + fb_time + '" and start_time < "' + fb_time_future + '" \
    )  and end_time < "2080-1-01" ' 
	  },

// Events Parsed From Pull

	function(response) {
		for (var i=0;i<response.length;i++)
		{
	     fbeventinfo.push(('name is ' + response[i].name + ' and Venue Location is ' + 
        response[i].venue.latitude + ', ' + response[i].venue.longitude
        + ' and startime is ' + response[i].start_time + " eventid is " + response[i].eid ));
	  	}
		fbeventinfo.push('length is ' + response.length);
    console.log(fbeventinfo)
	  }
<<<<<<< HEAD

	);

  }
=======
	)
	}
	/**************Google Maps SDK****************/
	/*function initialize() 
	{
	  var mapOptions = {
	    zoom: 4,
	    center: new google.maps.LatLng(-25.363882, 131.044922)
	  };
	
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
	google.maps.event.addDomListener(window, 'load', initialize);*/
	console.log("asdfadfafinal");
}
>>>>>>> fc7f706bd89e5ad095039d94c9376c3b693637b2

  Template.fbevents.allevents = Deps.autorun(function () {
      Meteor.subscribe("messages", Session.get(fbeventinfo));
});

// Meteor Server
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}