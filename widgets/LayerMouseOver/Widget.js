define(['dojo/_base/declare', 'jimu/BaseWidget'],
function(declare, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API

    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-layerMouseOver',

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);

      var that = this;
      this.sceneView.on("click", function(event) {
        // the hitTest() checks to see if any graphics in the view
        // intersect the given screen x, y coordinates
        that.sceneView.hitTest(event)
          .then(function(response) {
            console.log(response)
            if (response.results.length > 0) {
              // response.results.graphic er alltid null
            }
        });      
      });
      console.log('startup');
    },

    onOpen: function(){
      console.log('onOpen');
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    }
  });
});