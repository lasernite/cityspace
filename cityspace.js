if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to cityspace.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  
    window.fbAsyncInit = function() {
      FB.init({
        appId      : "552958418145577",
        status     : true,
        xfbml      : true
      });
    };
    

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/all.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}