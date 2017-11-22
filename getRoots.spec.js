var { expect } = require('chai')
const { Set } = require('immutable')
const getRoots = require('./getRoots')

describe('getRoots()', function() {
    it('should get the roots', function() {
        expect(getRoots(this.parentChildrenMap)).to.equal(new Set(['a0']))
    })
})
