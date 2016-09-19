# jquery-transform

It's working with **inline styles only**.

## Motivation

To be able to read and update the values of the transformation functions.

``` html
  <div class="box" style="transform: rotate(35deg) scale(1,2)"></div>
```

jQuery returns a transformation matrix using the css method.
``` js
  $('.box').css('transform'); // "matrix(0.819152, 0.573576, -1.14715, 1.6383, 0, 0)"
```

$.transform method returns the actual function parameters.
``` js
  $('.box').transform('scale'); // ["1", "2"]
```
