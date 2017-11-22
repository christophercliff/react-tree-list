const { Map, Set } = require('immutable')
const noop = require('lodash/noop')
const PropTypes = require('prop-types')
const React = require('react')
const ImmutablePropTypes = require('react-immutable-proptypes')
const { AutoSizer, CellMeasurer, CellMeasurerCache, List } = require('react-virtualized')
const getParentChildrenMap = require('./getParentChildrenMap')
const getRenderList = require('./getRenderList')
const getRoots = require('./getRoots')
const getSortedParentChildrenMap = require('./getSortedParentChildrenMap')

module.exports = function getTree(Node) {
    return class Tree extends React.PureComponent {
        static defaultProps = {
            disabledNodes: new Set(),
            hiddenNodes: new Set(),
            nodePropsMap: new Map(),
            onEvent: noop,
            selectedNodes: new Set(),
            unselectableNodes: new Set(),
        }
        static displayName = 'Tree'
        static propTypes = {
            childParentMap: ImmutablePropTypes.map.isRequired,
            comparator: PropTypes.func,
            disabledNodes: ImmutablePropTypes.set,
            hiddenNodes: ImmutablePropTypes.set,
            nodePropsMap: ImmutablePropTypes.map,
            onEvent: PropTypes.func,
            selectedNodes: ImmutablePropTypes.set,
            unselectableNodes: ImmutablePropTypes.set,
        }

        constructor(props) {
            super(props)
            const parentChildrenMap = getParentChildrenMap(props.childParentMap)
            this.state = {
                parentChildrenMap: parentChildrenMap,
                roots: getRoots(parentChildrenMap),
                sortedParentChildrenMap: getSortedParentChildrenMap(
                    parentChildrenMap,
                    props.comparator
                ),
            }
            this.cellMeasurerCache = new CellMeasurerCache({ fixedWidth: true })
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.childParentMap !== this.props.childParentMap) {
                const parentChildrenMap = getParentChildrenMap(nextProps.childParentMap)
                this.setState({
                    parentChildrenMap: parentChildrenMap,
                    roots: getRoots(parentChildrenMap),
                    sortedParentChildrenMap: getSortedParentChildrenMap(
                        parentChildrenMap,
                        nextProps.comparator
                    ),
                })
            }
        }

        onEvent = options => {
            this.props.onEvent({
                parentChildrenMap: this.state.parentChildrenMap,
                ...options,
            })
        }

        render() {
            const { disabledNodes, hiddenNodes, selectedNodes } = this.props
            const { roots, sortedParentChildrenMap } = this.state
            const renderList = getRenderList({
                disabledNodes,
                hiddenNodes,
                roots,
                selectedNodes,
                sortedParentChildrenMap,
            })
            if (renderList.size > 100)
                return (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                deferredMeasurementCache={this.cellMeasurerCache}
                                height={height}
                                rowCount={renderList.size}
                                rowHeight={this.cellMeasurerCache.rowHeight}
                                rowRenderer={this.renderVirtualRow.bind(this, { renderList })}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                )
            return (
                <div>
                    {renderList.map(this.renderStaticRow.bind(this, { renderList })).valueSeq()}
                </div>
            )
        }

        renderVirtualRow({ renderList }, { index, key, parent, style }) {
            return (
                <CellMeasurer
                    cache={this.cellMeasurerCache}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                >
                    {this.renderRow({ renderList }, { index, style })}
                </CellMeasurer>
            )
        }

        renderStaticRow({ renderList }, renderNode, index) {
            return this.renderRow({ renderList }, { index })
        }

        renderRow({ renderList }, { index, style }) {
            const renderNode = renderList.get(index)
            const nodeId = renderNode.get('nodeId')
            const { disabledNodes, selectedNodes, unselectableNodes } = this.props
            return (
                <Node
                    {...this.props.nodePropsMap.get(nodeId, new Map()).toObject()}
                    ancestors={renderNode.get('ancestors')}
                    descendents={renderNode.get('descendents')}
                    descenders={renderNode.get('descenders')}
                    disabledDescendents={renderNode.get('disabledDescendents')}
                    hiddenDescendents={renderNode.get('hiddenDescendents')}
                    isDisabled={disabledNodes.has(nodeId)}
                    isLastChild={renderNode.get('isLastChild')}
                    isSelected={selectedNodes.has(nodeId)}
                    isUnselectable={unselectableNodes.has(nodeId)}
                    key={nodeId}
                    nodeId={nodeId}
                    onEvent={this.onEvent}
                    selectedDescendents={renderNode.get('selectedDescendents')}
                    style={style}
                />
            )
        }
    }
}
