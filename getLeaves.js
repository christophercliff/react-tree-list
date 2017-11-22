const { Set } = require('immutable')
const isEmpty = require('lodash/isEmpty')
const getRoots = require('./getRoots')

module.exports = function getLeaves({ parentChildrenMap, nodeId }) {
    const rootNodeIds = !isEmpty(nodeId) ? new Set([nodeId]) : getRoots(parentChildrenMap)
    return rootNodeIds.reduce(
        (acc, rootNodeId) => acc.concat(getLeavesR({ parentChildrenMap }, acc, rootNodeId)),
        new Set()
    )
}

function getLeavesR({ parentChildrenMap }, acc, nodeId) {
    if (!parentChildrenMap.has(nodeId)) return acc.add(nodeId)
    return parentChildrenMap
        .get(nodeId)
        .reduce(getLeavesR.bind(undefined, { parentChildrenMap }), acc)
}
