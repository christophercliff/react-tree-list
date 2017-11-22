const { Map, Set } = require('immutable')

module.exports = function getParentChildrenMap(childParentMap) {
    return childParentMap.reduce((acc, parentId, nodeId) => {
        if (!parentId) return acc
        return acc.update(parentId, (children = new Set()) => children.add(nodeId))
    }, new Map())
}
