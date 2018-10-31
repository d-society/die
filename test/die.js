import Die from '../dist/die'
import chai from 'chai'
import chaiThings from 'chai-things'
import MINIMUM_SIDE from '../lib/MINIMUM_SIDE'
import MINIMUM_SIDES from '../lib/MINIMUM_SIDES'
import range from 'fill-range'

chai.should()
chai.use(chaiThings)

var die
var dieRolls
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
      die.getSides().should.be.a('number')
    })
  })

  describe('constructing a die', () => {
    describe('without sides', function() {
      before(constructDieWithoutSides)

      it(`should have ${MINIMUM_SIDES} sides`, () => {
        die.getSides().should.equal(MINIMUM_SIDES)
      })
    })

    describe(`with less than ${MINIMUM_SIDES} sides`, () => {
      before(constructDieWithSidesLessThanMinimum)

      it(`should have ${MINIMUM_SIDES} sides`, () => {
        die.getSides().should.equal(MINIMUM_SIDES)
      })
    })

    describe(`with at least ${MINIMUM_SIDES} sides`, () => {
      before(constructDieWithSidesGreaterThanMinimum)

      it('should have specified sides', () => {
        die.getSides().should.equal(sides)
      })
    })
  })

  describe('rolling a die', () => {
    before(constructD100)
    before(rollDie)

    it('should generate a random number', () => {
      die.roll().should.be.a('number')
    })

    describe('randomly generated numbers', () => {
      it(`should all be at least ${MINIMUM_SIDE}`, () => {
        dieRolls.should.all.be.at.least(MINIMUM_SIDE)
      })

      it('should all be at most the number of sides', () => {
        dieRolls.should.all.be.at.most(die.getSides())
      })

      it(`should range from ${MINIMUM_SIDE} to number of sides`, () => {
        dieRolls.should.have.members(range(MINIMUM_SIDE, die.getSides()))
      })
    })
  })
})

//////////

function rollDie() {
  dieRolls = new Set()
  do {
    dieRolls.add(die.roll())
  } while (dieRolls.size !== die.sides)
  dieRolls = Array.from(dieRolls)
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
