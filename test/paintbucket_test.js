(function ($) {
  module('jQuery#paintbucket', {
    setup: function () {
      this.testToolActivator = $('#test-paintbucket-activator');
      this.testCanvasId = '#test-canvas';
      this.internals = this.testToolActivator.paintbucket(this.testCanvasId, {exposeInternals: true}).data('internals');
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.testToolActivator.paintbucket(this.testCanvasId), this.testToolActivator, 'should be chainable');
  });

  test('left boundary is the index of the first imageData pixel component in the row of the reference position', function () {
    var referencePosition = 5000;
    var canvasWidth = 500;
    var imageComponentWidth = canvasWidth * 4;
    strictEqual(this.internals.calcLeftBoundary(referencePosition, imageComponentWidth), 4000);
  });

  test('right boundary is the index of the first imageData pixel component in the row immediately below that of the reference position', function () {
    var referencePosition = 5000;
    var canvasWidth = 500;
    var imageComponentWidth = canvasWidth * 4;
    strictEqual(this.internals.calcRightBoundary(referencePosition, imageComponentWidth), 6000);
  });

  test('pixel with rgba(0,0,0,0) is zero transparent', function () {
    ok(this.internals.isZeroTransparent(0, 0, 0, 0));
  });

  test('get the index of r-component of imageData for pixel at (x,y) of image in canvas of width w', function () {
    var x = 3, y = 1, w = 6;
    strictEqual(this.internals.getFirstComponentIndexOfPixelAtXY(x, y, w), 9 * 4);
  });

  test('colorEquals method given non-transparent color of imageData at idx', function () {
    var imageData = {
      data: [1, 2, 3, 255]
    };
    var idx = 0;
    ok(this.internals.colorEquals(imageData, idx, {r: 1, g: 2, b: 3, a: 255}));
    notOk(this.internals.colorEquals(imageData, idx, {r: 1, g: 2, b: 6, a: 255}));
  });

  test('colorEquals method given zero-transparent color of imageData at idx', function () {
    var imageData = {
      data: [0, 0, 0, 0]
    };
    var idx = 0;
    notOk(this.internals.colorEquals(imageData, idx, {r: 1, g: 2, b: 3, a: 255}));
    notOk(this.internals.colorEquals(imageData, idx, {r: 0, g: 0, b: 0}));
    ok(this.internals.colorEquals(imageData, idx, {r: 0, g: 0, b: 0, a: 0}));
  });

  test('apply picked color to image', function () {
    // given
    var black = [0, 0, 0, 255], white = [255, 255, 255, 255], empty = [0, 0, 0, 0];
    var imageData = {
      width: 10,
      //              0      1      2      3      4      5      6      7      8      9
      data: flatten([ white, white, white, white, white, white, white, white, empty, empty,   // 0
                      white, black, black, white, white, white, white, white, empty, empty,   // 1
                      white, black, black, black, white, white, white, white, white, empty,   // 2
                      white, white, black, white, black, white, black, black, white, empty,   // 3
                      white, white, black, black, black, white, white, black, white, empty,   // 4
                      white, white, white, white, white, white, white, black, white, empty,   // 5
                      black, black, black, white, white, black, black, black, white, empty,   // 6
                      white, black, white, white, white, white, white, black, empty, empty,   // 7
                      white, white, white, white, white, white, white, black, empty, empty,   // 8
                      empty, empty, empty, empty, empty, empty, empty, empty, empty, empty ]) // 9
    };

    // when
    var green = [46, 141, 33, 255], greenHex = '#2e8d21';
    var pickedColor = greenHex;
    var colorAtClickedSpot = toRgba(white);
    var clickedIndex = this.internals.getFirstComponentIndexOfPixelAtXY(4, 7, 10);
    this.internals.applyColor(imageData, pickedColor, colorAtClickedSpot, clickedIndex);

    // then
    var expectedImageData = {
      width: 10,
      //              0      1      2      3      4      5      6      7      8      9
      data: flatten([ green, green, green, green, green, green, green, green, empty, empty,   // 0
                      green, black, black, green, green, green, green, green, empty, empty,   // 1
                      green, black, black, black, green, green, green, green, green, empty,   // 2
                      green, green, black, white, black, green, black, black, green, empty,   // 3
                      green, green, black, black, black, green, green, black, green, empty,   // 4
                      green, green, green, green, green, green, green, black, green, empty,   // 5
                      black, black, black, green, green, black, black, black, green, empty,   // 6
                      green, black, green, green, green, green, green, black, empty, empty,   // 7
                      green, green, green, green, green, green, green, black, empty, empty,   // 8
                      empty, empty, empty, empty, empty, empty, empty, empty, empty, empty ]) // 9
    };
    deepEqual(imageData.data, expectedImageData.data);
    strictEqual(imageData.width, expectedImageData.width);
  });

  // helper functions
  var toRgba = function(colorArray) {
    return {r: colorArray[0], g: colorArray[1], b: colorArray[2], a: colorArray[3]};
  };

  var flatten = function (arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
      var o = arr[i];
      if (isArray(o)) {
        for (var j = 0; j < o.length; j++) {
          res.push(o[j]);
        }
      } else {
        res.push(o);
      }
    }
    return res;
  };

  var isArray = function (obj) {
    return {}.toString.call(obj) === "[object Array]";
  };

}(jQuery));
