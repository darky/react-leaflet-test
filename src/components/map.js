var app = require("../app.js"),
  BaseComponent = require("./base.js"),
  Leaflet = require("leaflet"),
  React = require("react"),
  ReactLeaflet = require("react-leaflet"),
  Routing = require("./routing.js"),
  storeMixin = require("backbone-react-component"),
  uniqueId = require("lodash/uniqueId");

MapLayer = ReactLeaflet.Map;
Marker = ReactLeaflet.Marker;
TileLayer = ReactLeaflet.TileLayer;

class MapComponent extends BaseComponent {

  render () {
    let points = this.state.model.points;
    return (
      <MapLayer center={[55.75222, 37.61556]} zoom={12} onLeafletClick={this._addMarker}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {(points.length !== 2) ? points.map(coords => (
          <Marker key={uniqueId("marker")} position={coords} draggable={true}
            onLeafletDragend={this._dragMarker} onLeafletDragstart={this._beforeDragMarker}
          />
        )) : null}
        {(points.length === 2) ? <Routing coords={[points[0][0], points[0][1], points[1][0], points[1][1]]} /> : null}
      </MapLayer>
    );
  }

  componentWillMount () {
    storeMixin.onModel(this, app.stores.markers);
  }

  _addMarker (opts) {
    app.radio.trigger("markers:add", [opts.latlng.lat, opts.latlng.lng]);
  }

  _beforeDragMarker (opts) {
    let latlng = opts.target.getLatLng();
    app.radio.trigger("markers:before:drag", [latlng.lat, latlng.lng]);
  }

  _dragMarker (opts) {
    let latlng = opts.target.getLatLng();
    app.radio.trigger("markers:drag", [latlng.lat, latlng.lng]);
  }
}

module.exports = MapComponent;
