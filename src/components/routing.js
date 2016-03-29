var L = require("leaflet"),
  ReactLeaflet = require("react-leaflet");

require("leaflet-routing-machine");
MapLayer = ReactLeaflet.MapLayer;

class Routing extends MapLayer {
  render () {
    return null;
  }

  componentWillMount () {
    super.componentWillMount();
    let {coords, map} = this.props;
    this.leafletElement = L.Routing.control({
      waypoints : [
        L.latLng(coords[0], coords[1]),
        L.latLng(coords[2], coords[3])
      ]
    }).addTo(map);
  }
}

module.exports = Routing;
