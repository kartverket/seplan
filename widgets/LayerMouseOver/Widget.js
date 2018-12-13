define(['dojo/_base/declare', 'jimu/BaseWidget', 'dojo/dom-construct'],
function(declare, BaseWidget, domConstruct) {
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

      var tooltip = domConstruct.create("div", { "class": "tooltip", "innerHTML": "testtesttesttesttesttest" }, this.sceneView.container);
      tooltip.style.position = "absolute";

      this.sceneView.on("pointer-move", function(event) {
        // the hitTest() checks to see if any graphics in the view
        // intersect the given screen x, y coordinates
        that.sceneView.hitTest(event)
          .then(function(response) {
            if (response.results.length > 0 && response.results[0].graphic) {
              tooltip.innerHTML = response.results[0].graphic.attributes.plannavn;
              tooltip.style.display = "block";
              tooltip.style.left = (event.x + 10) + "px";
              tooltip.style.top = event.y + "px";
            }
            else {
              tooltip.style.display = "none";
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