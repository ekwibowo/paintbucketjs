# paintbucket.js

> Paintbucket tool for HTML5 canvas


## Getting Started

Download [JQuery](http://jquery.com/download/) (tested on version 2.1.4).

Download the [production version][min] or the [development version][max].

[min]: https://github.com/ekwibowo/paintbucketjs/releases/download/v0.1.0/paintbucket.min.js
[max]: https://raw.githubusercontent.com/ekwibowo/paintbucketjs/master/src/paintbucket.js

In your web page:

Add a `canvas` element.
```html
<canvas id="my-canvas"></canvas>
```

Add a `button` element to toggle the paintbucket tool on/off.
```html
<button id="activate-paintbucket-btn">Fill color</button>
```

Add script to initialize the plugin.
```html
<script src="jquery.js"></script>
<script src="paintbucket.min.js"></script>
<script>
  jQuery(function ($) {
    $('#activate-paintbucket-btn').paintbucket('#my-canvas');
  });
</script>
```

You can register a different fill color through `data-fill-color` attribute in the button, where you can hook up to a colorpicker such as the [Bootstrap Colorpicker](https://mjolnic.com/bootstrap-colorpicker/) plugin.

## License

[MIT](http://opensource.org/licenses/mit-license.html)
