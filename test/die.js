import Die from '../dist/die'
import 'chai/register-should'

var die
var sides
const minimumSides = 4

describe('die', () => {
  before(() => {
    die = new Die()
  })

  it('should have sides', () => {
    die.should.have.property('sides')
  })

  describe('sides', () => {
    it('should be a number', () => {
      die.sides.should.be.a('number')
    })
  })
})

describe('constructing a die', () => {
  describe('without sides', function() {
    before(() => {
      die = new Die()
    })

    it('should have sides equal to minimum sides', () => {
      die.sides.should.equal(minimumSides)
    })
  })

  describe('with sides', () => {
    describe('less than the minimum', () => {
      before(() => {
        sides = minimumSides - 1
        die = new Die(sides)
      })

      it('should have sides equal to minimum sides', () => {
        die.sides.should.equal(minimumSides)
      })
    })

    describe('greater than or equal to minimum', () => {
      before(() => {
        sides = minimumSides + 1
        die = new Die(sides)
      })

      it('should have size equal specified sides', () => {
        die.sides.should.equal(sides)
      })
    })
  })
})
