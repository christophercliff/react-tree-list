const noop = require('lodash/noop')

module.exports = function traverseDepthFirst(
    { depth = Number.MAX_SAFE_INTEGER, nodeId, parentChildrenMap },
    iteratee = noop
) {
    return traverseDepthFirstR(
        {
            depth,
            iteratee,
            parentChildrenMap,
        },
        nodeId
    )
}

function traverseDepthFirstR({ depth, iteratee, parentChildrenMap }, nodeId) {
    iteratee(nodeId)
    if (depth === 0 || !parentChildrenMap.has(nodeId)) return
    return parentChildrenMap.get(nodeId).forEach(
        traverseDepthFirstR.bind(undefined, {
            depth: depth - 1,
            iteratee,
            parentChildrenMap,
        })
    )
}
