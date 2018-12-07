define(['dojo/_base/declare', 'jimu/BaseWidget', 'esri/widgets/Search', 'esri/layers/FeatureLayer', 'esri/tasks/Locator', 'jimu/WidgetManager'],
function(declare, BaseWidget, Search, FeatureLayer, Locator, WidgetManager) {
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
          locator: new Locator({
            url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
            outFields: ["*"]
          }),
          singleLineFieldName: "SingleLine",
          exactMatch: false,
          outFields: ["*"],
          name: that.nls.root.addresses,
          maxSuggestions: 6,
          suggestionsEnabled: true,
        },
        {
          featureLayer: new FeatureLayer({
            url: "https://services.arcgis.com/nztDqZeWZcC0Y8dx/arcgis/rest/services/Kommuneplaner/FeatureServer/0",
            outFields: ["*"],
            popupTemplate: that.config.popupTemplate.kommuneplaner
          }),
          searchFields: ["planidenti"],
          displayField: "planidenti",
          exactMatch: false,
          outFields: ["*"],
          name: that.nls.root.kommuneplaner,
          maxSuggestions: 6,
          suggestionsEnabled: true,
        },
        {
          featureLayer: new FeatureLayer({
            url: "https://services.arcgis.com/nztDqZeWZcC0Y8dx/arcgis/rest/services/Reguleringsplaner/FeatureServer/0",
            outFields: ["*"],
            popupTemplate: that.config.popupTemplate.reguleringsplaner
          }),
          searchFields: ["planidenti"],
          displayField: "planidenti",
          exactMatch: false,
          outFields: ["*"],
          name: that.nls.root.reguleringsplaner,
          maxSuggestions: 6,
          suggestionsEnabled: true,
        }],
        popupEnabled: true
      });

      searchWidget.on("search-complete", function(event) {
        var widgetManager = WidgetManager.getInstance();
        var widget = widgetManager.getWidgetsByName("ToggleLayers")[0];
        if (event.results[0].source.name === "Kommuneplaner" || event.results[0].source.name === "Municipal master plan") {
          widget.switchToKommuneplaner();
        }
        else if (event.results[0].source.name === "Reguleringsplaner" || event.results[0].source.name === "Zoning plans") {
          widget.switchToReguleringsplaner();
        }
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