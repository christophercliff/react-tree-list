const { Set } = require('immutable')
const traverseDepthFirst = require('./traverseDepthFirst')

module.exports = function getDescendents({ depth, nodeId, parentChildrenMap }) {
    return new Set()
        .withMutations(mutable =>
            traverseDepthFirst(
                {
                    depth,
                    nodeId,
                    parentChildrenMap,
                },
                nodeId => mutable.add(nodeId)
            )
        )
        .delete(nodeId)
}
