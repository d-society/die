const minimumSides = 4
export default class Die {
  constructor(sides) {
    this.sides = sides
  }
  set sides(sides = minimumSides) {
    if (minimumSides > sides) {
      sides = minimumSides
    }
    this.sides = sides
  }
}
