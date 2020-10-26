class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add(vec1, vec2) {
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  static sub(vec1, vec2) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  static mult(vec, scaler) {
    return new Vector(vec.x * scaler, vec.y * scaler);
  }

  static div(vec, scaler) {
    return new Vector(vec.x / scaler, vec.y / scaler);
  }

  static dist(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  getTan() {
    return new Vector(-this.y, this.x);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }
}

module.exports = Vector
