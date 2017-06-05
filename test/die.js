import Die from '../dist/die'
import 'chai/register-should'
import MINIMUM_ROLL from '../lib/MINIMUM_ROLL'
import MINIMUM_SIDES from '../lib/MINIMUM_SIDES'

var die
var possibleRolls
var sides

describe('a die', () => {
  before(constructDieWithoutSides)

  it('should have sides', () => {
    die.should.have.property('sides')
  })

  it('should roll', () => {
    die.should.have.property('roll')
  })

  describe('sides', () => {
    it('should be a number', () => {
      die.sides.should.be.a('Number')
    })
  })

  describe('constructing a die', () => {
    describe('without sides', function() {
      before(constructDieWithoutSides)

      it('should have sides equal to minimum sides', () => {
        die.sides.should.equal(MINIMUM_SIDES)
      })
    })

    describe('with sides', () => {
      describe('less than the minimum', () => {
        before(constructDieWithSidesLessThanMinimum)

        it('should have sides equal to minimum sides', () => {
          die.sides.should.equal(MINIMUM_SIDES)
        })
      })

      describe('greater than or equal to minimum', () => {
        before(constructDieWithSidesGreaterThanMinimum)

        it('should have size equal specified sides', () => {
          die.sides.should.equal(sides)
        })
      })
    })
  })

  describe('rolling a die', () => {
    it('should produce a number', () => {
      die.roll().should.be.a('Number')
    })

    describe('every possible roll', () => {
      before(constructD100)
      before(rollDie)

      it(`should be at least ${MINIMUM_ROLL}`, () => {
        possibleRolls.every(isAtLeastMinimumRoll)
      })

      it('should be at most number of sides', () => {
        possibleRolls.every(isAtMostNumberOfSides)
      })
      it('should exist for a side', () => {
        for (let currentSide = 1; currentSide < die.sides; currentSide++) {
          possibleRolls.includes(currentSide).should.be.true
        }
      })
    })
  })
})

//////////

function isAtLeastMinimumRoll(value) {
  return value.should.be.at.least(MINIMUM_ROLL)
}

function isAtMostNumberOfSides(value) {
  return value.should.be.at.most(die.sides)
}

function rollDie() {
  possibleRolls = new Set()
  do {
    possibleRolls.add(die.roll())
  } while (possibleRolls.size !== die.sides)
  possibleRolls = Array.from(possibleRolls)
}

function constructDie(numberOfSides) {
  setSides(numberOfSides)
  setDie(new Die(sides))
}

function constructDieWithoutSides() {
  constructDie()
}

function constructDieWithSidesLessThanMinimum() {
  constructDie(MINIMUM_SIDES - 1)
}

function constructDieWithSidesGreaterThanMinimum() {
  constructDie(MINIMUM_SIDES + 1)
}

function constructD100() {
  constructDie(100)
}

function setDie(value) {
  die = value
}

function setSides(value) {
  sides = value
}
