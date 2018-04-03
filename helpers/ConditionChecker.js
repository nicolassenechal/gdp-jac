'use strict'

class ConditionChecker {
  // TODO: To consider datatype comparision (number, string, double, long, ...)
  static _getOperands () {
    return {
      '==': function (value1, value2) { return value1 === value2 },
      '>=': function (value1, value2) { return value1 >= value2 }
    }
  }
  static match (operand, value1, value2) {
    // private variable
    if (!this._operand) {
      this._operands = this._getOperands()
    }

    if (!this._operands[operand]) {
      return false
    }

    return this._operands[operand](value1, value2)
  }
}
module.exports = ConditionChecker
