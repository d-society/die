export default Die
import MINIMUM_ROLL from '../lib/MINIMUM_ROLL'
import MINIMUM_SIDES from '../lib/MINIMUM_SIDES'
import MersenneTwister from 'mersenne-twister'

const _sides = new WeakMap()
const pseudorandomNumberGenerator = new MersenneTwister()

class Die {
  constructor(sides) {
    this.sides = sides
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
  roll() {
    return (
      MINIMUM_ROLL +
      Math.floor(pseudorandomNumberGenerator.random() * this.sides)
    )
  }
}
