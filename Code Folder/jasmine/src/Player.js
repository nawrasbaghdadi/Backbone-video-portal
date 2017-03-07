	 //Declaring new view LoginView
 window.LoginView= Backbone.View.extend({
 	//intilaize function for calling the reneder method
    initialize: function(){
        this.render();
    },
    render : function(){
    //this.tempalte() the html template of the view in this case it is LoginView.html
     $(this.el).html(this.template());
        return this;

    },
    events :{
    	'submit form' : 'loginAattempt'
    },
    loginAattempt : function(event){
    	event.preventDefault();
    	var username = $('#userName').val();
        var password = $('#userPassword').val();
        //j : json object contain the username and password 
        var j = {
            'username':username,
            'password':md5(password)
        };
      $.ajax({
            url: '/user/auth',
            type: 'POST',
            data: JSON.stringify(j),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
            	//checking if the user name and password are correct 
                if( result.status === 'error'){
               		$('#msg').html('<div class="alert alert-danger" >'+result.error+'</div>');
                }else{
                	$.cookie('id',result.sessionId)
                	$.cookie('name',result.username);
                	window.location = '/#videos';
                	$('#container').html(window.videoView.el);
                	
                }
            },
            error : function(result){
            	$('#msg').html('<div class="alert alert-danger" >Error , please contact system admin</div>');	
            },
         
             async: false
        });
        
    }


});
	 ///////////infoView/////////////
	 window.InfoView = VideoView.extend({
    initialize: function(){
        this.render();
    },
    render : function(){
     $(this.el).html(this.template({infos:this.model,calculateRating:this.calculateRating}));
        return this;

    },
    events :{
    	'click .close': 'stopvideo',
    	'rating.change #input-4-xs' : 'ratingChanges'
    },
    stopvideo : function(event){
    	event.preventDefault();
   	//to pause the palying video when cloasing the modal
    	 $('#myModal video').trigger('pause');
    },
    ratingChanges : function(event,value) {
    	event.preventDefault();
    	var j = {
            'videoId':this.model._id,
            'rating':value
        };
    	$.ajax({
            url: '/video/ratings?sessionId='+$.cookie('id'),
            type: 'POST',
            data: JSON.stringify(j),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                $('#msg').html('<em  class="flash"> Rating Accepted</em>')                     
            },
            error : function (result){
            	$('#msg').html('<em  class="flash"> Error in Rating , Try again</em>')                     	
            }
           
        });

    }
    


});

//////////NavView//////////
window.NavView = Backbone.View.extend({
	initialize: function(){
        this.render();
    },
    render : function(){ 	
     $(this.el).html(this.template({name:$.cookie('name')}));
        return this;
    },
    events:{
    	'click #logout': 'logout'

    },
    logout : function(){
    	$.ajax({
            url: '/user/logout?sessionId='+$.cookie('id'),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                 window.location = '/';
            }
        });
    }
})
/////////////App.js////////////
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





    
