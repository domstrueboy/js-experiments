registerPaint('bubblePaint', class {
  static get inputProperties() {
    return ['--bubble-size', '--bubble-color'];
  }

  paint(ctx, geom, properties) {
    const circleSize = parseInt(properties.get('--bubble-size').toString());
    const circleColor = properties.get('--bubble-color').toString()

    const bodyWidth = geom.width;
    const bodyHeight = geom.height;

    const maxX = Math.floor(bodyWidth / circleSize);
    const maxY = Math.floor(bodyHeight / circleSize);

    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        ctx.fillStyle = circleColor;
        ctx.beginPath();
        ctx.arc(x * circleSize * 2 + circleSize, y * circleSize * 2 + circleSize, circleSize, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
});