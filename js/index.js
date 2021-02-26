$(function () {
  const COLOR = 'COLOR'
  const BACKGROUND_COLOR = 'BACKGROUND_COLOR'
  const $colorBtn = $('.js-color-btn')
  const $backgroundColorBtn = $('.js-background-color-btn')
  const $red = $("#red")
  const $green = $("#green")
  const $blue = $("#blue")
  const $swatch = $("#swatch")

  let currentTarget = COLOR
  $colorBtn.prop("disabled", true)

  function setColorSlidersValues(val) {
    $red.slider("value", val.r);
    $green.slider("value", val.g);
    $blue.slider("value", val.b);
  }

  function getRGB(str) {
    const match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      r: match[1],
      g: match[2],
      b: match[3]
    } : {};
  }

  function hexFromRGB(r, g, b) {
    var hex = [
      r.toString(16),
      g.toString(16),
      b.toString(16)
    ];
    $.each(hex, function (nr, val) {
      if (val.length === 1) {
        hex[nr] = "0" + val;
      }
    });
    return hex.join("").toUpperCase();
  }

  function refreshSwatch() {
    const red = $red.slider("value"),
      green = $green.slider("value"),
      blue = $blue.slider("value"),
      hex = hexFromRGB(red, green, blue);
    switch (currentTarget) {
      case COLOR:
        return $swatch.css("color", "#" + hex)
      case BACKGROUND_COLOR:
        return $swatch.css("background-color", "#" + hex)
      default:
        return
    }
  }

  $.each([$red, $green, $blue], (_, i) => {
    i.slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: refreshSwatch,
      change: refreshSwatch
    })
  })

  $red.slider("value", 0);
  $green.slider("value", 0);
  $blue.slider("value", 0);

  let swatchColorLastValue = getRGB($swatch.css('color'))
  let swatchBackgroundColorLastValue = getRGB($swatch.css('background-color'))

  function switchColorTarget() {
    currentTarget = currentTarget === COLOR ? BACKGROUND_COLOR : COLOR
    $backgroundColorBtn.prop("disabled", currentTarget === BACKGROUND_COLOR)
    $colorBtn.prop("disabled", currentTarget === COLOR)
  }

  $colorBtn.click(() => {
    switchColorTarget()
    swatchBackgroundColorLastValue = getRGB($swatch.css('background-color'))
    setColorSlidersValues(swatchColorLastValue)
  })

  $backgroundColorBtn.click(() => {
    switchColorTarget()
    swatchColorLastValue = getRGB($swatch.css('color'))
    setColorSlidersValues(swatchBackgroundColorLastValue)
  })
});