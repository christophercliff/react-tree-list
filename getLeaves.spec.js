var { expect } = require('chai')
const { Set } = require('immutable')
const getLeaves = require('./getLeaves')

describe('getLeaves()', function() {
    it('should get all leaves', function() {
        expect(
            getLeaves({
                parentChildrenMap: this.parentChildrenMap,
            })
        ).to.equal(new Set(['d2', 'c2', 'b3', 'a3', 'a2']))
    })

    it('should get leaves by nodeId', function() {
        expect(
            getLeaves({
                nodeId: 'b1',
                parentChildrenMap: this.parentChildrenMap,
            })
        ).to.equal(new Set(['d2', 'c2']))
    })
})
