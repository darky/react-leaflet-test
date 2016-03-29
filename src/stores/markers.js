var app = require("../app.js"),
  Backbone = require("backbone"),
  isEqual = require("lodash/isEqual");

class Markers extends Backbone.Model {

  initialize () {
    this.listenTo(app.radio, "markers:add", this._add);
    this.listenTo(app.radio, "markers:before:drag", this._setWillDragPoint);
    this.listenTo(app.radio, "markers:drag", this._changePoint);
  }

  defaults () {
    return {
      pointWillDrag : null,
      points : []
    };
  }

  _add (coords) {
    let points = this.get("points");
    if (points.length === 2) {
      this.set("points", []);
    } else {
      this.set("points", points.concat([coords]));
    }
  }

  _changePoint (newCoords) {
    let oldCoords = this.get("pointWillDrag");
    this.set("points", this.get("points").map(coords => {
      if (isEqual(coords, oldCoords)) {
        return newCoords;
      } else {
        return coords;
      }
    }));
  }

  _setWillDragPoint (coords) {
    this.set("pointWillDrag", coords, {silent : true});
  }
}

module.exports = Markers;
