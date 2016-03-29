var React = require("react"),
  storeMixin = require("backbone-react-component");

class Base extends React.Component {
  componentWillUnmount () {
    storeMixin.off(this);
  }
}

module.exports = Base;
