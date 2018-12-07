define(['dojo/_base/declare', 'dojo/_base/lang', 'jimu/BaseWidget', 'esri/core/watchUtils'],
function(declare, lang, BaseWidget, watchUtils) {
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
        kpOmraade: "kpOmraade",
        rpOmraade: "rpOmraade",
        detaljRegulering: "detaljRegulering",
        omraadeRegulering: "omraadeRegulering",
        bebyggelsesPlan: "bebyggelsesPlan",
        eldreReguleringsPlan: "eldreReguleringsPlan",
        kommuneOgKommuneDelPlan: "kommuneOgKommuneDelPlan"
      };

      console.log(this.sceneView.map);

      this.parentLayers = {
        planRegisterStatus: {
          ref: this.sceneView.map.layers.items[0],
          name: this.layerNames.planRegisterStatus
        },
        planOmraade: {
          ref: this.sceneView.map.layers.items[1],
          name: this.layerNames.planOmraade
        },
        rpOmraade: {
          ref: this.sceneView.map.layers.items[2],
          name: this.layerNames.rpOmraade
        },
        kpOmraade: {
          ref: this.sceneView.map.layers.items[3],
          name: this.layerNames.kpOmraade
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
      this.toggleStatusPlanRegister.innerHTML = this.nls.root.statusPlanregister;
      this.toggleReguleringsplaner.innerHTML = this.nls.root.reguleringsplaner;
      this.toggleKommuneplaner.innerHTML = this.nls.root.kommuneplaner;

      this.changeCssClasses(this.toggleReguleringsplaner);

      this.initClickEvents();
      this.initZoomEvent();
      this.initResizeEvent();

      setTimeout(lang.hitch(this, function(){
        this.resizeButtons();
      }), 500);

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

    showAndHideKpOmraade: function(currentZoomLevel) {
      for (var layerKey in this.toggleLayers) {
        var layer = this.toggleLayers[layerKey];
        if (layer.name === this.layerNames.dekningKommuneplaner) {
          this.parentLayers.kpOmraade.ref.visible = (currentZoomLevel < 700000 && layer.active);
        }
      }
    },

    showAndHideRpOmraade: function(currentZoomLevel) {
      for (var layerKey in this.toggleLayers) {
        var layer = this.toggleLayers[layerKey];
        if (layer.name === this.layerNames.dekningReguleringsplaner) {
          this.parentLayers.rpOmraade.ref.visible = (currentZoomLevel < 15000 && layer.active);
        }
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
        that.switchToStatusPlanRegister();
      }
      this.toggleReguleringsplaner.onclick = function() {
        that.switchToReguleringsplaner();
      }
      this.toggleKommuneplaner.onclick = function() {
        that.switchToKommuneplaner();
      }
    },

    switchToStatusPlanRegister: function() {
      this.changeCssClasses(this.toggleStatusPlanRegister);
      this.toggleLayers.dekningKommuneplaner.active = false;
      this.toggleLayers.dekningReguleringsplaner.active = false;
      this.toggleLayers.statusPlanregister.active = true;
      this.showAndHidePlanRegisterStatusLayers(this.sceneView.scale);
      this.showAndHidePlanOmraadeLayers(this.sceneView.scale);
      this.showAndHideKpOmraade(this.sceneView.scale);
      this.showAndHideRpOmraade(this.sceneView.scale);
    },

    switchToReguleringsplaner: function() {
      this.changeCssClasses(this.toggleReguleringsplaner);
      this.toggleLayers.dekningKommuneplaner.active = false;
      this.toggleLayers.dekningReguleringsplaner.active = true;
      this.toggleLayers.statusPlanregister.active = false;
      this.showAndHidePlanRegisterStatusLayers(this.sceneView.scale);
      this.showAndHidePlanOmraadeLayers(this.sceneView.scale);
      this.showAndHideKpOmraade(this.sceneView.scale);
      this.showAndHideRpOmraade(this.sceneView.scale);
    },

    switchToKommuneplaner: function() {
      this.changeCssClasses(this.toggleKommuneplaner);
      this.toggleLayers.dekningKommuneplaner.active = true;
      this.toggleLayers.dekningReguleringsplaner.active = false;
      this.toggleLayers.statusPlanregister.active = false;
      this.showAndHidePlanRegisterStatusLayers(this.sceneView.scale);
      this.showAndHidePlanOmraadeLayers(this.sceneView.scale);
      this.showAndHideKpOmraade(this.sceneView.scale);
      this.showAndHideRpOmraade(this.sceneView.scale);
    },

    // Triggered every time the map scale is finished changing
    initZoomEvent: function() {
      var that = this;
      watchUtils.whenTrue(this.sceneView, "stationary", function() {
        that.showAndHidePlanRegisterStatusLayers(that.sceneView.scale);
        that.showAndHidePlanOmraadeLayers(that.sceneView.scale);
        that.showAndHideKpOmraade(that.sceneView.scale);
        that.showAndHideRpOmraade(that.sceneView.scale);
      });
    },

    initResizeEvent: function() {
      var that = this;
      window.addEventListener('resize', function(event){
        that.resizeButtons();
      });
    },

    resizeButtons: function() {
      var mapDOM = document.getElementsByClassName("esri-view-root")[0];
      var width = parseInt(mapDOM.style.width.slice(0, -2));
      var buttons = document.getElementsByClassName("toggleLayersButton");

      if (width < 700) {
        document.getElementsByClassName(this.baseClass)[0].style.fontSize = "small";
        this.toggleLayersContainer.style.display = "block";
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "block";
        } 
      }
      else if (width < 850) {
        document.getElementsByClassName(this.baseClass)[0].style.fontSize = "small";
        this.toggleLayersContainer.style.display = "table-row";
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "table-cell";
        } 
      }
      else if (width >= 850) {
        document.getElementsByClassName(this.baseClass)[0].style.fontSize = "large";
        this.toggleLayersContainer.style.display = "table-row";
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "table-cell";
        } 
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