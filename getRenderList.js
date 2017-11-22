const { fromJS, List, OrderedMap, Set } = require('immutable')

module.exports = function getRenderList({
    disabledNodes = new Set(),
    hiddenNodes = new Set(),
    roots,
    selectedNodes = new Set(),
    sortedParentChildrenMap,
}) {
    return roots.reduce((acc, rootNodeId) => {
        return acc.concat(
            getRenderListR(
                {
                    disabledNodes,
                    hiddenNodes,
                    selectedNodes,
                    sortedParentChildrenMap,
                },
                new OrderedMap(),
                rootNodeId,
                0,
                new List([rootNodeId])
            ).filter((node, nodeId) => !hiddenNodes.has(nodeId))
        )
    }, new List())
}

function getRenderListR(
    {
        disabledNodes,
        hiddenNodes,
        parentId,
        parentIsLasts = new List(),
        selectedNodes,
        sortedParentChildrenMap,
    },
    acc,
    nodeId,
    i,
    list
) {
    const isLastChild = i === list.size - 1
    parentIsLasts = parentIsLasts.push(isLastChild)
    acc = acc.withMutations(mutable => {
        mutable.set(
            nodeId,
            fromJS({
                ancestors: parentId
                    ? mutable.getIn([parentId, 'ancestors']).unshift(parentId)
                    : new List(),
                descendents: new Set(),
                descenders: parentIsLasts.shift().map((parentIsLast, _i, _list) => {
                    return _i === _list.size - 1 ? true : !parentIsLast
                }),
                disabledDescendents: new Set(),
                hiddenDescendents: new Set(),
                isLastChild,
                nodeId,
                selectedDescendents: new Set(),
            })
        )
        if (parentId) {
            mutable.updateIn([parentId, 'descendents'], set => set.add(nodeId))
            if (disabledNodes.has(nodeId))
                mutable.updateIn([parentId, 'disabledDescendents'], set => set.add(nodeId))
            if (hiddenNodes.has(nodeId))
                mutable.updateIn([parentId, 'hiddenDescendents'], set => set.add(nodeId))
            if (selectedNodes.has(nodeId))
                mutable.updateIn([parentId, 'selectedDescendents'], set => set.add(nodeId))
        }
    })
    if (!sortedParentChildrenMap.get(nodeId)) return acc
    acc = sortedParentChildrenMap.get(nodeId).reduce(
        getRenderListR.bind(undefined, {
            disabledNodes,
            hiddenNodes,
            parentId: nodeId,
            parentIsLasts,
            selectedNodes,
            sortedParentChildrenMap,
        }),
        acc
    )
    return acc.withMutations(mutable => {
        if (parentId) {
            mutable.updateIn([parentId, 'descendents'], set =>
                set.union(acc.getIn([nodeId, 'descendents']))
            )
            mutable.updateIn([parentId, 'disabledDescendents'], set =>
                set.union(acc.getIn([nodeId, 'disabledDescendents']))
            )
            mutable.updateIn([parentId, 'hiddenDescendents'], set =>
                set.union(acc.getIn([nodeId, 'hiddenDescendents']))
            )
            mutable.updateIn([parentId, 'selectedDescendents'], set =>
                set.union(acc.getIn([nodeId, 'selectedDescendents']))
            )
        }
    })
}
