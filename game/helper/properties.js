/**
 * Create DOM markup of widgets to allow to control properties / settings of the game
 */
(function() {
  'use strict';

  var $ = require('jquery');

  var Configurator = function(parentSelector) {
    this.parentSelector = parentSelector || 'body';
    this.rootElement = $('<div>').addClass('propConf');
    $(this.parentSelector).append(this.rootElement);

    this.debugChange = true;
    this.tabstart = 100;
  };

  // var typePrep = {
  //   'float': function(el) {
  //       return parseFloat(el.val()) || 0;
  //   },
  //   'string': function(el) {
  //     return el.val();
  //   }
  // }

  /**
   * Create a property field ( widget ) that will update via handler(val) {}
   */
  Configurator.prototype.addProperty = function(name, handler, initial, step) {
    initial = initial || 0;
    step = step || 10;
    var self = this,
      tabIndex = this.tabstart++,
      el = $('<input>')
        .attr('tabIndex', tabIndex)
        .attr('name', name)
        .attr('type', 'text')
        .attr('size', 3)
        .val(initial),
      getVal = function() {
        return parseFloat(el.val()) || 0;
      },
      updateVal = function() {
        if (self.debugChange) {
          console.log('Set ' + name + ' to ' + getVal());
        }
        handler(getVal());
      },
      b1 = $('<button>')
        .text('-')
        .click(function() { el.val(getVal() - step); updateVal(); }),
      b2 = $('<button>')
        .text('+')
        .click(function() { el.val(getVal() + step); updateVal(); }),
      container = $('<div>')
        .append($('<label>').text(name))
        .append(b1)
        .append(el)
        .append(b2);

    el.change(updateVal);

    this.rootElement.append(container);
  };

  /**
   * Create property fields for an object / dictionary of values
   */
  Configurator.prototype.createFromPropset = function (propset) {
    var self = this;
    for (var k in propset) {
      if (propset.hasOwnProperty(k)) {
        (function(propset, propname) {
          self.addProperty(propname,
            function(v) { propset[propname] = v; },
            propset[propname],
            propset[propname] / 10   // set stepsize to be a 10th of initial value
          );
        }(propset, k));

      }
    }
  };

  module.exports = {
    Configurator: Configurator
  };
}());
