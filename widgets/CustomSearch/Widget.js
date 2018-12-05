define(['dojo/_base/declare', 'jimu/BaseWidget', 'esri/widgets/Search', 'esri/layers/FeatureLayer'],
function(declare, BaseWidget, Search, FeatureLayer) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API

    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-customSearch',

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);
      var that = this;
      var searchWidget = new Search({
        view: that.sceneView,
        allPlaceholder: that.nls.root.searchPlaceholder,
        sources: [
        {
          featureLayer: new FeatureLayer({
            url: "https://services.arcgis.com/nztDqZeWZcC0Y8dx/arcgis/rest/services/Kommuneplaner/FeatureServer/0",
            outFields: ["*"]
          }),
          searchFields: ["planidenti"],
          displayField: "planidenti",
          exactMatch: false,
          outFields: ["*"],
          name: "Kommuneplaner",
          maxSuggestions: 6,
          suggestionsEnabled: true,
        },
        {
          featureLayer: new FeatureLayer({
            url: "https://services.arcgis.com/nztDqZeWZcC0Y8dx/arcgis/rest/services/Reguleringsplaner/FeatureServer/0",
            outFields: ["*"]
          }),
          searchFields: ["planidenti"],
          displayField: "planidenti",
          exactMatch: false,
          outFields: ["*"],
          name: "Reguleringsplaner",
          maxSuggestions: 6,
          suggestionsEnabled: true,
        }],
        popupEnabled: false
      });

      this.sceneView.ui.add(searchWidget, {

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