define(['dojo/_base/declare', 'jimu/BaseWidget', 'esri/core/watchUtils'],
function(declare, BaseWidget, watchUtils) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API

    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-togglelayers',

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);

      this.layerNames = {
        dekningKommuneplaner: "dekningKommuneplaner",
        dekningReguleringsplaner: "dekningReguleringsplaner",
        statusPlanregister: "statusPlanregister",
        planRegisterStatus: "planRegisterStatus",
        planOmraade: "planOmraade",
        detaljRegulering: "detaljRegulering",
        omraadeRegulering: "omraadeRegulering",
        bebyggelsesPlan: "bebyggelsesPlan",
        eldreReguleringsPlan: "eldreReguleringsPlan",
        kommuneOgKommuneDelPlan: "kommuneOgKommuneDelPlan"
      };

      this.parentLayers = {
        planRegisterStatus: {
          ref: this.sceneView.map.layers.items[0],
          name: this.layerNames.planRegisterStatus
        },
        planOmraade: {
          ref: this.sceneView.map.layers.items[1],
          name: this.layerNames.planOmraade
        }
      }

      this.additionalLayers = {
        detaljRegulering: {
          ref: this.sceneView.map.layers.items[1].sublayers.items[7],
          name: this.layerNames.detaljRegulering
        },
        omraadeRegulering: {
          ref: this.sceneView.map.layers.items[1].sublayers.items[6],
          name: this.layerNames.omraadeRegulering
        },
        bebyggelsesPlan: {
          ref: this.sceneView.map.layers.items[1].sublayers.items[5],
          name: this.layerNames.bebyggelsesPlan
        },
        eldreReguleringsPlan: {
          ref: this.sceneView.map.layers.items[1].sublayers.items[4],
          name: this.layerNames.eldreReguleringsPlan
        },
        kommuneOgKommuneDelPlan: {
          ref: this.sceneView.map.layers.items[1].sublayers.items[3],
          name: this.layerNames.kommuneOgKommuneDelPlan
        }
      };

      this.toggleLayers = {
        dekningKommuneplaner: {
          ref: this.sceneView.map.layers.items[0].sublayers.items[2],
          name: this.layerNames.dekningKommuneplaner,
          active: false
        },
        dekningReguleringsplaner: {
          ref: this.sceneView.map.layers.items[0].sublayers.items[1],
          name: this.layerNames.dekningReguleringsplaner,
          active: true
        },
        statusPlanregister: {
          ref: this.sceneView.map.layers.items[0].sublayers.items[0],
          name: this.layerNames.statusPlanregister,
          active: false
        }
      };
      
      this.toggleStatusPlanRegister.innerHTML = "Status planregister";
      this.toggleReguleringsplaner.innerHTML = "Reguleringsplaner";
      this.toggleKommuneplaner.innerHTML = "Kommuneplaner";

      this.changeCssClasses(this.toggleReguleringsplaner);

      this.initClickEvents();
      this.initZoomEvent();

      console.log('startup');
    },

    showAndHidePlanRegisterStatusLayers: function(currentZoomLevel) {
      for (var layerKey in this.toggleLayers) {
        var layer = this.toggleLayers[layerKey];
        if (layer.name === this.layerNames.dekningKommuneplaner) {
          layer.ref.visible = (currentZoomLevel > 1200000 && layer.active);
        }
        else if (layer.name === this.layerNames.dekningReguleringsplaner) {
          layer.ref.visible = (currentZoomLevel > 200000 && layer.active);
        }
        else if (layer.name === this.layerNames.statusPlanregister) {
          layer.ref.visible = layer.active;
        }
      }
      noVisibleLayers = true;
      for (var layerKey in this.toggleLayers) {
        var layer = this.toggleLayers[layerKey];
        if (layer.ref.visible) {
          noVisibleLayers = false;
          break;
        }
      }
      if (noVisibleLayers) {
        this.parentLayers.planRegisterStatus.ref.visible = false;
      }
      else {
        this.parentLayers.planRegisterStatus.ref.visible = true;
      }
    },

    showAndHidePlanOmraadeLayers: function(currentZoomLevel) {
      for (var layerKey in this.toggleLayers) {
        var layer = this.toggleLayers[layerKey];
        if (layer.name === this.layerNames.dekningKommuneplaner) {
          this.additionalLayers.kommuneOgKommuneDelPlan.ref.visible = (currentZoomLevel > 700000 && currentZoomLevel < 1200000 && layer.active);
        }
        else if (layer.name === this.layerNames.dekningReguleringsplaner) {
          this.additionalLayers.detaljRegulering.ref.visible = (currentZoomLevel > 15000 && currentZoomLevel < 200000 && layer.active);
          this.additionalLayers.omraadeRegulering.ref.visible = (currentZoomLevel > 15000 && currentZoomLevel < 200000 && layer.active);
          this.additionalLayers.bebyggelsesPlan.ref.visible = (currentZoomLevel > 15000 && currentZoomLevel < 200000 && layer.active);
          this.additionalLayers.eldreReguleringsPlan.ref.visible = (currentZoomLevel > 15000 && currentZoomLevel < 200000 && layer.active);
        }
      }
      noVisibleLayers = true;
      for (var layerKey in this.additionalLayers) {
        var layer = this.additionalLayers[layerKey];
        if (layer.ref.visible){
          noVisibleLayers = false;
          break;
        }
      }
      if (noVisibleLayers) {
        this.parentLayers.planOmraade.ref.visible = false;
      }
      else {
        this.parentLayers.planOmraade.ref.visible = true;
      }
    },

    changeCssClasses: function(clickedButton) {
      this.toggleStatusPlanRegister.classList.add("inactive");
      this.toggleStatusPlanRegister.classList.remove("active");
      this.toggleReguleringsplaner.classList.add("inactive");
      this.toggleReguleringsplaner.classList.remove("active");
      this.toggleKommuneplaner.classList.add("inactive");
      this.toggleKommuneplaner.classList.remove("active");
      clickedButton.classList.add("active")
      clickedButton.classList.remove("inactive");
    },

    initClickEvents: function() {
      var that = this;
      this.toggleStatusPlanRegister.onclick = function() {
        that.changeCssClasses(that.toggleStatusPlanRegister);
        that.toggleLayers.dekningKommuneplaner.active = false;
        that.toggleLayers.dekningReguleringsplaner.active = false;
        that.toggleLayers.statusPlanregister.active = true;
        that.showAndHidePlanRegisterStatusLayers(that.sceneView.scale);
        that.showAndHidePlanOmraadeLayers(that.sceneView.scale);
      }
      this.toggleReguleringsplaner.onclick = function() {
        that.changeCssClasses(that.toggleReguleringsplaner);
        that.toggleLayers.dekningKommuneplaner.active = false;
        that.toggleLayers.dekningReguleringsplaner.active = true;
        that.toggleLayers.statusPlanregister.active = false;
        that.showAndHidePlanRegisterStatusLayers(that.sceneView.scale);
        that.showAndHidePlanOmraadeLayers(that.sceneView.scale);
      }
      this.toggleKommuneplaner.onclick = function() {
        that.changeCssClasses(that.toggleKommuneplaner);
        that.toggleLayers.dekningKommuneplaner.active = true;
        that.toggleLayers.dekningReguleringsplaner.active = false;
        that.toggleLayers.statusPlanregister.active = false;
        that.showAndHidePlanRegisterStatusLayers(that.sceneView.scale);
        that.showAndHidePlanOmraadeLayers(that.sceneView.scale);
      }
    },

    // Triggered every time the map scale is finished changing
    initZoomEvent: function() {
      var that = this;
      watchUtils.whenTrue(this.sceneView, "stationary", function() {
        that.showAndHidePlanRegisterStatusLayers(that.sceneView.scale);
        that.showAndHidePlanOmraadeLayers(that.sceneView.scale);
      });
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