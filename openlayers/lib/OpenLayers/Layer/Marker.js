/**
* @class
*/
OpenLayers.Layer.Marker = Class.create();
OpenLayers.Layer.Marker.prototype = 
  Object.extend( new OpenLayers.Layer(), {
    
    /** internal marker list
    * @type Array(OpenLayers.Marker) */
    markers: null,
    
    /**
    * @constructor
    *
    * @param {String} name
    */
    initialize: function(name) {
        OpenLayers.Layer.prototype.initialize.apply(this, arguments);
        this.markers = new Array();
    },
    
    /** 
    * @param {OpenLayers.Bounds} bounds
    * @param {Boolean} zoomChanged
    */
    moveTo: function(bounds, zoomChanged) {
        if (zoomChanged) {
            this.div.innerHTML = "";
            for(i=0; i < this.markers.length; i++) {
                this.drawMarker(this.markers[i]);
            }
        }
    },

    /**
    * @param {OpenLayers.Marker} marker
    */
    addMarker: function(marker) {
        this.markers.append(marker);
        if (this.map && this.map.getExtent()) {
            this.drawMarker(marker);
        }
    },

    /**
    * @private
    * 
    * @param {OpenLayers.Marker} marker
    */
    drawMarker: function(marker) {
        var resolution = this.map.getResolution();
        var extent = this.map.getExtent();
        var pixel = new OpenLayers.Pixel(
                       1/resolution * (marker.lonlat.lon - extent.left),
                       1/resolution * (extent.top - marker.lonlat.lat)
                       );
        var m = marker.generateMarker(pixel);
        this.div.appendChild(m);
    },
    
    /** @final @type String */
    CLASS_NAME: "OpenLayers.Layer.Marker"
});
