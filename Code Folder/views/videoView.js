window.VideoView = Backbone.View.extend({
	//Declaring attrubiter for the element of the view , so it has id and class 
	attributes: {
	 	id:'main',
		class: 'row'
	},
    initialize: function(){
        this.render();

    },
    render : function(){ 
    //passing the model to the view with sessionId and function so the html template can use 	
		$(this.el).html(this.template({videos:this.model,sessionID: $.cookie('id'),calculateRating:this.calculateRating}));
    	return this;
    },
    events :{
    	'click #video-title':'showvideo'
    },
    showvideo : function(event){
    	event.preventDefault();
    	var vid = event.target.getAttribute('href');
    	window.videoCoolleciton = new videoModelCollection();
    	videoCoolleciton.url = vid;
    	videoCoolleciton.fetch({success : function (data){
    	window.infoView = new InfoView({model:data.models[0].attributes.data})
   		//adding infoview element to the modal 
    		 $('#myModal').html(this.infoView.el);                
  		//inilizing modal
    		 $('#myModal').modal();
    	//calling the updateLayout for the infoView view so we can add the star rating element  
    		 window.infoView.updateLayout();
    	}
    })
    	   
    },
    updateLayout : function(){
    	//inilizing the rating function that cahnge the input to star rating 
    	$(".all-rating").rating();
    	//inilizing the mansonry function that arrange the home view element 
    	$(this.el).masonry({
	  		itemSelector: '.col-md-3',
		})
    },
    calculateRating:function(arr){
    	//calculateRating function to retrun the rating percentage out of 5 
    	var str = arr.length ,i, total=0 , maxTotlal = str*5;
    	for(i=0;i<str;i++){
        	total += arr[i];
    	}
    	var percentage = (100 * total)/maxTotlal;
    	return (5 * percentage) / 100;
}

    


});