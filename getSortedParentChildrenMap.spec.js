var { expect } = require('chai')
const { Map, List } = require('immutable')
const getSortedParentChildrenMap = require('./getSortedParentChildrenMap')

describe('getSortedParentChildrenMap()', function() {
    it('should get the sorted parent-children map', function() {
        expect(
            getSortedParentChildrenMap(this.parentChildrenMap, (a, b) => a.localeCompare(b))
        ).to.equal(
            new Map({
                a0: new List(['a1', 'b1']),
                a1: new List(['a2', 'b2']),
                b1: new List(['c2', 'd2']),
                b2: new List(['a3', 'b3']),
            })
        )
    })
})
