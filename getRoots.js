const isEmpty = require('lodash/isEmpty')
const getChildParentMap = require('./getChildParentMap')

module.exports = function getRoots(parentChildrenMap) {
    return getChildParentMap(parentChildrenMap)
        .filter(parentId => isEmpty(parentId))
        .keySeq()
        .toSet()
}
