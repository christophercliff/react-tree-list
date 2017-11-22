module.exports = function getSortedParentChildrenMap(parentChildrenMap, comparator) {
    return parentChildrenMap.map(children => children.toList().sort(comparator))
}
