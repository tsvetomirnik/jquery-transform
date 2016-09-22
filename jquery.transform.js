(function ($) {
  'use strict';

  function getStyles ($element) {
    var styles = {};

    $element.attr('style').split(';').forEach(function (style) {
      if (style) {
         var styleParts = style.split(':'),
          propName = styleParts[0].trim(),
          propValue = styleParts[1].trim();
        styles[propName] = propValue;
      }
    }, this);

    return styles;
  }

  function getTransform ($element) {
    var elementStyles = getStyles($element),
      value = {},
      transformFunctions = [];

    if (!elementStyles.transform) {
      return {};
    }

    transformFunctions = (elementStyles.transform.replace(/\s/g, '').replace(/\)/g, ') ').trim()).split(' '),

    transformFunctions.forEach(function (functionString) {
      var functionParts = functionString.match(/^\s*(\w+)\s*\((.*)\)/),
        name = functionParts[1],
        args = functionParts[2].split(',');
      value[name] = args;
    }, this);

    return value;
  }

  function getTransformFunction ($element, functionName) {
    return getTransform($element)[functionName];
  }

  function setTransformFunction ($element, functionName, value) {
    var transform = getTransform($element),
      transformString = '',
      transformFunc;

    if (!Array.isArray(value)) {
      value = [value];
    }

    if (value) {
      // Add or Update
      transform[functionName] = value;
    } else {
      // Delete
      delete transform[functionName];
    }

    // Build transform string
    for (transformFunc in transform) {
      transformString += transformFunc + '(' + transform[transformFunc].join(',')  + ') ';
    }

    // Replace transform in the styles
    $element.css('transform', transformString);
  }

  // Export
  $.fn.transform = function (functionName, value){
    var $element = $(this);
    if (arguments.length === 1) {
      return getTransformFunction($element, functionName);
    } else {
      return setTransformFunction($element, functionName, value);
    }
  };

}(jQuery));
