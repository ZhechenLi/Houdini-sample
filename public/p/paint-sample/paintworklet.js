class SamplePainter {
  static get inputProperties() {
    return ["--circle-color", "--border-width"];
  }
  paint(ctx, geom, properties) {
    console.log(ctx, geom, properties);

    // ctx.fillRect(0, 0, width, height);

    // const colors = properties.get('--circle-color');
    // console.log(colors, colors.toString(), colors.cssText)

    // ctx.fillStyle = colors.value;
    // ctx.fillStyle = colors.toString();

    // ctx.beginPath();
    // ctx.arc(geom.width / 2, geom.height / 2, Math.min(geom.width / 2, geom.height / 2), 0, 2 * Math.PI, false);
    // ctx.fill();

    // const borderWidth = parseInt(properties.get('--border-width'));
    // ctx.shadowColor = 'rgba(0,0,0,0.25)';
    // ctx.shadowBlur = borderWidth;

    // ctx.fillStyle = 'red';
    // ctx.fillRect(borderWidth,
    //     borderWidth,
    //     geom.width - 2 * borderWidth,
    //     geom.height - 2 * borderWidth);
  }
}
registerPaint("sample", SamplePainter);

// overdraw.js
registerPaint(
  "overdraw",
  class {
    static get inputProperties() {
      return ["--border-width"];
    }
    paint(ctx, geom, properties) {
      const borderWidth = parseInt(properties.get("--border-width"));
      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.shadowBlur = borderWidth;

      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(
        borderWidth,
        borderWidth,
        geom.width - 2 * borderWidth,
        geom.height - 2 * borderWidth
      );
    }
  }
);
