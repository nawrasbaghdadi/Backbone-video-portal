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


