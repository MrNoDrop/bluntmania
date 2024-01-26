export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  contains(x, y) {
    const width = x >= this.x && x <= this.x + this.width;
    const height = y >= this.y && y <= this.y + this.height;
    return width && height;
  }
  collidesRect(rectangle) {
    var dx = this.x + this.width / 2 - (rectangle.x + rectangle.width / 2);
    var dy = this.y + this.h / 2 - (rectangle.y + rectangle.height / 2);
    var width = (this.width + rectangle.width) / 2;
    var height = (this.height + rectangle.height) / 2;
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    var collision = "none";

    if (crossWidth > crossHeight) {
      collision = crossWidth > -crossHeight ? "bottom" : "left";
    } else {
      collision = crossWidth > -crossHeight ? "right" : "top";
    }

    return collision;
  }
}
