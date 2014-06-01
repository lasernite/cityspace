/*-- main geo_init function */

function load_geo(){ 

    /*-- Go ahead with the HTML5 geo location */
    
    if (navigator.geolocation) {
        
        /*-- if the user does not reply on time to the location prompt
        *    we timeout the HTML5 geolocation function and we try the
        *    MAXMIND IP geoLocation service */
        
        var location_timeout = setTimeout(function () {
            console.log('HTML5 geolocation Prompt Timeout, Attempting IP Based Location');
            
            geolocFail();
            
        }, 15000);

        /*-- we use watch position instead of getCurrentPosition cos it's
        *    not cached and works better on FF n mobile devices. */
        
        WatchID = navigator.geolocation.watchPosition(function (position) {
            clearTimeout(location_timeout);

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            
            console.log('HTML5 geolocation User Granted');
            
			Session.set("latitude", lat);
	  		Session.set("longitude", lng);
	  	  	//var city = Cities.find().fetch();
	  	  	/*var city = Cities.findOne({ geo : { $near : [-lng, lat], $maxDistance : 50 } });
	  	  	console.log(city);
	  	  	console.log(Session.get("latitude"));
	  	  	console.log(Session.get("longitude"));
	  	  	Session.set("city", city.name);*/       

        },
                                                      
        function (error) {
            clearTimeout(location_timeout);
            
            //console.log(error);
            
            /*-- PERMISSION_DENIED */
            if (error.code === 1) {
                console.log(error.message +', Attempting IP Based geolocation');
                geolocFail();
            }
            
            /*-- POSITION_UNAVAILABLE */
            else if (error.code === 2) {
                console.log(error.message +', Attempting IP Based geolocation');
                geolocFail();
            }
            
            /*-- TIMEOUT */
            else if (error.code === 3) {
                console.log(error.message +', Attempting IP Based geolocation');
                geolocFail();
            }
            
            /*-- UNKNOW ERROR? */
            else{
                console.log('HTML5 geolocation Unknown Error, Attempting IP Based geolocation');
                geolocFail();
            }
        },
        
        {maximumAge:100000, timeout:12000, enableHighAccuracy: true});
        
    }
    
    /*-- HTML5 geoLocation failed? this is the MAXMIND IP GeoLocation based fallback */
    else {
        console.log('HTML5 geolocation not available, Attempting IP Based geolocation');
        
        geolocFail();
    }
}

/*-- MAXMIND IP GeoLocation function */

function geolocFail() {

    var geoLocStatus = '';

    geoLocStatus = '<br/>MAXMIND GEOIP API PROVIDED DATA';
    

    $('.status').html(geoLocStatus);
   
    if (geoip_latitude() !="undefined" || geoip_latitude() !== ""){
    
        var x = geoip_latitude();
        var y = geoip_longitude();

    }
    else {
        geoLocationLoading('IP based geolocation Error');
        console.log('IP based geolocation Error');
    }
        
}

//setInterval(geo_init,20000);