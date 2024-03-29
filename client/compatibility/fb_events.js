function load_facebook() { 
// Facebook Login

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
	      		onLoad();
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
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function onLoad() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
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
console.log(fb_time);
console.log(fb_time_future);


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
                    distance(latitude, longitude,"' + Session.get("latitude") + '","' + Session.get("longitude") + '") < 3500 \
            ) and \
            start_time > "' + fb_time + '" and start_time < "' + fb_time_future + '" \
    )  and end_time < "2080-1-01" ' 
	  },
	//"/search?q=''&type=place&center="+Session.get("latitude")+","+Session.get("longitude")+"&distance=1000zzfield=name,id,location,start_time,venues&type=event",
    //"/search?q=''&type=place&center="+Session.get("latitude")+","+Session.get("longitude")+"&distance=1000&metadata=1",
// Events Parsed From Pull

		function(response) {
			if (response.error_code) 
			{
				console.log("Error with the fb response");
				console.log(response.error_msg);
				return;
			}
			
			fbEvents = []
			for (var i=0;i<response.length;i++)
			{
	     	fbeventinfo.push(('name is ' + response[i].name + ' and Venue Location is ' + 
        	response[i].venue.latitude + ', ' + response[i].venue.longitude
        	+ ' and startime is ' + response[i].start_time + " eventid is " + response[i].eid ));
	  		}
			fbeventinfo.push('length is ' + response.length);
			console.log("FB event data")
    		console.log(response);
    		Session.set("fbEventData",response)
		}
	)//}
}
}