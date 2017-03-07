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
