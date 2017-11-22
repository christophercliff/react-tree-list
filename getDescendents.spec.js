var { expect } = require('chai')
const { Set } = require('immutable')
const getDescendents = require('./getDescendents')

describe('getDescendents()', function() {
    it('should get the children', function() {
        expect(
            getDescendents({
                nodeId: 'a0',
                parentChildrenMap: this.parentChildrenMap,
            })
        ).to.equal(new Set(['a1', 'a2', 'b2', 'a3', 'b3', 'b1', 'c2', 'd2']))
    })

    it('should get the children to depth', function() {
        expect(
            getDescendents({
                depth: 1,
                nodeId: 'a0',
                parentChildrenMap: this.parentChildrenMap,
            })
        ).to.equal(new Set(['a1', 'b1']))
    })
})
