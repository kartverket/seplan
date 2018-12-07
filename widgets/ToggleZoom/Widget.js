define(['dojo/_base/declare', 'jimu/BaseWidget', 'esri/Graphic', 'esri/geometry/Extent'],
function(declare, BaseWidget, Graphic, Extent) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API

    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-togglezoom',

    postCreate: function() {
      this.inherited(arguments);

      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);

      this.sceneView.constraints.tilt.max = 0.5;

      this.changeCssClasses(this.toggleNormalZoom);
      
      this.initClickEvents();

      console.log('startup');
    },

    activateZoomBox: function() {
      var fillSymbol = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [255, 0, 0, 0.4],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 0, 0],
          width: 1
        }
      };

      var extentGraphic = null;
      var origin = null;
      this.dragEvent = this.sceneView.on('drag', e => {
        e.stopPropagation();
        if (e.action === 'start'){
          if (extentGraphic) this.sceneView.graphics.remove(extentGraphic)
          origin = this.sceneView.toMap(e);
        } else if (e.action === 'update'){
          if (extentGraphic) this.sceneView.graphics.remove(extentGraphic)
          var p = this.sceneView.toMap(e); 
          extentGraphic = new Graphic({
            geometry: new Extent({
              xmin: Math.min(p.x, origin.x),
              xmax: Math.max(p.x, origin.x),
              ymin: Math.min(p.y, origin.y),
              ymax: Math.max(p.y, origin.y),
              spatialReference: { wkid: 25833 }
            }),
            symbol: fillSymbol
          })
          
          this.sceneView.graphics.add(extentGraphic)
        }
      });

      this.dragEndEvent = this.sceneView.on('pointer-up', e => {
        if (extentGraphic) {
          this.sceneView.goTo(extentGraphic.geometry.extent);
          this.sceneView.graphics.remove(extentGraphic)
        }
      });
    },

    activateNormalZooming: function() {
      this.dragEvent.remove();
      this.dragEndEvent.remove();
    },

    changeCssClasses: function(clickedButton) {
      this.toggleNormalZoom.classList.add("zoomInactive");
      this.toggleNormalZoom.classList.remove("zoomActive");
      this.toggleZoomBox.classList.add("zoomInactive");
      this.toggleZoomBox.classList.remove("zoomActive");
      clickedButton.classList.add("zoomActive")
      clickedButton.classList.remove("zoomInactive");
    },

    initClickEvents: function() {
      var that = this;
      this.toggleNormalZoom.onclick = function() {
        that.changeCssClasses(that.toggleNormalZoom);
        that.activateNormalZooming();
      }
      this.toggleZoomBox.onclick = function() {
        that.changeCssClasses(that.toggleZoomBox);
        that.activateZoomBox();
      }
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