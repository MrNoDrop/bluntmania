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
    if (
      this.x + this.width > rectangle.x && // this. right edge past rectangle. left
      this.x < rectangle.x + rectangle.width && // this. left edge past rectangle. right
      this.y + this.height > rectangle.y && // this. top edge past rectangle. bottom
      this.y < rectangle.y + rectangle.height // this. bottom edge past r2 top
    ) {
      return true;
    }
    return false;
  }
}
