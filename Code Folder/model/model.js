//Backbone Model
window.videosModel = Backbone.Model; 
window.videosModelCollection = Backbone.Collection.extend({
    model: videosModel,
    url:'',
    
});

window.videoModel = Backbone.Model; 
window.videoModelCollection = Backbone.Collection.extend({
    model: videoModel,
    url:'',
    
});
