export default Die
import MINIMUM_SIDE from './MINIMUM_SIDE'
import MINIMUM_SIDES from './MINIMUM_SIDES'
import MersenneTwister from 'mersenne-twister'

const _sides = new WeakMap()
const pseudorandomNumberGenerator = new MersenneTwister()

class Die {
  constructor(sides) {
    this.setSides(sides)
  }
  get sides() {
    return _sides.get(this)
  }
  set sides(sides = MINIMUM_SIDES) {
    if (MINIMUM_SIDES > sides) {
      sides = MINIMUM_SIDES
    }
    _sides.set(this, sides)
  }
  getSides() {
    return this.sides
  }
  setSides(sides) {
    this.sides = sides
  }
  roll() {
    return MINIMUM_SIDE + Math.floor(pseudorandomNumberGenerator.random() * this.getSides())
  }
}
