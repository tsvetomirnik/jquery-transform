(function ($) {
    'use strict';

	function getStyles ($element) {
		var styles = [];
		 $element.attr('style').split(';').forEach(function (style) {
			if (!style) {
				return;
			}
            var styleParts = style.split(':'),
                propName = styleParts[0].trim(),
                propValue = styleParts[1].trim();
			styles[propName] = propValue;
        }, this);
		return styles;
	}
	
	function getTransforms ($element) {
        var transformString = getStyles($element).transform.replace('  ', ' ').replace(', ', ','),
			value = {};
		
		transformString.split(' ').forEach(function (transformValue) {
			var argsString = transformValue.match(/\((.*?)\)/)[0],
				args = argsString.replace('(', '').replace(')', '').trim().split(','),
				name = transformValue.replace(args, '').replace('(', '').replace(')', '').trim();
			value[name] = args;
        }, this);
		
		return value;
	}
	
	function getTransform ($element, functionName) {
		return getTransforms($element)[functionName];
	}
	
    function setTransform ($element, functionName, values) {
        var transform = getTransforms($element),
			transformString = '';
		
		// Update
		transform[functionName] = values;
		
		// Build transform string
		for (var transformFunc in transform) {
			transformString += transformFunc + '(' + transform[transformFunc].join(',')  + ') ';
		}
		
		// Replace transform in the styles
		$element.css('transform', transformString);
    }
	
	// Export
	$.fn.transform = function (functionName, values) {
		var $element = $(this);
		if (values && values.length) {
			return setTransform($element, functionName, values);
		} else {
			return getTransform($element, functionName);
		}
	};

} (jQuery));