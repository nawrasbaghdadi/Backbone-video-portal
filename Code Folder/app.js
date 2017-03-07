(function(){
    "use strict";
    //Declaring Application Router 
 var AppRouter = Backbone.Router.extend({
    // Application Routes, on each rout there will be a function call 
    routes: {
        '':'login',
        'videos': 'videos'
    },
    login : function() {
    //Creating new instance of the VideoView and LoginView   so it can be used in the  home /'' route
        window.videoView = new VideoView();
        window.loginView = new LoginView();
        $('#container').html(loginView.el);        
    },
     videos : function() {
        window.infoView = new InfoView();
        window.navView = new NavView();
        $('header').html(window.navView.el);
        window.videoCoolleciton = new videosModelCollection();
        videoCoolleciton.url =  '/videos?sessionId='+$.cookie('id');
        videoCoolleciton.fetch({success : function (data){
            window.videoView = new VideoView({model:data.models[0].attributes.data , sessionID: $.cookie('id')});
            $('#container').html(window.videoView.el);
            window.videoView.updateLayout();
            }
        })
        
    }
});
    //utils is function for loading html templates 
utils.loadTemplate(['VideoView' , 'LoginView' , 'InfoView' , 'NavView'], function () {
    //creating new Instance of AppRouter
    window.app = new AppRouter();
    //Start the backbone Router
    Backbone.history.start();
})


})();





    