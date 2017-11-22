var { expect } = require('chai')
const { List } = require('immutable')
const traverseDepthFirst = require('./traverseDepthFirst')

describe('traverseDepthFirst()', function() {
    it('should traverse depth first', function() {
        expect(
            new List().withMutations(mutable =>
                traverseDepthFirst(
                    {
                        nodeId: 'a0',
                        parentChildrenMap: this.parentChildrenMap,
                    },
                    nodeId => mutable.push(nodeId)
                )
            )
        ).to.equal(new List(['a0', 'b1', 'd2', 'c2', 'a1', 'b2', 'b3', 'a3', 'a2']))
    })

    it('should traverse depth first to depth', function() {
        expect(
            new List().withMutations(mutable =>
                traverseDepthFirst(
                    {
                        depth: 2,
                        nodeId: 'a0',
                        parentChildrenMap: this.parentChildrenMap,
                    },
                    nodeId => mutable.push(nodeId)
                )
            )
        ).to.equal(new List(['a0', 'b1', 'd2', 'c2', 'a1', 'b2', 'a2']))
    })
})
