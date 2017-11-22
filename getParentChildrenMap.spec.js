var { expect } = require('chai')
const { Map, Set } = require('immutable')
const getParentChildrenMap = require('./getParentChildrenMap')

describe('getParentChildrenMap()', function() {
    it('should get the parent-children map', function() {
        expect(getParentChildrenMap(this.childParentMap)).to.equal(
            new Map({
                a0: new Set(['b1', 'a1']),
                a1: new Set(['b2', 'a2']),
                b1: new Set(['d2', 'c2']),
                b2: new Set(['b3', 'a3']),
            })
        )
    })
})
