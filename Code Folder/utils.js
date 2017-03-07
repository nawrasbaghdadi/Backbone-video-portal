window.utils = {
    loadTemplate: function(views,callback){

        deferred = [];
        $.each(views, function(index,view){
            if(window[view]){
                deferred.push($.get('templates/' +view+'.html',function(data){
                    window[view].prototype.template = _.template(data);
                }));
            }
            else {
                alert(view + ' not found !');
            }
        });
        $.when.apply(null,deferred).done(callback);
    }
}