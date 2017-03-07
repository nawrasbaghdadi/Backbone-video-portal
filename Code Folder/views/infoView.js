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