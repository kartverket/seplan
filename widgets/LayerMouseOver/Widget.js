define(['dojo/_base/declare', 'jimu/BaseWidget', 'dojo/dom-construct', 'esri/layers/GraphicsLayer', 'esri/geometry/Polygon',
        'esri/symbols/SimpleFillSymbol', 'esri/Graphic'],
function(declare, BaseWidget, domConstruct, GraphicsLayer, Polygon, SimpleFillSymbol, Graphic) {
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

      this.currentPlanName = "";

      var tooltip = domConstruct.create("div", { "class": "tooltip" }, this.sceneView.container);
      tooltip.style.position = "absolute";

      var highLightGraphicsLayer = new GraphicsLayer();
      this.sceneView.map.add(highLightGraphicsLayer);

      var highlightSymbol = new SimpleFillSymbol({
        color: [160, 216, 239, 0.4],
        style: 'solid',
        outline: {
          color: [0, 255, 255],
          width: 6
        }
      });

      this.sceneView.on("pointer-move", function(event) {
        // the hitTest() checks to see if any graphics in the view
        // intersect the given screen x, y coordinates
        that.sceneView.hitTest(event)
          .then(function(response) {
            if (response.results.length > 0 && response.results[0].graphic) {
              if (that.currentPlanName != response.results[0].graphic.attributes.plannavn) {
                highLightGraphicsLayer.removeAll();
                that.currentPlanName = response.results[0].graphic.attributes.plannavn;
              }
              tooltip.innerHTML = response.results[0].graphic.attributes.plannavn;
              tooltip.style.display = "block";
              tooltip.style.left = (event.x + 10) + "px";
              tooltip.style.top = event.y + "px";
              document.body.style.cursor = 'pointer';
              if (highLightGraphicsLayer.graphics.items.length == 0) {
                var polygon = new Polygon({
                  rings: response.results[0].graphic.geometry.rings
                });

                var polygonGraphic = new Graphic({
                  geometry: polygon,
                  symbol: highlightSymbol
                });

                highLightGraphicsLayer.add(polygonGraphic);
              }
            }
            else {
              tooltip.style.display = "none";
              document.body.style.cursor = 'auto';
              highLightGraphicsLayer.removeAll();
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