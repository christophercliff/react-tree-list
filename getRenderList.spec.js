var { expect } = require('chai')
const getRenderList = require('./getRenderList')
const getRoots = require('./getRoots')
const getSortedParentChildrenMap = require('./getSortedParentChildrenMap')

describe('getRenderList()', function() {
    it('should get the render list', function() {
        expect(
            getRenderList({
                roots: getRoots(this.parentChildrenMap),
                sortedParentChildrenMap: getSortedParentChildrenMap(this.parentChildrenMap),
            })
        ).to.matchSnapshot()
    })
})
