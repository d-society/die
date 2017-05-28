export default Die

const _sides = new WeakMap()
const _minimumSides = 4

class Die {
  constructor(sides) {
    this.sides = sides
  }
  get sides() {
    return _sides.get(this)
  }
  set sides(sides = _minimumSides) {
    if (_minimumSides > sides) {
      sides = _minimumSides
    }
    _sides.set(this, sides)
  }
}
