var { expect } = require('chai')
const { Map } = require('immutable')
const getChildParentMap = require('./getChildParentMap')

describe('getChildParentMap()', function() {
    it('should get the child-parent map', function() {
        expect(getChildParentMap(this.parentChildrenMap)).to.equal(
            new Map({
                a0: undefined,
                a1: 'a0',
                b1: 'a0',
                a2: 'a1',
                b2: 'a1',
                c2: 'b1',
                d2: 'b1',
                a3: 'b2',
                b3: 'b2',
            })
        )
    })
})
