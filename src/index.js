var app = require("./app.js"),
  Backbone = require("backbone"),
  dom = require("react-dom"),
  MarkersStore = require("./stores/markers.js"),
  React = require("react"),
  router;

app.stores.markers = new MarkersStore;

class Router extends Backbone.Router {
  routes () {
    return {
      "": () => require("./components/map.js")
    }
  }
}

router = new Router;
router.on("route", function () {
  let route = location.hash.replace("#", "");
  dom.render(
    React.createElement(this.routes[route]()),
    document.getElementById("content")
  )
});

Backbone.history.start();
