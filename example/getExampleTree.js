const { Set } = require('immutable')
const get = require('lodash/get')
const noop = require('lodash/noop')
const PropTypes = require('prop-types')
const React = require('react')
const ImmutablePropTypes = require('react-immutable-proptypes')
const getDescendents = require('../getDescendents')
const getTree = require('../getTree')

module.exports = function getExampleTree(Node) {
    const Tree = getTree(Node)
    return class MyTree extends React.PureComponent {
        static defaultProps = {
            hiddenNodes: new Set(),
            selectedNodes: new Set(),
            onChange: noop,
        }
        static displayName = 'ExampleTree'
        static propTypes = {
            childParentMap: ImmutablePropTypes.map.isRequired,
            hiddenNodes: ImmutablePropTypes.set,
            selectedNodes: ImmutablePropTypes.set,
            onChange: PropTypes.func,
        }

        onEvent = ({ type, ...options }) => {
            get(this, type)(options)
        }

        selectNode = ({ ancestors, descendents, nodeId, parentChildrenMap }) => {
            this.props.onChange({
                selectedNodes: this.props.selectedNodes.withMutations(mutable => {
                    mutable.add(nodeId).union(descendents)
                    ancestors.forEach(
                        nodeId =>
                            parentChildrenMap.get(nodeId).every(_nodeId => mutable.has(_nodeId)) &&
                            mutable.add(nodeId)
                    )
                }),
            })
        }

        deselectNode = ({ ancestors, descendents, nodeId, parentChildrenMap }) => {
            this.props.onChange({
                selectedNodes: this.props.selectedNodes.withMutations(mutable => {
                    mutable.subtract(descendents).delete(nodeId)
                    ancestors.forEach(
                        nodeId =>
                            !parentChildrenMap.get(nodeId).every(_nodeId => mutable.has(_nodeId)) &&
                            mutable.delete(nodeId)
                    )
                }),
            })
        }

        hideDescendents = ({ descendents }) => {
            this.props.onChange({ hiddenNodes: this.props.hiddenNodes.union(descendents) })
        }

        showDescendents = ({ nodeId, parentChildrenMap }) => {
            this.props.onChange({
                hiddenNodes: this.props.hiddenNodes.subtract(
                    getDescendents({ depth: 1, nodeId, parentChildrenMap })
                ),
            })
        }

        render() {
            return <Tree {...this.props} onEvent={this.onEvent} />
        }
    }
}
