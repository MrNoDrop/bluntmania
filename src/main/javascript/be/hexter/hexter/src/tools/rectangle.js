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
}
