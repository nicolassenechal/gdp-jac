const assert = require('assert')
const ConditionChecker = require('../../helpers/ConditionChecker')

describe('Condition Checker', function () {
  context('#comparing 2 values', function () {
    it('Should return false if operand not exist', function (done) {
      assert.ok(!ConditionChecker.match('_+', 'Test1', 'Test2'))
      done()
    })
    it('Should return false if 2 string value does not match', function (done) {
      assert.ok(!ConditionChecker.match('==', 'Test1', 'Test2'))
      done()
    })
    it('Should return false if 2 string value does not match (Case senstive)', function (done) {
      assert.ok(!ConditionChecker.match('==', 'Test1', 'test1'))
      done()
    })
    it('Should return false if 2 number value does not match', function (done) {
      assert.ok(!ConditionChecker.match('==', 288.80, 289.8))
      done()
    })
    it('Should return false if 6 < 2', function (done) {
      assert.ok(!ConditionChecker.match('=>', 6, 2))
      done()
    })    
    it('Should return true if 2 string value same (case sensitive)', function (done) {
      assert.ok(ConditionChecker.match('==', 'Test1', 'Test1'))
      done()
    })
    it('Should return true if 2 number value same', function (done) {
      assert.ok(ConditionChecker.match('==', 288.80, 288.8))
      done()
    })
    it('Should return true if 6 >= 6', function (done) {
      assert.ok(ConditionChecker.match('>=', 6, 6))
      done()
    })
    it('Should return true if 6 >= 2', function (done) {
      assert.ok(ConditionChecker.match('>=', 6, 2))
      done()
    })   
  })
})
