import Die from '../dist/die'
import 'chai/register-should'
import MINIMUM_ROLL from '../lib/MINIMUM_ROLL'
import MINIMUM_SIDES from '../lib/MINIMUM_SIDES'

var die
var sides

before(() => {
  die = new Die()
})

describe('a die', () => {
  it('should have sides', () => {
    die.should.have.property('sides')
  })

  describe('sides', () => {
    it('should be a number', () => {
      die.sides.should.be.a('Number')
    })
  })

  describe('constructing a die', () => {
    describe('without sides', function() {
      it('should have sides equal to minimum sides', () => {
        die.sides.should.equal(MINIMUM_SIDES)
      })
    })

    describe('with sides', () => {
      describe('less than the minimum', () => {
        before(() => {
          sides = MINIMUM_SIDES - 1
          die = new Die(sides)
        })

        it('should have sides equal to minimum sides', () => {
          die.sides.should.equal(MINIMUM_SIDES)
        })
      })

      describe('greater than or equal to minimum', () => {
        before(() => {
          sides = MINIMUM_SIDES + 1
          die = new Die(sides)
        })

        it('should have size equal specified sides', () => {
          die.sides.should.equal(sides)
        })
      })
    })
  })

  describe('rolling a die', () => {
    var dieRolls
    var possibleDieRolls
    const NUMBER_OF_DIE_ROLLS = 1000
    before(() => {
      sides = 20
      die = new Die(20)
      dieRolls = new Array()
      for (
        let currentDieRoll = 0;
        currentDieRoll < NUMBER_OF_DIE_ROLLS;
        currentDieRoll++
      ) {
        dieRolls.push(die.roll())
      }
      possibleDieRolls = Array.from(new Set(possibleDieRolls))
    })

    it('should return a number', () => {
      die.roll().should.be.a('Number')
    })

    it('should return a number greater than or equal to 1', () => {
      possibleDieRolls.every(possibleDieRoll => {
        return possibleDieRoll >= 1
      }).should.be.true
    })

    it('should return a number less than or equal to its sides', () => {
      possibleDieRolls.every(possibleDieRoll => {
        return possibleDieRoll <= sides
      }).should.be.true
    })

    it('should return a random number', () => {})
  })
})
