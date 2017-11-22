const { Map } = require('immutable')

module.exports = function getChildParentMap(parentChildrenMap) {
    return parentChildrenMap.reduce(
        (acc, children, parentId) =>
            children.reduce(
                (_acc, childId) => _acc.set(childId, parentId),
                !acc.has(parentId) ? acc.set(parentId) : acc
            ),
        new Map()
    )
}
